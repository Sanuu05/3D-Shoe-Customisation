import React from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls,Environment,ContactShadows} from '@react-three/drei'
import { Suspense } from 'react'
import { Model } from './Model'
const index = ({rotate}) => {
  return (
     <Canvas shadows camera={{ position: [0, 0, 2], fov: 70 }}>
     <ambientLight intensity={0.7} />
     <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
     <Model />
     {/* <Environment preset="city" /> */}
     <ContactShadows position={[0, -0.8, 0]} opacity={0.8} scale={10} blur={1} far={0.8} />
     <OrbitControls  />
   </Canvas>
  )
}

export default index