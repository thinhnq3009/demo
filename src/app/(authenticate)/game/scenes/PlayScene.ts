import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm//environments/RoomEnvironment.js';

import CustomButton from './View/Button';
import Global from '~/data/Global';
import NFTData from '~/data/NFT_data';
import ButtonBattle from './View/Button_Battle';
// node_modules/@types/three/examples/jsm/loaders/DRACOLoader.d.ts
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Character } from '@/models/Character';

// this class extends Scene class
export default class PlayGame extends Phaser.Scene {
  private text_timer: Phaser.GameObjects.Text | undefined;

  private main_font: Phaser.Loader.LoaderPlugin | undefined;

  private ATTACK_STATE = 1;

  private DEFEND_STATE = 2;

  private user: any;

  private enemy: any;

  constructor() {
    super({
      key: 'PlayGame',
    });
  }

  preload(): void {
    // this is how we preload a generic text, in our case the GLTF JSON of the knight model
    // this.load.binary('knight', '3dmodel/emily.glb');
    //battle ======================
    this.load.image('battle_bg', 'assets/battle/background.png');
    this.load.image('bottom_bg', 'assets/battle/bottom_bg.png');
    this.load.image('btn_attack', 'assets/battle/attack_btn.png');
    this.load.image('btn_defend', 'assets/battle/defend_btn.png');
    this.load.image('btn_end', 'assets/battle/end_btn.png');
    this.load.image('energy_border', 'assets/battle/energy_border.png');
    this.load.image('energy_progress', 'assets/battle/energy_progress.png');
    this.load.image('health_border', 'assets/battle/health_border.png');
    this.load.image('health_progress', 'assets/battle/health_progress.png');
    //battle ======================
    // this.main_font = this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    // // this.load_sound_effect();
    // // this.load_images();
    // //load image main
    // WebFont.load({
    //   google: {
    //     families: ['Mochiy Pop One'],
    //   },
    //   active: function () {
    //     console.log('font loaded');
    //   },
    // });
  }

  // load_images() {
  //   this.load.html('inputtext', 'assets/input_text.html');
  //   this.load.image('btn_upgrade', 'assets/upgrade/btn_upgrade.png');
  //   this.load.image('upgrade_item', 'assets/upgrade/upgrade_item.png');
  //   this.load.image('bg', 'assets/prayscene/bg.png');
  //   this.load.image('angle', 'assets/prayscene/angle.png');
  //   this.load.image('btn_pray', 'assets/prayscene/button_pray.png');
  //   this.load.image('praypoints_holder', 'assets/prayscene/praypoints_holder.png');
  //   //load panel bottom menu
  //   this.load.image('bg_bootmenu', 'assets/bottom_menu/bg.png');
  //   this.load.image('border_progress_pray_point', 'assets/prayscene/border_progress_pray_point.png');
  //   this.load.image('item_bg', 'assets/bottom_menu/item_bg.png');
  //   this.load.image('bg_nav', 'assets/bottom_menu/nav_bg.png');
  //   this.load.image('ic_character', 'assets/icon/ic_character.png');
  //   this.load.image('ic_upgrade', 'assets/icon/ic_upgrade.png');
  //   this.load.image('ic_battle', 'assets/icon/ic_battle.png');
  //   this.load.image('ic_pray', 'assets/icon/ic_pray.png');
  //   this.load.image('ic_market', 'assets/icon/ic_market.png');
  //   // load icon for popup out of pray point
  //   this.load.image('bg_popup_out_pray', 'assets/popup/out_pray/bg_out_pray_popup.png');
  //   this.load.image('bg_item_popup_out_pray', 'assets/popup/out_pray/bg_item.png');
  //   this.load.image('ic_x_cross', 'assets/icon/ic_x_cross.png');
  //   this.load.image('ic_sand_clock', 'assets/icon/ic_sand_clock.png');
  //   this.load.image('ic_battle_shadow', 'assets/icon/ic_battle_shadow.png');
  //   // load image for top bar
  //   this.load.image('bg_top_bar', 'assets/topbar/bg.png');
  //   this.load.image('avatar', 'assets/topbar/fullavatar.png');
  //   this.load.image('exp_border', 'assets/topbar/exp_border.png');
  //   this.load.image('exp_progress', 'assets/topbar/exp_full.png');
  //   this.load.image('avatar_mask', 'assets/topbar/avatar_mask.png');
  //   // load image for upgrade popup
  //   this.load.image('bg_upgrade_popup', 'assets/upgrade/bg.png');
  //   this.load.image('panel_upgrade', 'assets/upgrade/panel.png');
  //   this.load.image('upgrade_item', 'assets/upgrade/upgrade_item.png');
  //   this.load.image('ic_minus', 'assets/icon/ic_minus.png');
  //   this.load.image('ic_plus', 'assets/icon/ic_plus.png');
  //   this.load.image('bg_value', 'assets/upgrade/value_bg.png');
  //   //load image stone
  //   this.load.image('red1', 'assets/stones/red1.png');
  //   this.load.image('red2', 'assets/stones/red2.png');
  //   this.load.image('red3', 'assets/stones/red3.png');
  //   this.load.image('yellow1', 'assets/stones/yellow1.png');
  //   this.load.image('yellow2', 'assets/stones/yellow2.png');
  //   this.load.image('yellow3', 'assets/stones/yellow3.png');
  //   this.load.image('green1', 'assets/stones/green1.png');
  //   this.load.image('green2', 'assets/stones/green2.png');
  //   this.load.image('green3', 'assets/stones/green3.png');
  //   // load image for winfail popup
  //   this.load.image('success', 'assets/popup/successfail/success.png');
  //   this.load.image('fail', 'assets/popup/successfail/fail.png');
  // }
  //
  // load_sound_effect() {
  //   this.load.audio('main_sound', 'sounds/bg.ogg');
  //   this.load.audio('hover_button_sound', 'sounds/MI_SFX37.mp3');
  //   this.load.audio('click_button_sound', 'sounds/MI_SFX45.mp3');
  //   this.load.audio('show_sound', 'sounds/MI_SFX30.mp3');
  //   this.load.audio('success_sound', 'sounds/winfail.wav');
  // }

