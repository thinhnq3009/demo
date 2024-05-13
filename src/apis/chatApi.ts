import axiosClient from '@/axiosClient';
import { CharacterName } from '@/models/Character';

export default function apiChat() {
  return {
    getResponse: (message: string, userId = 999) => {
      return axiosClient.get<any, string>('/chat/', {
        params: {
          message, user_id: userId,
        },
      });
    },
    changeCharacter: (character: CharacterName, userId = 999) => {
      return axiosClient.post<any, boolean>(`/chat/set_character?character_name=${character}&user_id=${userId}`);
    },
  };
}