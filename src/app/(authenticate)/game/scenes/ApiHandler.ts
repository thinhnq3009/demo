import PrayScene from '~/scenes/PrayScene';
import { userApi } from '@/apis/userApi';
import Global from '~/data/Global';
import { sortStone, stoneToStoneDataMapper } from '@/models/Stone';
import { userToUserDataMapper } from '@/models/User';
import { characterApi } from '@/apis/characterApi';
import StoneData from '~/data/stone_data';
import { StoneType } from '~/data/enum_stat';

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

  public static handleLoadCharacterData(scene: PrayScene) {

    const characterData = JSON.parse(localStorage.getItem('character') || '{}');
    if (!characterData._id) {
      return;
    }


    const { getCharacter } = characterApi();
    getCharacter(characterData._id)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(res => {
        Global.nftData.updateCharacterData(res);
      })
      .catch(err => {
        throw err;
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
      })
      .catch(err => {
        throw err;
      })
    ;
  }

  public static handleUpgradeStone(scene: PrayScene, stone_type: StoneType, level: number, value: number) {
    const { upgradeCharacter } = characterApi();
    const stone = new StoneData(stone_type, level, value);
    upgradeCharacter(Global.nftData._id, stone).then((res) => {
      scene.show_result_pop_up(res.result);
    }).catch((err) => {
      console.log(err);
    }).finally(
      () => {
        ApiHandler.handleLoadUserData(scene);
        ApiHandler.handleLoadCharacterData(scene);
        scene.update_ratio_upgrade(stone_type + level);
      },
    );
  }

}