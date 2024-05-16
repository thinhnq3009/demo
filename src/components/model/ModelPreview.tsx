'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { AnimationMixer } from 'three';
import Loading from '@/components/loading/loadingModel';

type CharacterProps = {
  modelUrl: string
  active: boolean
  onDispose?: () => void;
};

const Character = ({ modelUrl, active }: CharacterProps) => {
  const { scene: character, animations } = useGLTF(modelUrl);
  console.log(animations);
  console.log(character);
  const mixer = new AnimationMixer(character);
  const action = mixer.clipAction(animations[0]);
  action.play();
  const [y] = useState(-4);
  const [s] = useState(3.2);
  useFrame((state, delta) => {
    if (!active) return;
    mixer.update(delta);
  });

  return <primitive position={[0, y, 0]} object={character} scale={s}/>;
};
export default function ModelPreview({ modelUrl, active }: CharacterProps) {
  const [router] = useState(Math.PI / 2.22);
  // function removeObject3D(object3D) {
  //   if (!(object3D instanceof THREE.Object3D)) return false;

  //   // for better memory management and performance
  //   if (object3D.geometry) object3D.geometry.dispose();

  //   if (object3D.material) {
  //     if (object3D.material instanceof Array) {
  //       object3D.material.forEach((material: { dispose: () => unknown; }) => material.dispose());
  //     } else {
  //       object3D.material.dispose();
  //     }
  //   }
  //   object3D.removeFromParent(); 
  //   return true;
  // }
  // return <>ModelPreview</>;
  return <Canvas>
        <ambientLight intensity={2}/>
        <pointLight position={[10, 10, 10]}/>
        <spotLight position={[0, -10, 0]}/>
        <Suspense fallback={<Loading />}>
            <Character active={active} modelUrl={modelUrl}/>
            <Environment preset="sunset"/>
            <OrbitControls
                scale={[10, 10, 10]}
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minPolarAngle={router}
                maxPolarAngle={router}
                onUpdate={self => console.log(self)}/>
        </Suspense>
    </Canvas>;

}

