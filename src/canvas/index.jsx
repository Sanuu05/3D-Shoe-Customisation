import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Stage, PresentationControls } from '@react-three/drei'
import { Model } from './Model'
import { Box, CircularProgress } from '@mui/material'

const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      flexDirection: 'column',
      gap: 2
    }}
  >
    <CircularProgress sx={{ color: 'var(--accent-color)' }} />
    <Box sx={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
      Loading 3D Model...
    </Box>
  </Box>
)

const index = ({ rotate }) => {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.4} />
        
        {/* Key Light */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill Light */}
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.8}
          color="#4facfe"
        />
        
        {/* Rim Light */}
        <directionalLight
          position={[0, 5, -10]}
          intensity={0.6}
          color="#f093fb"
        />
        
        {/* Point lights for extra sparkle */}
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#667eea" />
        
        {/* Simple lighting environment - no HDR files needed */}
        
        {/* Enhanced Model Presentation */}
        <PresentationControls
          enabled={true}
          global={false}
          cursor={true}
          snap={false}
          speed={1}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Model />
        </PresentationControls>
        
        {/* Enhanced Contact Shadows */}
        <ContactShadows 
          position={[0, -1.4, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
        
        {/* Orbit Controls for manual control */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          minDistance={2}
          maxDistance={8}
          autoRotate={rotate}
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}

export default index