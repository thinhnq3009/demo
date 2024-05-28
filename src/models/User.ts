import { Stone } from '@/models/Stone';

export interface User {
  _id: string
  tele_id: number
  username: string
  full_name: string
  photo_url: string
  experience: number
  ref_code: number
  stones: Stone[]
}

