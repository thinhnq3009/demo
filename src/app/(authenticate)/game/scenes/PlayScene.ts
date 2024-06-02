import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import WebFont from 'webfontloader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm//environments/RoomEnvironment.js';

import CustomButton from './View/Button';
import Global from '~/data/Global';
import NFTData from '~/data/NFT_data';
import ButtonBattle from './View/Button_Battle';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SuccessFailPopup from './View/Success_Fail_Popup';
import { Tween, update } from '@tweenjs/tween.js';
import { AnyARecord } from 'dns';
import { render } from '@react-three/fiber';

// this class extends Scene class
export default class PlayGame extends Phaser.Scene {

  private is_endgame = false;
  private text_timer: Phaser.GameObjects.Text | undefined;
  private win_popup: SuccessFailPopup | undefined;
  private main_font: Phaser.Loader.LoaderPlugin | undefined;
  private clock: THREE.Clock | undefined;
  private ATTACK_STATE = 1;

  private DEFEND_STATE = 2;

  private user:any;
  private animationId:any;
  private enemy:any;
  private main_container: Phaser.GameObjects.Container | undefined;
  private threeScene: THREE.Scene | undefined;
  private threerenderer: THREE.WebGLRenderer | undefined;
  private mixers: THREE.AnimationMixer[] | undefined;
  private model1_animation_attack:any;
  private model1_animation_idle:any;
  private model2_animation_attack:any;
  private model2_animation_idle:any;
  private model1: THREE.Object3D | undefined;
  private model2: THREE.Object3D | undefined;
  private modelshield1: THREE.Object3D | undefined;
  private modelshield2: THREE.Object3D | undefined;
  private model_attack1: THREE.Object3D | undefined;
  private model_attack2: THREE.Object3D | undefined;

  //sound effect

