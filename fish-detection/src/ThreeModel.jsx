import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model from "./scene.gltf";
import { Environment, OrbitControls } from "@react-three/drei";

function ThreeModel() {
  return (
    <div className="App">
      <Canvas camera={{ fov: 18 }}>
        <ambientLight intensity={1.25} />
        <Suspense fallback={null}>
        <Model />
        </Suspense>
        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ThreeModel;