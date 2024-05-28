import Stat from './stat';

export default class NFTData {
  public attack: number;

  public defense: number;

  public energy: number;

  public _id: string;

  public owner_id: string;

  public code: string;

  public root_character_id: string;

  public name: string;

  public url_model: string;

  public stat: Stat;

  constructor(attack:number, defense:number, energy:number, _id:string, owner_id:string, code:string, root_character_id:string, name:string, url_model:string, stat:Stat) {
    this.attack = attack;
    this.defense = defense;
    this.defense = defense;
    this.energy = energy;
    this._id = _id;
    this.owner_id = owner_id;
    this.code = code;
    this.root_character_id = root_character_id;
    this.name = name;
    this.url_model = url_model;
    this.stat = stat;
  }
}