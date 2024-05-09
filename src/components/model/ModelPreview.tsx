'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { AnimationMixer } from 'three';

const Character = () => {
  const { scene: character, animations } = useGLTF('/assets/models/Soldier.glb');
  console.log(animations);
  console.log(character);
  const mixer = new AnimationMixer(character);
  const action = mixer.clipAction(animations[0]);
  action.play();
  const [y] = useState(-2.6);
  const [s] = useState(3.2);
  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return <primitive position={[0, y, 0]} object={character} scale={s}/>;
};
export default function ModelPreview() {
  // const [router] = useState(Math.PI / 2.22);
  return <Canvas>
        <ambientLight intensity={2}/>
        <pointLight position={[10, 10, 10]}/>
        <spotLight position={[0, -10, 0]}/>
        <Suspense fallback={null}>
            <Character/>
            <Environment preset="sunset"/>
            <OrbitControls
                scale={[10, 10, 10]}
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                // minPolarAngle={router}
                // maxPolarAngle={router}
                onUpdate={self => console.log(self)}/>
        </Suspense>
    </Canvas>;

}

