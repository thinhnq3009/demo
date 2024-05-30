import { Stone, stoneToStoneDataMapper } from '@/models/Stone';
import UserData from '~/data/user_data';

export interface User {
  _id: string
  tele_id: number
  username: string
  full_name: string
  photo_url: string
  experience: number
  ref_code: number
  pray_point: number
  stones: Stone[]
}

export function userToUserDataMapper(user: User): UserData {
  return new UserData(
    user._id,
    user.tele_id,
    user.username,
    user.full_name,
    user.photo_url,
    user.experience,
    user.ref_code,
    user.pray_point,
    user.stones.map(stoneToStoneDataMapper),
  );
}