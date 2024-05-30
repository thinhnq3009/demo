import * as THREE from 'three';
import { GLTFLoader } from 'THREE/examples/jsm/loaders/GLTFLoader.js';
 
// this class extends Scene class
export class PlayGame extends Phaser.Scene {
 
  // the GLTF model is a Three group
  knight : THREE.Group;
 
  constructor() {
    super({
      key: 'PlayGame',
    });
  }
    
  preload() : void {
    // this is how we preload a generic text, in our case the GLTF JSON of the knight model
    this.load.text('knight', 'assets/3dmodel/barrel.gltf');
  }
 
  // method to be executed when the scene has been created
  create() : void {  
         
    // this is an adaptation of the demo found at
    // https://phaser.io/examples/v3/view/game-objects/particle-emitter/random-emit-zone
         
    const shape1 : Phaser.Geom.Circle = new Phaser.Geom.Circle(0, 0, 220);
    const shape2 : Phaser.Geom.Circle = new Phaser.Geom.Circle(0, 0, 240);
 
    // create a new THREE scene
    const threeScene : THREE.Scene = new THREE.Scene();
 
    // initialize the Three group
    this.knight = new THREE.Group();
 
    // create the renderer
    const renderer : THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas : this.sys.game.canvas,
      context : this.sys.game.context as WebGLRenderingContext,
      antialias : true,
    });
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 
    // set up the GLTF loader, load JSON model, then add it to the scene
    const gltfLoader = new GLTFLoader();
    gltfLoader.parse(this.cache.text.get('knight'), '', (gltf) => {
      this.knight = gltf.scene;
      this.knight.position.set(0, 0, 0);
      this.knight.scale.set(20, 20, 20);
      threeScene.add(this.knight); 
    });
 
    // add a camera
    const camera : THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
    camera.position.set(0, 17, 50);
    camera.lookAt(0, 17, 0);
 
    // add an ambient light
    const ambientLight : THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.8);
    threeScene.add(ambientLight);
          
    // add a spotlight
    const spotLight : THREE.SpotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 0, 50);
    spotLight.target.position.set(0, 0, 0);
    threeScene.add(spotLight);
    threeScene.add(spotLight.target);
 
    // create an Extern Phaser game object
    const view : Phaser.GameObjects.Extern = this.add.extern();
         
    // custom renderer
    // next line is needed to avoid TypeScript errors
    // @ts-expect-error
    view.render = () => {
      renderer.state.reset();
      renderer.render(threeScene, camera);
    };        
  }
 
  update() : void {
    this.knight.rotateY(0.02);
  }
}