import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken') || '';

  const { data: { data: accessToken } } = await axios.post(`${baseURL}/auth/refresh`, {
    refreshToken,
  });

  return accessToken;
};
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function isExpiredError(error) {
  return error?.response?.data?.statusCode === 401 && error?.response?.data?.message === 'Token expired';
  // return false
}

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu phản hồi là lỗi 401 (Unauthorized)
    if (isExpiredError(error) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        // Thực hiện logic refresh token ở đây
        try {
          const newToken = await refreshAccessToken();
          localStorage.setItem('accessToken', newToken);

          // Cập nhật lại header với token mới
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Thực hiện lại yêu cầu gốc với token mới
          return await axiosClient(originalRequest);
        } catch (refreshError) {
          // Xử lý lỗi khi refresh token
          processQueue(refreshError, null);
          return await Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Trả về một Promise mới chờ đợi token mới
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }

    // Nếu không phải là lỗi 401 hoặc không có token hết hạn, trả về lỗi nguyên thủy
    return Promise.reject(error?.response?.data);
  },
);

export default axiosClient;
