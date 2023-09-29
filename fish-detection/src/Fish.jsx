import { Float, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Fish() {
    const fish = useGLTF('./fish/scene.gltf')
    const animations = useAnimations(fish.animations, fish.scene)

    const animationName = fish.animations[0].name;
    
    useEffect(() => {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animationName])

    return (
        <>
            <primitive
                object={fish.scene}
                scale={0.05}
                position={[0, 0, 0]}
            />
        </>
    )
    //<Float>
}
