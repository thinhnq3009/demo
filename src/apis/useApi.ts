import axiosClient from '@/axiosClient';
import { User } from '@/models/User';

export const useApi = () => {
  return {
    getUserInfoByToken: (token: string) => {
      return axiosClient.get<any, User>('/user', { params: { token } });
    },
  };
};