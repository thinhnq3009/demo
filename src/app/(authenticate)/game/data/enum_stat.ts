export enum StatType {
  ATTACK = 'attack',
  DEFENSE = 'defense',
  ENERGY = 'energy',
}

export enum StoneType {
  YELLOW = 'yellow',
  RED = 'red',
  GREEN = 'green',
}

export function color2StoneType(color: string): StoneType {
  switch (color) {
    case 'yellow':
      return StoneType.YELLOW;
    case 'red':
      return StoneType.RED;
    case 'green':
      return StoneType.GREEN;
    default:
      throw new Error('Invalid color');
  }
}