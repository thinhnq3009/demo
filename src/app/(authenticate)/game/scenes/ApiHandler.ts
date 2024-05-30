import PrayScene from '~/scenes/PrayScene';
import { userApi } from '@/apis/userApi';
import Global from '~/data/Global';
import { sortStone, stoneToStoneDataMapper } from '@/models/Stone';
import { userToUserDataMapper } from '@/models/User';

export default class ApiHandler {
  public static handlePray(scene: PrayScene) {
    const { pray } = userApi();
    scene.enable_btn_pray(false);
    pray()
      .then((res) => {
        console.log(res);
        const oldData = Global.userData;
        oldData.stone_data = sortStone(res.stones.map(stoneToStoneDataMapper));
        oldData.pray_points = res.pray_point;
        console.log('fasdfasdfasdfasdf', oldData);
        Global.userData.update_user_data(oldData);
      }).catch(err => {
        if (err?.key === 'out_off_pray_point') {
          scene.show_out_of_spray_popup();
        } else {
          throw err;
        }
      }).finally(() => {
      // scene.enable_btn_pray(true);
      })
    ;


  }

  public static handleLoadUserData(scene: PrayScene) {
    const { authenticateMe } = userApi();
    authenticateMe()
      .then((response) => {


        return response;
      })
      .then(res => {
        const userData = userToUserDataMapper(res);
        Global.userData.update_user_data(userData);
        Global.nftData.load_nft_data_local_storage();
      })
      .catch(err => {
        throw err;
      })
    ;
  }
}