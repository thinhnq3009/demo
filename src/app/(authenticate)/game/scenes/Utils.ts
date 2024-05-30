import StoneData from '~/data/stone_data';

export default class MyUltils {

  public static calculate_ratio_upgrading_lv1(current_stat: number) :number {
    const ratio = -0.19999999999 * current_stat + 20;
    if (current_stat < 35)
      return ratio;
    else if (current_stat < 70)
      return ratio / 10;
    else
      return ratio / 100;
  }

  public static calculate_ratio_upgrading_lv2(current_stat: number) :number {
    const ratio = (-0.19999999999 * current_stat + 20) * 20;
    if (current_stat < 35)
      return ratio + 5;
    else if (current_stat < 70)
      return ratio;
    else
      return ratio / 10;
  }

  public static calculate_ratio_upgrading_lv3(current_stat: number) :number {
    const ratio = (-0.19999999999 * current_stat + 20) * 400;
    if (current_stat < 35)
      return 100;
    else if (current_stat < 70)
      return ratio + 5;
    else
      return ratio;
  }
}