  create(): void {
    if (Global.nftData === undefined) {
      Global.nftData = NFTData.convert_json_to_NFTData({} as Character);
    }

    let modelsLoaded = 0;
    const totalModels = 2;
    this.user = {
      user_data: Global.nftData,
      current_health: 100,
      energy: Global.nftData.energy,
      state: this.ATTACK_STATE,
    };
    this.enemy = {
      user_data: Global.nftData,
      current_health: 100,
      energy: Global.nftData.energy,
      state: this.ATTACK_STATE,
    };
    const mixers: THREE.AnimationMixer[] = [];
    const clock = new THREE.Clock();
    const container = document.getElementById('three_canvas');
    const stats = new Stats();
    container!.appendChild(stats.dom);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container!.appendChild(renderer.domElement);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    // Calculate the new camera position
    // Calculate the new camera position
    const radius = camera.position.distanceTo(controls.target);
    const azimuthalAngle = 0.75; // The azimuthal angle you want to set
    const polarAngle = controls.getPolarAngle(); // Keep the current polar angle

    const x = controls.target.x + radius * Math.sin(polarAngle) * Math.sin(azimuthalAngle);
    const y = controls.target.y + radius * Math.cos(polarAngle);
    const z = controls.target.z + radius * Math.sin(polarAngle) * Math.cos(azimuthalAngle);

    // Set the new camera position
    camera.position.set(4.408913443759985, 4.495799976780315, 4.0821300325293075);

    // Make sure the camera is still looking at the target
    // controls.update();
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.update();
    controls.enabled = false;
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let model1_animation_attack: any;
    let model1_animation_idle: any;
    let model2_animation_attack: any;
    let model2_animation_idle: any;
    let model1: any;
    let model2: any;
    loader.load('3dmodel/kpop.gltf', (gltf) => {
      modelsLoaded++;
      model1 = gltf.scene;
      model1.position.set(0.8, 0.9, 0);
      model1.scale.set(0.4, 0.4, 0.4);
      model1.rotateY(-2);
      scene.add(model1);
      createSphere();
      const mixer = new THREE.AnimationMixer(model1);
      mixers.push(mixer);
      model1_animation_idle = mixer.clipAction(gltf.animations[0]);
      model1_animation_idle.play();
      model1_animation_attack = mixer.clipAction(gltf.animations[1]);
      model1_animation_attack.setLoop(THREE.LoopOnce); // Set the loop mode to once
      model1_animation_attack.clampWhenFinished = true;
      console.log('model1');
      animate();

    }, undefined, function (e) {
      console.error(e);
    });

    loader.load('3dmodel/kpop.gltf', (gltf) => {
      modelsLoaded++;
      model2 = gltf.scene;
      model2.position.set(-0.9, 1, 0);
      model2.scale.set(0.4, 0.4, 0.4);
      model2.rotateY(1);
      model2.rotateX(0);
      scene.add(model2);

      const mixer = new THREE.AnimationMixer(model2);
      mixers.push(mixer);
      model2_animation_idle = mixer.clipAction(gltf.animations[0]);
      model2_animation_idle.play();
      model2_animation_attack = mixer.clipAction(gltf.animations[1]);
      model2_animation_attack.setLoop(THREE.LoopOnce); // Set the loop mode to once
      model2_animation_attack.clampWhenFinished = true;
      console.log('model2');
      run_timer();
      //animate();

    }, undefined, function (e) {

      console.error(e);

    });
    let sphere: any;

    function createSphere() {
      const geometry = new THREE.SphereGeometry(0.2, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(model1.position.x, model1.position.y, model1.position.z);
      sphere.visible = false;
      scene.add(sphere);
    }

    function shootSphere() {
      sphere.visible = true;
      sphere.position.set(model1.position.x, model1.position.y, model1.position.z);
      const direction = new THREE.Vector3().subVectors(model2.position, sphere.position).normalize();
      direction.applyQuaternion(model1.quaternion);
      sphere.position.add(direction.multiplyScalar(0.5));
    }

    function blinkModel(model: any, duration: any) {
      let isModelVisible = true;
      const blinkInterval = setInterval(() => {
        isModelVisible = !isModelVisible;
        model.visible = isModelVisible;
      }, duration);

      // Stop blinking after 2 seconds
      setTimeout(() => {
        clearInterval(blinkInterval);
        model.visible = true; // Make sure the model is visible after blinking
      }, 1000);
    }


    function animate() {
      console.log('animate');
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      for (const mixer of mixers) {
        mixer.update(delta);
      }
      //console.log(camera.position.x, camera.position.y, camera.position.z);
      // controls.update();
      stats.update();
      if (modelsLoaded >= totalModels) {
        renderer.render(scene, camera);
      }
    }

    function model1_fight() {
      shootSphere();
      model1_animation_attack.play().onComplete = () => {
        model1_animation_idle.play();
      };
      model1_animation_attack.reset();
    }

    function model2_fight() {
      model2_animation_attack.play().onComplete = () => {
        model2_animation_idle.play();
      };
      model2_animation_attack.reset();
    }

    const destroy_scene = () => {
      scene.remove(model2);
      scene.remove(sphere);
      scene.remove(model1);
      renderer.dispose();
      while (container!.firstChild) {
        container!.removeChild(container!.firstChild);
      }
    };
    const changeHealthplayer = (attack: number, is_defend: boolean) => {
      attack = attack * 5;
      console.log('changeHealthplayer');
      if (is_defend) {
        const current_def = this.user.user_data.defense;
        let lost_health = attack - current_def;
        if (lost_health < 0) {
          lost_health = 0;
        }
        blinkModel(model1, 200);
        this.user.current_health -= lost_health;
      } else {
        this.user.current_health -= attack;
      }
      update_view_on_ChangeHealth(true);
      if (this.user.current_health <= 0) {
        destroy_scene();
        this.scene.start('PrayScene', { isWin: false });
      }
    };

    const changeHealthEnemy = (attack: number, is_defend: boolean) => {
      attack = attack * 5;
      console.log('changeHealthEnemy');
      if (is_defend) {
        const current_def = this.enemy.user_data.defense;
        let lost_health = attack - current_def;
        if (lost_health < 0) {
          lost_health = 0;
        }
        blinkModel(model2, 200);
        this.enemy.current_health -= lost_health;
      } else {
        this.enemy.current_health -= attack;
      }
      update_view_on_ChangeHealth(false);
      if (this.enemy.current_health <= 0) {
        destroy_scene();
        this.scene.start('PrayScene', { isWin: true });
      }
    };

    const run_timer = () => {
      let time = 15;
      this.time.addEvent({
        delay: 1000,
        repeat: 14,
        loop: true,
        callback: () => {
          time -= 1;
          this.text_timer?.setText(time + 'S');
          if (time === 2) {
            //add logic random state for enemy
            const state = Math.floor(Math.random() * 2) + 1;
            console.log('state:' + state);
            this.enemy.state = state;
          }

          if (time === 0) {
            //add logic compare state and calculate health
            if (this.user.state === this.ATTACK_STATE) {
              change_user_energy(-10);
              changeHealthEnemy(this.user.user_data.attack, this.enemy.state === this.DEFEND_STATE);
              model1_fight();
            } else {
              change_user_energy(10);
            }

            if (this.enemy.state === this.ATTACK_STATE) {
              changeHealthplayer(this.enemy.user_data.attack, this.user.state === this.DEFEND_STATE);
              model2_fight();
            }
            time = 15;
          }
        },
      });
    };

    const btn_offset = 100;
    const main_container = this.add.container(0, 0);
    const bg = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'battle_bg').setOrigin(0.5, 0.5).setScale(0.5);
    const health_border1 = this.add.image(this.game.canvas.width / 2 - 100, this.game.canvas.height / 2 - 100, 'health_border').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const health_progress1 = this.add.image(health_border1.x - health_border1.width / 4 + 1, health_border1.y, 'health_progress').setOrigin(0, 0.5).setScale(0.5, 0.5);
    health_progress1.name = 'health_progress1';
    const health_border2 = this.add.image(this.game.canvas.width / 2 + 100, this.game.canvas.height / 2 - 100, 'health_border').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const health_progress2 = this.add.image(health_border2.x - health_border2.width / 4 + 1, health_border2.y, 'health_progress').setOrigin(0, 0.5).setScale(0.5, 0.5);
    health_progress2.name = 'health_progress2';
    main_container.add([bg, health_border1, health_progress1, health_border2, health_progress2]);
    const bottom_bg = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.83, 'bottom_bg').setOrigin(0.5, 0.5).setScale(0.5, 0.5);


