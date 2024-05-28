import axiosClient from '@/axiosClient';
import { User } from '@/models/User';
import { Stone } from '@/models/Stone';
import { Character } from '@/models/Character';

export const useApi = () => {
  return {
    getUserInfoByToken: (token: string) => {
      return axiosClient.get<any, User>('/users', { params: { token } });
    },
    pray: () => {
      return axiosClient.post<any, Stone[]>('/pray');
    },
    getBagStone: () => {
      return axiosClient.get<any, Stone[]>('/users/bag');
    },
    getCharacter: async () => {
      const res = await axiosClient.get<any, Character[]>('/characters');
      return res.map((c) => {
        const part = c.name.toLowerCase().split(' ').join('_');
        return { ...c, url: `/assets/models/${part}.glb` };
      });
    },
  };
};