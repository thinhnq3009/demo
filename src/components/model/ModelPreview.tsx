/* eslint-disable import/no-extraneous-dependencies */
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { AnimationMixer } from 'three';

const Character = () => {
  const { scene: character, animations } = useGLTF('/assets/models/Soldier.glb');
  console.log(animations);
  console.log(character);
  const mixer = new AnimationMixer(character);
  const action = mixer.clipAction(animations[0]);
  action.play();

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return <primitive position={[0, -1.7, 0]} object={character} scale={2.7}/>;
};
export default function ModelPreview() {
  // const character = useFBX('/assets/models/asuna.fbx');
  // const be = useFBX('/assets/models/demo/be.fbx');
  return <Canvas>
        <ambientLight intensity={2}/>
        <pointLight position={[10, 10, 10]}/>
        <spotLight position={[0, -10, 0]}/>
        <Suspense fallback={null}>
            <Character/>
            {/*<primitive position={[0, 0.1, 0]} object={be} scale={0.001}/>*/}
            <Environment preset="sunset"/>
            <OrbitControls
                scale={[10, 10, 10]}
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2.5}
                onUpdate={self => console.log(self)}/>
        </Suspense>
    </Canvas>;

}