    const btn_attack = new ButtonBattle(this, bottom_bg.x - btn_offset, bottom_bg.y - 80, 'btn_attack', () => {
      if (this.user.energy < 10) {
        change_State(this.DEFEND_STATE);
        return;
      }
      change_State(this.ATTACK_STATE);
    });

    const btn_defend = new ButtonBattle(this, bottom_bg.x + btn_offset, bottom_bg.y - 80, 'btn_defend', () => {
      change_State(this.DEFEND_STATE);
    });
    const change_State = (state: number) => {
      this.user.state = state;
      if (state === this.ATTACK_STATE) {
        btn_attack.onChangeState();
        btn_defend.resetState();
      } else {
        btn_defend.onChangeState();
        btn_attack.resetState();
      }
    };

    const energy_border = this.add.image(bottom_bg.x, bottom_bg.y, 'energy_border').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const energy_progress = this.add.image(energy_border.x - energy_border.width / 4 + 3, energy_border.y, 'energy_progress').setOrigin(0, 0.5).setScale(0.5, 1);
    energy_progress.name = 'energy_progress';
    this.text_timer = this.add.text(bottom_bg.x, bottom_bg.y + btn_offset - 20, '15S', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '16px',
      color: '#fff',
      stroke: '#8D5522',
      strokeThickness: 1,
    }).setOrigin(0.5, 0.5);
    const btn_end = new CustomButton(this, bottom_bg.x, bottom_bg.y + btn_offset + 20, 'btn_end', '', () => {
    });
    main_container.add([bottom_bg, btn_attack, btn_defend, energy_border, energy_progress, this.text_timer, btn_end]);


    const init_data_to_view = () => {
      const energy_progress = main_container.getByName('energy_progress') as Phaser.GameObjects.Image;
      energy_progress.setScale(this.user.energy / this.user.user_data.energy, 1);
      const health_progress1 = main_container.getByName('health_progress1') as Phaser.GameObjects.Image;
      health_progress1.setScale((this.user.current_health / 100) / 2, 0.5);
      const health_progress2 = main_container.getByName('health_progress2') as Phaser.GameObjects.Image;
      health_progress2.setScale((this.enemy.current_health / 100) / 2, 0.5);
      change_State(this.ATTACK_STATE);
    };
    init_data_to_view();

    const change_user_energy = (value: number) => {
      let temp = this.user.energy + value;
      if (temp > this.user.user_data.energy) {
        temp = this.user.user_data.energy;
      }
      this.user.energy = temp;
      if (this.user.energy < 10) {
        change_State(this.DEFEND_STATE);
      }
      const energy_progress = main_container.getByName('energy_progress') as Phaser.GameObjects.Image;
      energy_progress.setScale(this.user.energy / this.user.user_data.energy, 1);
    };

    const update_view_on_ChangeHealth = (is_user: boolean) => {
      if (is_user) {
        const health_progress = main_container.getByName('health_progress1') as Phaser.GameObjects.Image;
        health_progress.setScale((this.user.current_health / 100) / 2, 0.5);
      } else {
        const health_progress = main_container.getByName('health_progress2') as Phaser.GameObjects.Image;
        health_progress.setScale((this.enemy.current_health / 100) / 2, 0.5);
      }
    };
  }
}
    
 