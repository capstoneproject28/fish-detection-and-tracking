import React from 'react';
import { useLoader } from '@react-three/fiber' 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function ThreeModel()
{
    const model = useLoader(GLTFLoader, './scene.gltf')
    console.log(model)

}