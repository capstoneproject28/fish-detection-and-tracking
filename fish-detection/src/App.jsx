import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import './App.css' 

export default function App(){
    return(
        <>
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
        >
            <Experience />
        </Canvas>
        </>
    )
}
