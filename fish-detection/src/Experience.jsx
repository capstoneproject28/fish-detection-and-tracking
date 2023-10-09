import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Fish from './designComponents/Fish.jsx'

export default function Experience()
{
    return <>
        <OrbitControls makeDefault enableZoom={false} enablePan={false} />
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias={ 0.04 } />
        <Fish />
    </>
}

//<Perf position="top-left" />
//<OrbitControls makeDefault />
/*<mesh receiveShadow position-x={0} position-y={ -0.78 } position-z= {0} rotation-x={ - Math.PI * 0.5 } scale={1.5 }>
<planeGeometry />
<meshStandardMaterial color="cyan" />
</mesh>
*/