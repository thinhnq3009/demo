import PrayScene from '~/scenes/PrayScene';
import { userApi } from '@/apis/userApi';
import Global from '~/data/Global';
import { sortStone, stoneToStoneDataMapper } from '@/models/Stone';
import { userToUserDataMapper } from '@/models/User';
import NFTData from '~/data/NFT_data';

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
      .then(res => {
        const userData = userToUserDataMapper(res);
        Global.userData.update_user_data(userData);
        Global.nftData = NFTData.convert_json_to_NFTData(null);
        Global.userData?.on('update_user_data', () => scene.update_view_when_data_change());
      })
      .catch(err => {
        throw err;
      })
    ;
  }
}