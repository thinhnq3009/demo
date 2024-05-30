import PrayScene from '~/scenes/PrayScene';
import { userApi } from '@/apis/userApi';
import Global from '~/data/Global';
import { sortStone, stoneToStoneDataMapper } from '@/models/Stone';

export default class ApiHandler {
  public static handlePray(scene: PrayScene) {
    const { pray } = userApi();

    pray()
      .then((res) => {
        console.log(res);
        const oldData = Global.userData;
        oldData.stone_data = sortStone(res.stones.map(stoneToStoneDataMapper));
        Global.userData.update_user_data(oldData);
      }).catch(err => {
        console.log(err);
        scene.show_out_of_spray_popup();
      });


  }
}