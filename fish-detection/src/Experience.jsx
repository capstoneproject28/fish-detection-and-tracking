import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Fish from './designComponents/Fish.jsx';
import { Text } from '@react-three/drei';

/*function AquaVisionText({ scrollY }) {
    const positionZ = -3 + scrollY * 0.1;  // Adjust for initial hidden position
    return (
        <Text
            position={[0, 0, positionZ]}
            fontSize={0.4}
            color="Black"
            //opacity={Math.max(opacity, 0)} // To ensure opacity doesn't go negative
        >
            Welcome to AquaVision
        </Text>
    );
}
*/

export default function Experience() {
    return (
        <>
            <OrbitControls makeDefault enableZoom={false} enablePan={false} />
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
            <Fish />
        </>
    );
}
//<AquaVisionText scrollY={scrollY} />

//<OrbitControls makeDefault enableZoom={false} enablePan={false} />
//<Perf position="top-left" />
//<OrbitControls makeDefault />
/*<mesh receiveShadow position-x={0} position-y={ -0.78 } position-z= {0} rotation-x={ - Math.PI * 0.5 } scale={1.5 }>
<planeGeometry />
<meshStandardMaterial color="cyan" />
</mesh>
*/