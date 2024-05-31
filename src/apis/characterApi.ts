import axiosClient from '@/axiosClient';
import StoneData from '~/data/stone_data';
import { Character } from '@/models/Character';

export const characterApi = () => {
  return {
    upgradeCharacter: (characterId: string, stone: StoneData) => {
      return axiosClient.post<any, { result: boolean }>(`/characters/upgrade/${characterId}`, [{
        'level': stone.level,
        'color': stone.stone_type.toLowerCase(),
        'amount': stone.value,
      }]);
    },
    getCharacter: (characterId: string) => {
      return axiosClient.get<any, Character>(`/characters/${characterId}`);
    },

  };
};