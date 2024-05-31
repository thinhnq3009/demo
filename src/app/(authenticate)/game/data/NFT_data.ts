import EventEmitter from 'phaser3-rex-plugins/plugins/utils/eventemitter/EventEmitter';
import { StatType } from './enum_stat';
import Stat from './stat';
import { Character } from '@/models/Character';

export default class NFTData extends EventEmitter {
  public attack: number;

  public defense: number;

  public energy: number;

  public _id: string;

  public owner_id: string;

  public code: string;

  public root_character_id: string;

  public name: string;

  public url_model: string;

  public stats: Array<Stat> = new Array<Stat>();

  constructor(attack: number, defense: number, energy: number, _id: string, owner_id: string, code: string, root_character_id: string, name: string, url_model: string) {
    super();
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
    this.stats.push(new Stat(StatType.ATTACK, attack));
    this.stats.push(new Stat(StatType.DEFENSE, defense));
    this.stats.push(new Stat(StatType.ENERGY, energy));
  }

  public static convert_json_to_NFTData(data: Character): NFTData {
    const json_example = JSON.stringify({
      'attack': 10,
      'defense': 15,
      'energy': 20,
      '_id': '5f5f7d1a4c3f0d0017c5b9b4',
      'owner_id': '5f5f7d1a4c3f0d0017c5b9b3',
      'code': '5f5f7d1a4c3f0d0017c5b9b2',
      'root_character_id': '5f5f7d1a4c3f0d0017c5b9b1',
      'name': 'test',
      'url_model': 'test',
    });
    if (data == null) {
      data = JSON.parse(json_example);
    }
    const nft = new NFTData(data.attack, data.defense, data.energy, data._id, data.owner_id, data.code, data.root_character_id, data.name, data.url_model);
    return nft;
  }

  public updateCharacterData(data: Character) {
    const json_example = JSON.stringify({
      'attack': 10,
      'defense': 15,
      'energy': 20,
      '_id': '5f5f7d1a4c3f0d0017c5b9b4',
      'owner_id': '5f5f7d1a4c3f0d0017c5b9b3',
      'code': '5f5f7d1a4c3f0d0017c5b9b2',
      'root_character_id': '5f5f7d1a4c3f0d0017c5b9b1',
      'name': 'test',
      'url_model': 'test',
    });
    if (data == null) {
      data = JSON.parse(json_example);
    }
    this.attack = data.attack;
    this.defense = data.defense;
    this.energy = data.energy;
    this._id = data._id;
    this.owner_id = data.owner_id;
    this.code = data.code;
    this.root_character_id = data.root_character_id;
    this.name = data.name;
    this.url_model = data.url_model;
    this.stats[0].value = data.attack;
    this.stats[1].value = data.defense;
    this.stats[2].value = data.energy;
    this.emit('update_NFT_data');
  }
}