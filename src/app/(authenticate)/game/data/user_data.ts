import StoneData from './stone_data';
import { User } from '@/models/User';
import { sortStone, stoneToStoneDataMapper } from '@/models/Stone';

export default class UserData {
  public _id: string;

  public tele_id: number;

  public username: string;

  public full_name: string;

  public photo_url: string;

  public experience: number;

  public ref_code: number;

  public stone_data: Array<StoneData>;

  public level: number;

  public reminder: number;

  public next_exp: number;

  constructor(_id: string, tele_id: number, username: string, full_name: string, photo_url: string, experience: number, ref_code: number, stone_data: Array<StoneData>) {
    this._id = _id;
    this.tele_id = tele_id;
    this.username = username;
    this.full_name = full_name;
    this.photo_url = photo_url;
    this.experience = experience;
    this.ref_code = ref_code;
    this.stone_data = sortStone(stone_data);
    const rs = this.calculate_level(experience);
    this.level = rs.level;
    this.reminder = rs.remainder;
    this.next_exp = this.calculate_experience(this.level + 1);
    console.log(this.stone_data);
  }

  public static init_user_data(json_object: User): UserData {
    // if (json_object == null) {
    //   const example_json = JSON.stringify({
    //     '_id': '5f5f7d1a4c3f0d0017c5b9b4',
    //     'tele_id': 123456789,
    //     'username': 'test',
    //     'full_name': 'test',
    //     'photo_url': 'https://www.google.com',
    //     'experience': 200,
    //     'ref_code': 0,
    //     'stone_data': [{
    //       'type': 'red',
    //       'level': 1,
    //       'value': 10,
    //     }, {
    //       'type': 'red',
    //       'level': 2,
    //       'value': 10,
    //     }, {
    //       'type': 'red',
    //       'level': 3,
    //       'value': 10,
    //     }, {
    //       'type': 'yellow',
    //       'level': 1,
    //       'value': 20,
    //     }, {
    //       'type': 'yellow',
    //       'level': 2,
    //       'value': 20,
    //     }, {
    //       'type': 'yellow',
    //       'level': 3,
    //       'value': 20,
    //     }, {
    //       'type': 'green',
    //       'level': 1,
    //       'value': 30,
    //     }, {
    //       'type': 'green',
    //       'level': 2,
    //       'value': 30,
    //     }, {
    //       'type': 'green',
    //       'level': 3,
    //       'value': 30,
    //     }],
    //   });
    //
    //   json_object = JSON.parse(example_json);
    // }
    // const arr_StoneData = StoneData.convert_json_to_StoneData(json_object.stone_data);
    // const user_data = new UserData(json_object._id, json_object.tele_id, json_object.username, json_object.full_name, json_object.photo_url, json_object.experience, json_object.ref_code, arr_StoneData);
    const user_data = new UserData(
      json_object._id,
      json_object.tele_id,
      json_object.username,
      json_object.full_name,
      json_object.photo_url,
      json_object.experience,
      json_object.ref_code,
      json_object.stones.map(stoneToStoneDataMapper),
    );
    console.log('user_data', user_data);
    return user_data;
  }

  public update_stone_data(json_arraydata) {

  }

  private calculate_level(exp: number): { level: number, remainder: number } {
    const result = Math.abs(Math.sqrt((exp + 1.3) / 0.25)) - 2.3;
    const integerPart = result > 0 ? Math.floor(result) : 0;
    const remainder = exp % integerPart;
    return { level: integerPart, remainder: remainder };
  }

  private calculate_experience(level: number): number {
    const exp = (level * level + 2 * level * 2.3 + 2.3 * 2.3 - 52) / 4;
    return exp;
  }
}