  private charging_sound: Phaser.Sound.HTML5AudioSound | undefined;
  private attack_sound: Phaser.Sound.HTML5AudioSound | undefined;
  private block_sound: Phaser.Sound.HTML5AudioSound | undefined;
  private explode_sound: Phaser.Sound.HTML5AudioSound | undefined;
  private clock_sound: Phaser.Sound.HTML5AudioSound | undefined;
  stats: any;
  camera: THREE.PerspectiveCamera | undefined;
  
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
    this.load.audio('charging', 'sounds/battle/charge.wav');
    this.load.audio('attack', 'sounds/battle/attack.wav');
    this.load.audio('block', 'sounds/battle/block.wav');
    this.load.audio('explode', 'sounds/battle/explode.wav');
    this.load.audio('clock', 'sounds/battle/clock.mp3');
    this.main_font = this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    this.load_sound_effect();
    this.load_images();
    //load image main
    WebFont.load({
      google: {
        families: ['Mochiy Pop One'],
      },
      active: function () {
        console.log('font loaded');
      },
    });
  }

  load_images() {
    this.load.html('inputtext', 'assets/input_text.html');
    this.load.image('btn_upgrade', 'assets/upgrade/btn_upgrade.png');
    this.load.image('upgrade_item', 'assets/upgrade/upgrade_item.png');
    this.load.image('bg', 'assets/prayscene/bg.png');
    this.load.image('angle', 'assets/prayscene/angle.png');
    this.load.image('btn_pray', 'assets/prayscene/button_pray.png');
    this.load.image('praypoints_holder', 'assets/prayscene/praypoints_holder.png');
    //load panel bottom menu
    this.load.image('bg_bootmenu', 'assets/bottom_menu/bg.png');
    this.load.image('border_progress_pray_point', 'assets/prayscene/border_progress_pray_point.png');
    this.load.image('item_bg', 'assets/bottom_menu/item_bg.png');
    this.load.image('bg_nav', 'assets/bottom_menu/nav_bg.png');
    this.load.image('ic_character', 'assets/icon/ic_character.png');
    this.load.image('ic_upgrade', 'assets/icon/ic_upgrade.png');
    this.load.image('ic_battle', 'assets/icon/ic_battle.png');
    this.load.image('ic_pray', 'assets/icon/ic_pray.png');
    this.load.image('ic_market', 'assets/icon/ic_market.png');
    // load icon for popup out of pray point
    this.load.image('bg_popup_out_pray', 'assets/popup/out_pray/bg_out_pray_popup.png');
    this.load.image('bg_item_popup_out_pray', 'assets/popup/out_pray/bg_item.png');
    this.load.image('ic_x_cross', 'assets/icon/ic_x_cross.png');
    this.load.image('ic_sand_clock', 'assets/icon/ic_sand_clock.png');
    this.load.image('ic_battle_shadow', 'assets/icon/ic_battle_shadow.png');
    // load image for top bar
    this.load.image('bg_top_bar', 'assets/topbar/bg.png');
    this.load.image('avatar', 'assets/topbar/fullavatar.png');
    this.load.image('exp_border', 'assets/topbar/exp_border.png');
    this.load.image('exp_progress', 'assets/topbar/exp_full.png');
    this.load.image('avatar_mask', 'assets/topbar/avatar_mask.png');
    // load image for upgrade popup        
    this.load.image('bg_upgrade_popup', 'assets/upgrade/bg.png');
    this.load.image('panel_upgrade', 'assets/upgrade/panel.png');
    this.load.image('upgrade_item', 'assets/upgrade/upgrade_item.png');
    this.load.image('ic_minus', 'assets/icon/ic_minus.png');
    this.load.image('ic_plus', 'assets/icon/ic_plus.png');
    this.load.image('bg_value', 'assets/upgrade/value_bg.png');
    //load image stone 
    this.load.image('red1', 'assets/stones/red1.png');
    this.load.image('red2', 'assets/stones/red2.png');
    this.load.image('red3', 'assets/stones/red3.png');
    this.load.image('yellow1', 'assets/stones/yellow1.png');
    this.load.image('yellow2', 'assets/stones/yellow2.png');
    this.load.image('yellow3', 'assets/stones/yellow3.png');
    this.load.image('green1', 'assets/stones/green1.png');
    this.load.image('green2', 'assets/stones/green2.png');
    this.load.image('green3', 'assets/stones/green3.png');
    // load image for winfail popup
    this.load.image('success', 'assets/popup/successfail/success.png');
    this.load.image('fail', 'assets/popup/successfail/fail.png');
  }

  load_sound_effect() {
    this.load.audio('main_sound', 'sounds/bg.ogg');
    this.load.audio('hover_button_sound', 'sounds/MI_SFX37.mp3');
    this.load.audio('click_button_sound', 'sounds/MI_SFX45.mp3');
    this.load.audio('show_sound', 'sounds/MI_SFX30.mp3');
    this.load.audio('success_sound', 'sounds/winfail.wav');
  }
  create(): void {
    //add data
    if (Global.nftData === undefined) {
      Global.nftData = NFTData.test_data();
    }
    this.is_endgame = false;
    console.log('create' + this.is_endgame);
    //add sound and config
    this.charging_sound = this.sound.add('charging',{volume: 0.2}) as Phaser.Sound.HTML5AudioSound;
    this.attack_sound = this.sound.add('attack') as Phaser.Sound.HTML5AudioSound;
    this.block_sound = this.sound.add('block') as Phaser.Sound.HTML5AudioSound;
    this.explode_sound = this.sound.add('explode') as Phaser.Sound.HTML5AudioSound;
    this.clock_sound = this.sound.add('clock') as Phaser.Sound.HTML5AudioSound;
    const main_sound = this.sound.add('main_sound', { loop: true, volume: 0.05 });
    main_sound.play();
    //
    const model1_position = new THREE.Vector3(2, 0.5, 0);
    const model2_position = new THREE.Vector3(-0.3, 0.5, 0);
    const model1_prepoint = new THREE.Vector3(model1_position.x - 0.2, model1_position.y + 0.2, model1_position.z);
    const model2_prepoint = new THREE.Vector3(model2_position.x + 0.2, model2_position.y + 0.2, model2_position.z);
    let modelsLoaded = 0;
    const totalModels = 2;
    this.clock = new THREE.Clock();
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
    this.mixers = [];
    const container = document.getElementById('three_canvas');
    container!.innerHTML = '';
    this.stats = new Stats();
    container!.appendChild(this.stats.dom);
    this.threerenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.threerenderer.setPixelRatio(window.devicePixelRatio);
    this.threerenderer.setSize(window.innerWidth, window.innerHeight);
    container!.appendChild(this.threerenderer.domElement);
    const pmremGenerator = new THREE.PMREMGenerator(this.threerenderer);

    this.threeScene = new THREE.Scene();
    this.threeScene!.environment = pmremGenerator.fromScene(new RoomEnvironment(this.threerenderer), 0.04).texture;
    this.threeScene!.add(new THREE.AxesHelper(1))
    this.threeScene!.add(new THREE.GridHelper(10, 10));
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    this.camera.position.set(5, 2, 8);
    
    const controls = new OrbitControls(this.camera, this.threerenderer.domElement);

    this.camera.position.set(4.408913443759985, 4.495799976780315, 4.0821300325293075);

    // Make sure the camera is still looking at the target
    // controls.update();
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.update();
    controls.enabled = true;
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    // Tạo texture từ hình ảnh
    let texture = new THREE.TextureLoader().load('assets/battle/health_border.png');
    // Tạo SpriteMaterial sử dụng texture
    let spriteMaterial = new THREE.SpriteMaterial({ map: texture });

    // Tạo Sprite sử dụng SpriteMaterial
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.1, 0.1);
    // Đặt vị trí của Sprite sao cho nó nằm trên đầu model
    sprite.position.set(model1_position.x, model1_position.y + 0.7, model1_position.z);

    // Thêm Sprite vào scene
    this.threeScene.add(sprite);
    loader.load('3dmodel/attack/scene.gltf', (gltf) => {
      this.model_attack1 = gltf.scene;
      this.model_attack1.position.set(model1_prepoint.x,model1_prepoint.y,model1_prepoint.z);
      this.model_attack1.scale.set(0.001, 0.001, 0.001);
      this.model_attack1.rotateX(1.5);
      this.model_attack1.rotateZ(1.5);
      this.model_attack1.visible = false;
      this.threeScene!.add(this.model_attack1);;
      console.log('attack loaded');
    }, undefined, function (e) {
      console.error(e);
    });

    loader.load('3dmodel/attack/scene.gltf', (gltf) => {
      this.model_attack2 = gltf.scene;
      this.model_attack2.position.set(model2_prepoint.x,model2_prepoint.y,model2_prepoint.z);
      this.model_attack2.scale.set(0.001, 0.001, 0.001);
      this.model_attack2.rotateX(1.5);
      this.model_attack2.rotateZ(1.5);
      this.model_attack2.visible = false;
      this.threeScene!.add(this.model_attack2);;
      console.log('attack loaded');
    }, undefined, function (e) {
      console.error(e);
    });

    const createTween_playerattack = (callback:()=>void) => {
      new Tween(this.model_attack1!.position)
      .to(model2_prepoint, 500)
      .onStart(() => {
        console.log('tween start');
        this.model_attack1!.visible = true;
        this.attack_sound?.play();
      })
      .onComplete(() => {
        this.model_attack1!.visible = false;
        if (this.enemy.state === this.ATTACK_STATE) {
          this.explode_sound?.play();;
        }else{
          this.block_sound?.play();
        }
        callback();
        console.log('tween complete');
      }).start();
    }

    
    const createTween_enemyattack = (callback:()=>void) => {
      new Tween(this.model_attack2!.position)
      .to(model1_prepoint, 500)
      .onStart(() => {
        console.log('tween start');
        this.model_attack2!.visible = true;
        this.attack_sound?.play();
      })
      .onComplete(() => {
        this.model_attack2!.visible = false;
        if (this.user.state === this.ATTACK_STATE) {
          this.explode_sound?.play();;
        }else{
          this.block_sound?.play();
        }
        callback();
        console.log('tween complete');
      }).start();
    }


    loader.load('3dmodel/shield/shield.gltf', (gltf) => {
      this.modelshield1 = gltf.scene;
      this.modelshield1.position.set(model1_prepoint.x,model1_prepoint.y,model1_prepoint.z);
      this.modelshield1.scale.set(8, 8, 8);
      this.modelshield1.rotateX(1.5);
      this.modelshield1.rotateZ(1.5);
      this.modelshield1.visible = false;
      this.threeScene!.add(this.modelshield1);;
      console.log('attack loaded');
    }, undefined, function (e) {
      console.error(e);
    });

    loader.load('3dmodel/shield/shield.gltf', (gltf) => {
      this.modelshield2 = gltf.scene;
      this.modelshield2.position.set(model2_prepoint.x,model2_prepoint.y,model2_prepoint.z);
      this.modelshield2.scale.set(8, 8, 8);
      this.modelshield2.rotateY(3);
      this.modelshield2.rotateX(1.5);
      this.modelshield2.rotateZ(1.5);
      this.modelshield2.visible = false;
      this.threeScene!.add(this.modelshield2);;
      console.log('attack loaded');
    }, undefined, function (e) {
      console.error(e);
    });

    // Tạo một Tween để di chuyển hình cầu từ vị trí model 1 tới model 2
    loader.load('3dmodel/kpop.gltf', (gltf) => {
      modelsLoaded++;
      this.model1 = gltf.scene;
      this.model1.position.set(model1_position.x, model1_position.y, model1_position.z);
      this.model1.scale.set(0.2, 0.2, 0.2);
      this.model1.rotateY(-2);
      this.threeScene!.add(this.model1);;
      const mixer = new THREE.AnimationMixer(this.model1);
      this.mixers!.push(mixer);
      this.model1_animation_idle = mixer.clipAction(gltf.animations[0]);
      this.model1_animation_idle.play();
      mixer.addEventListener('finished', (event) =>{
          sprite.scale.set(1, 0.1, 0.1);
          console.log('model2_fight');
          this.model_attack1!.position.set(model1_prepoint.x,model1_prepoint.y,model1_prepoint.z);
          this.charging_sound?.stop();
          createTween_playerattack(()=>{
            this.changeHealthEnemy(this.user.user_data.attack, this.user.state === this.DEFEND_STATE);
            this.model1_animation_idle.play();
          });
      });
      this.model1_animation_attack =  mixer.clipAction(gltf.animations[1]);
      this.model1_animation_attack.setLoop(THREE.LoopOnce); // Set the loop mode to once
      this.model1_animation_attack.clampWhenFinished = true;
      this.model_attack1!.position.set(model1_prepoint.x,model1_prepoint.y,model1_prepoint.z);
    }, undefined, function (e) {
      console.error(e);
    });

    loader.load('3dmodel/kpop.gltf', (gltf) => {
      modelsLoaded++;
      this.model2 = gltf.scene;
      this.model2.position.set(model2_position.x, model2_position.y, model2_position.z);
      this.model2.scale.set(0.2, 0.2, 0.2);
      this.model2.rotateY(1);
      this.model2.rotateX(0);
      this.threeScene!.add(this.model2);

      const mixer = new THREE.AnimationMixer(this.model2);
      this.mixers!.push(mixer);
      this.model2_animation_idle = mixer.clipAction(gltf.animations[0]);
      this.model2_animation_idle.play();
      mixer.addEventListener('finished', (event) =>{
        console.log('model2_fight');
        this.model_attack2!.position.set(model2_prepoint.x,model2_prepoint.y,model2_prepoint.z);
        this.charging_sound?.stop();
        createTween_enemyattack(()=>{
          this.changeHealthplayer(this.enemy.user_data.attack, this.user.state === this.DEFEND_STATE);
          this.model2_animation_idle.play();
        });
    });
      this.model2_animation_attack = mixer.clipAction(gltf.animations[1]);
      this.model2_animation_attack.setLoop(THREE.LoopOnce); // Set the loop mode to once
      this.model2_animation_attack.clampWhenFinished = true;
      console.log('model2');
      //sphere2.position.copy(this.model2.position);
    }, undefined, function (e) {

      console.error(e);

    });
    
    const btn_offset = 100;
    this.main_container = this.add.container(0, 0);
    const bg = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'battle_bg').setOrigin(0.5, 0.5).setScale(0.5);
    const health_border1 = this.add.image(this.game.canvas.width / 2 + 170, this.game.canvas.height / 2 - 300, 'health_border').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const health_progress1 = this.add.image(health_border1.x - health_border1.width / 4 + 1, health_border1.y, 'health_progress').setOrigin(0, 0.5).setScale(0.5, 0.5);
    health_progress1.name = 'health_progress1';
    const text_health1 = this.add.text(health_border1.x, health_border1.y, '100/100',{
      fontFamily: 'Mochiy Pop One',
      fontSize: '16px',
      color: '#fff',
      stroke: '#8D5522',
      strokeThickness: 1,
    }).setOrigin(0.5, 0.5);

    text_health1.name = 'text_health1';
    const health_border2 = this.add.image(this.game.canvas.width / 2 - 100, this.game.canvas.height / 2 - 500, 'health_border').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const health_progress2 = this.add.image(health_border2.x - health_border2.width / 4 + 1, health_border2.y, 'health_progress').setOrigin(0, 0.5).setScale(0.5, 0.5);
    health_progress2.name = 'health_progress2';
    const text_health2 = this.add.text(health_border2.x, health_border2.y, '100/100',{
      fontFamily: 'Mochiy Pop One',
      fontSize: '16px',
      color: '#fff',
      stroke: '#8D5522',
      strokeThickness: 1,
    }).setOrigin(0.5, 0.5);

    text_health2.name = 'text_health2';
    this.main_container.add([bg, health_border1, health_progress1, health_border2, health_progress2, text_health1, text_health2]);
    const bottom_bg = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.83, 'bottom_bg').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

    const btn_attack = new ButtonBattle(this, bottom_bg.x - btn_offset, bottom_bg.y - 80, 'btn_attack', () => {
      if (this.user.energy < 10) {
        this.change_State(this.DEFEND_STATE);
        return;
      }
      this.change_State(this.ATTACK_STATE);
    });
    btn_attack.name = 'btn_attack';
    const btn_defend = new ButtonBattle(this, bottom_bg.x + btn_offset, bottom_bg.y - 80, 'btn_defend', () => {
      this.change_State(this.DEFEND_STATE);
    });
    btn_defend.name = 'btn_defend';
    const energy_border = this.add.image(bottom_bg.x, bottom_bg.y, 'energy_border').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
    const energy_progress = this.add.image(energy_border.x - energy_border.width / 4 + 3, energy_border.y, 'energy_progress').setOrigin(0, 0.5).setScale(0.5, 1);
    energy_progress.name = 'energy_progress';
    this.text_timer = this.add.text(bottom_bg.x, bottom_bg.y + btn_offset - 20, '15S', {
      fontFamily: 'Mochiy Pop One',
      fontSize: '12px',
      color: '#fff',
      stroke: '#8D5522',
      strokeThickness: 1,
    }).setOrigin(0.5, 0.5);
    const btn_end = new CustomButton(this, bottom_bg.x, bottom_bg.y + btn_offset + 20, 'btn_end', '', () => {
    });
    this.main_container.add([bottom_bg, btn_attack, btn_defend, energy_border, energy_progress, this.text_timer, btn_end]);
    this.win_popup = new SuccessFailPopup(this, this.game.canvas.width / 2, this.game.canvas.height / 2);
    this.win_popup.hide_no_animation();
    this.main_container.add(this.win_popup);
    this.init_data_to_view();
  
    this.animate()
    this.run_timer(this.threerenderer);
  }
  
  stop_animate() {
    cancelAnimationFrame(this.animationId);
  }

  animate() {
    if (this.is_endgame) {
      cancelAnimationFrame(this.animationId);
      return;
    }
    console.log('animate');
    this.animationId = requestAnimationFrame(()=>{this.animate()});

    const delta = this.clock!.getDelta();

    for (const mixer of this.mixers!) {
      mixer.update(delta);
    }
    this.stats!.update();
    update();
    this.threerenderer!.render(this.threeScene!, this.camera!);
  }

  init_data_to_view() {
    const energy_progress = this.main_container!.getByName('energy_progress') as Phaser.GameObjects.Image;
    energy_progress.setScale(this.user.energy / this.user.user_data.energy, 1);
    const health_progress1 = this.main_container!.getByName('health_progress1') as Phaser.GameObjects.Image;
    health_progress1.setScale((this.user.current_health / 100) / 2, 0.5);
    const health_progress2 = this.main_container!.getByName('health_progress2') as Phaser.GameObjects.Image;
    health_progress2.setScale((this.enemy.current_health / 100) / 2, 0.5);
    this.change_State(this.ATTACK_STATE);
  };

  change_user_energy(value: number){
    let temp = this.user.energy + value;
    if (temp > this.user.user_data.energy) {
      temp = this.user.user_data.energy;
    }
    this.user.energy = temp;
    if (this.user.energy < 10) {
      this.change_State(this.DEFEND_STATE);
    }
    const energy_progress = this.main_container!.getByName('energy_progress') as Phaser.GameObjects.Image;
    energy_progress.setScale(this.user.energy / this.user.user_data.energy, 1);
  };

  change_State(state: number) {
    this.user.state = state;
    const btn_attack = this.main_container!.getByName('btn_attack') as ButtonBattle;
    const btn_defend = this.main_container!.getByName('btn_defend') as ButtonBattle;
    if (state === this.ATTACK_STATE) {
      btn_attack.onChangeState();
      btn_defend.resetState();
    } else {
      btn_defend.onChangeState();
      btn_attack.resetState();
    }
  };

  changeHealthplayer(attack: number, is_defend: boolean){
    attack = attack * 3;
    console.log('changeHealthplayer');
    let lost_health:number;
    if (is_defend) {
      const current_def = this.user.user_data.defense;
      lost_health = attack - current_def;
      if (lost_health < 0) {
        lost_health = 0;
      }
      this.user.current_health -= lost_health;
    } else {
      this.user.current_health -= attack;
      lost_health = attack;
    }
    this.blinkModel(this.model1!, 200);
    this.update_view_on_ChangeHealth(true,lost_health!);
    if (this.user.current_health <= 0) {
      this.is_endgame = true;
      this.threeScene?.clear();
      this.win_popup?.show_win(false,()=>{
        this.sound.stopAll();
        this.scene.restart();
      });
    }
  };
  
  changeHealthEnemy(attack: number, is_defend: boolean){
      attack = attack * 100;
      console.log('changeHealthEnemy');
      let lost_health:number;
      if (is_defend) {
        const current_def = this.enemy.user_data.defense;
        lost_health = attack - current_def;
        if (lost_health < 0) {
          lost_health = 0;
        }
        this.enemy.current_health -= lost_health;
      } else {
        this.enemy.current_health -= attack;
        lost_health = attack;
      }
      this.blinkModel(this.model2!, 200);
      this.update_view_on_ChangeHealth(false,lost_health!);
      if (this.enemy.current_health <= 0) {
        this.is_endgame = true;
        this.threeScene?.clear();
        this.win_popup?.show_win(true,()=>{
          this.sound.stopAll();
          this.scene.restart();
        });
      }   
    };
  
  update_view_on_ChangeHealth(is_user: boolean,dmg_number:number) {
    if (is_user) {
      const health_progress = this.main_container!.getByName('health_progress1') as Phaser.GameObjects.Image;
      let scalex = ((this.user.current_health / 100) / 2) > 0? (this.user.current_health / 100) / 2: 0;
      health_progress.setScale(scalex, 0.5);
      const text_health = this.main_container!.getByName('text_health1') as Phaser.GameObjects.Text;
      text_health.setText("-" + dmg_number);
      this.time.delayedCall(1000, () => {
        if(this.user.current_health < 0)
          this.user.current_health = 0;
        text_health.setText(this.user.current_health + '/100');
      });

    } else {
      if(this.enemy.current_health < 0)
        this.enemy.current_health = 0;
      let scalex = ((this.enemy.current_health / 100) / 2) > 0? (this.enemy.current_health / 100) / 2: 0;
      const health_progress = this.main_container!.getByName('health_progress2') as Phaser.GameObjects.Image;
      health_progress.setScale(scalex, 0.5);
      const text_health = this.main_container!.getByName('text_health2') as Phaser.GameObjects.Text;
      text_health.setText("-" + dmg_number);
      this.time.delayedCall(1000, () => {
        text_health.setText(this.enemy.current_health + '/100');
      });
    }
  };

  destroy_scene() {
  };

  blinkModel(model:THREE.Object3D, duration:number) {
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

  model1_fight(){
    this.model1_animation_attack.play();
    this.charging_sound?.play();
    this.model1_animation_attack.reset();
  }

  model2_fight(){
    this.model2_animation_attack.play();
    this.charging_sound?.play();
    this.model2_animation_attack.reset();
  }

  run_timer(renderer: THREE.WebGLRenderer){
    let time = 7;
    this.clock_sound?.play();
    this.clock_sound?.setLoop(true);
    this.time.addEvent({
      delay: 1000,
      repeat: 6,
      loop: true,
      callback: () => {
        if(this.is_endgame){
          //renderer.dispose();
        }
        time -= 1;
        if (time <= 3) {
          this.text_timer?.setTint(0xff0000);
          this.text_timer?.setScale(1.5);
        }else{
          this.text_timer?.setTint(0xffffff);
          this.text_timer?.setScale(1);
        }
        this.text_timer?.setText(time + 'S');
        if (time === 3) {
          this.clock_sound?.setRate(2);
          this.clock_sound?.setVolume(3);
        }
        if (time === 2) {
          //add logic random state for enemy
          const state = Math.floor(Math.random() * 2) + 1;
          this.enemy.state = state;
        }

        if (time === 0) {
          this.clock_sound?.setRate(1);
          this.clock_sound?.setVolume(1);
          //add logic compare state and calculate health
          if (this.user.state === this.ATTACK_STATE) {
            this.change_user_energy(-10);
            this.model1_fight();
          } else {
            this.modelshield1!.visible = true;
            this.time.delayedCall(3500, () => {
              this.modelshield1!.visible = false;
            
            }); //delay 1s to show shield
            this.change_user_energy(10);
          }
          if (this.enemy.state === this.ATTACK_STATE) {
            this.model2_fight();
          }else{
            this.modelshield2!.visible = true;
            this.time.delayedCall(3500, () => {
              this.modelshield2!.visible = false;
            });
          }
          time = 7;
        }
      },
    });
  };
}
    
 