import axiosClient from '@/axiosClient';
import StoneData from '~/data/stone_data';

export const characterApi = () => {
  return {
    upgradeCharacter: (characterId: string, stone: StoneData) => {
      return axiosClient.post(`/characters/upgrade/${characterId}`, [{
        'level': stone.level,
        'color': stone.stone_type.toLowerCase(),
        'amount': stone.value,
      }]);
    },
  };
};