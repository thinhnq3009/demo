import StoneData from './stone_data';
import EventEmitter from 'phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitter';

export default class UserData extends EventEmitter {
  public _id: string;

  public tele_id: number;

  public username: string;

  public full_name: string;

  public photo_url: string;

  public experience: number;

  public ref_code: number;

  public pray_points: number;

  public stone_data: Array<StoneData>;

  public level: number;

  public reminder: number;

  public next_exp: number;

  constructor(_id: string, tele_id: number, username: string, full_name: string, photo_url: string, experience: number, ref_code: number, pray_points: number, stone_data: Array<StoneData>) {
    super();
    this._id = _id;
    this.tele_id = tele_id;
    this.username = username;
    this.full_name = full_name;
    this.photo_url = photo_url;
    this.experience = experience;
    this.ref_code = ref_code;
    this.pray_points = pray_points;
    this.stone_data = stone_data;
    const rs = this.calculate_level(experience);
    this.level = rs.level;
    this.reminder = rs.remainder;
    this.next_exp = this.calculate_experience(this.level + 1);
  }

  public static init_user_data(json_object): UserData {
    if (json_object == null) {
      const example_json = JSON.stringify({
        '_id': '5f5f7d1a4c3f0d0017c5b9b4',
        'tele_id': 123456789,
        'username': 'TrongHoa12312312asadasdasda',
        'full_name': 'test',
        'photo_url': 'https://www.google.com',
        'experience': 200,
        'ref_code': 0,
        'pray_points': 12,
        'stone_data': [{
          'type': 'red',
          'level': 1,
          'value': 10,
        }, {
          'type': 'red',
          'level': 2,
          'value': 10,
        }, {
          'type': 'red',
          'level': 3,
          'value': 10,
        }, {
          'type': 'yellow',
          'level': 1,
          'value': 20,
        }, {
          'type': 'yellow',
          'level': 2,
          'value': 20,
        }, {
          'type': 'yellow',
          'level': 3,
          'value': 20,
        }, {
          'type': 'green',
          'level': 1,
          'value': 30,
        }, {
          'type': 'green',
          'level': 2,
          'value': 30,
        }, {
          'type': 'green',
          'level': 3,
          'value': 30,
        }],
      });

      json_object = JSON.parse(example_json);
    }
    const arr_StoneData = StoneData.convert_json_to_StoneData(json_object.stone_data);
    console.log('json_object', arr_StoneData);
    const user_data = new UserData(json_object._id, json_object.tele_id, json_object.username, json_object.full_name, json_object.photo_url, json_object.experience, json_object.ref_code, json_object.pray_points, arr_StoneData);
    console.log('user_data', user_data);
    return user_data;
  }

  public update_stone_data(json_stone_data) {
    this.stone_data = StoneData.convert_json_to_StoneData(json_stone_data);
  }

  public update_experience(exp: number) {
    this.experience = exp;
    const rs = this.calculate_level(exp);
    this.level = rs.level;
    this.reminder = rs.remainder;
    this.next_exp = this.calculate_experience(this.level + 1);
    this.emit('update_experience');
  }

  update_user_data(json_object: UserData) {
    const arr_StoneData = StoneData.convert_json_to_StoneData(json_object.stone_data);
    console.log('json_object', arr_StoneData);
    this._id = json_object._id;
    this.tele_id = json_object.tele_id;
    this.username = json_object.username;
    this.full_name = json_object.full_name;
    this.photo_url = json_object.photo_url;
    this.experience = json_object.experience;
    this.ref_code = json_object.ref_code;
    this.pray_points = json_object.pray_points;
    this.stone_data = arr_StoneData;
    const rs = this.calculate_level(this.experience);
    this.level = rs.level;
    this.reminder = rs.remainder;
    this.next_exp = this.calculate_experience(this.level + 1);
    this.emit('update_user_data');
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
