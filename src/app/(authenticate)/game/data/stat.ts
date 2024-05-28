import { StatType } from './enum_stat';

export default class Stat {
  public type: StatType;

  public value: number;

  constructor(type:StatType, value:number) { 
    this.type = type;
    this.value = value;
  }
}
