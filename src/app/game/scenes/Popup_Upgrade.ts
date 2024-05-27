import BasePopup from './BasePopup';
import StatGameObject from './StatGameObject';
import CustomButton from './Button';
import Stat from '@/app/game/data/stat';

export default class UpgradePopup extends BasePopup {
  // Specific properties here

  create_View() {
    super.create_View();
    // Add the popup to the scene
    // load image for upgrade popup
    const offset = -50;
    const panel_y_offset = -120;
    const item_w = 322;
    const item_h = 50;
    const item_spacing = 20;
    const bg_upgrade_popup = this.scene.add.image(0, offset, 'bg_upgrade_popup').setOrigin(0.5, 0.5);
    this.main_container?.add(bg_upgrade_popup);
    const panel_upgrade = this.scene.add.image(0, panel_y_offset, 'panel_upgrade').setOrigin(0.5, 0.5);
    this.main_container?.add(panel_upgrade);
    // get data from server
    const list_stat = this.create_example();
    //const grid = this.scene.add.grid(panel_upgrade.x, panel_upgrade.y, panel_upgrade.width, panel_upgrade.height, item_w, item_h + item_spacing, 0x000000).setOrigin(0.5, 0.5);
    const group_item = this.scene.add.group();

    list_stat.forEach(element => {
      group_item.add(element);
      console.log('element' + element.stat.type + '\nvalue:' + element.stat.value);
    },
    );

    const grid = Phaser.Actions.GridAlign(group_item.getChildren(), {
      width: 1,
      height: 3,
      cellWidth: 150,
      cellHeight: item_h + item_spacing,
      x: 75,
      y: -160,
    });
    this.main_container?.add(grid);

    const upgrade_holder = this.scene.add.image(panel_upgrade.x, panel_upgrade.y + 180, 'item_bg').setOrigin(0.5, 0.5).setScale(1.5);
    const zone = this.scene.add.zone(upgrade_holder.x, upgrade_holder.y, upgrade_holder.width * 1.5, upgrade_holder.height * 1.5).setRectangleDropZone(300, 300);
    this.main_container?.add(upgrade_holder);
    const btn_upgrade = new CustomButton(this.scene, 0, 160, 'btn_upgrade', 'Upgrade', () => {
      list_stat[0].upgrade_status(80);
    });
    this.main_container?.add(zone);
    this.main_container?.add(btn_upgrade);
  }


  create_example(): Array<StatGameObject> {
    const json_example = JSON.stringify([{
      type: 'attack',
      value: 10,
    },
    {
      type: 'defense',
      value: 10,
    },
    {
      type: 'energy',
      value: 10,
    },
    ],
    );
    const list_gameobj = new Array<StatGameObject>();
    const object_example = JSON.parse(json_example);
    object_example.forEach(element => {
      const stat = new Stat(element.type, element.value);
      const gj = new StatGameObject(this.scene, 0, 0, 'upgrade_item', stat);
      list_gameobj.push(gj);
      console.log('stat', gj);
    });

    return list_gameobj;
  }

  // Other specific methods here
}