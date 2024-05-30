import { StoneType } from './enum_stat';

export default class StoneData {

  public stone_type: StoneType;

  public level: number;

  public value: number;

  public sprite: string;

  constructor(stone_type:StoneType, level:number, value:number) {
    this.stone_type = stone_type;
    this.level = level;
    this.value = value;
    this.sprite = stone_type + level.toString();
    console.log('stone sprite', this.sprite);
  }

  public static convert_json_to_StoneData(data) : Array<StoneData> {
    const stone_data = new Array<StoneData>();
    for (let i = 0; i < data.length; i++) {
      const stone = new StoneData(data[i].type, data[i].level, data[i].value);
      stone_data.push(stone);
    }
    return stone_data;
  }
}