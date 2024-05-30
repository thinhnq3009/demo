import StoneData from '~/data/stone_data';
import { color2StoneType, StoneType } from '~/data/enum_stat';

export interface Stone {
  level: number
  color: string
  amount: number
}

export function sortStone(stones: StoneData[]): StoneData[] {
  const template = [{
    'type': StoneType.RED,
    'level': 1,
  }, {
    'type': StoneType.RED,
    'level': 2,
  }, {
    'type': StoneType.RED,
    'level': 3,
  }, {
    'type': StoneType.YELLOW,
    'level': 1,
  }, {
    'type': StoneType.YELLOW,
    'level': 2,
  }, {
    'type': StoneType.YELLOW,
    'level': 3,
  }, {
    'type': StoneType.GREEN,
    'level': 1,
  }, {
    'type': StoneType.GREEN,
    'level': 2,
  }, {
    'type': StoneType.GREEN,
    'level': 3,
  }];

  const result = template.map((templateStone) => {
    const stoneData = stones.find((stone) => {
      return stone.stone_type === templateStone.type && stone.level === templateStone.level;
    });
    console.log('aaaaaa');
    return stoneData ? stoneData : new StoneData(templateStone.type, templateStone.level, 0);
  });
  return result;

}

export function stoneToStoneDataMapper(stone: Stone): StoneData {
  return new StoneData(
    color2StoneType(stone.color),
    stone.level,
    stone.amount,
  );
}