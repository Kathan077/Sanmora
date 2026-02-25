import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 200 }) => {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (points.current) {
        points.current.rotation.x = clock.getElapsedTime() * 0.05;
        points.current.rotation.y = clock.getElapsedTime() * 0.03;
        
        // Gentle mouse influence
        points.current.rotation.x += (mouse.y * 0.1 - points.current.rotation.x) * 0.05;
        points.current.rotation.y += (mouse.x * 0.1 - points.current.rotation.y) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

const ConnectingLines = () => {
    // Advanced: Create lines between particles if close enough - simulating a neural network or constellation
    // For performance, we'll use a simpler visual approach first: Floating geometric shards
    return null; 
};

const MouseLight = () => {
  const light = useRef();
  const { viewport } = useThree();
  
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    if (light.current) {
        light.current.position.set(x, y, 2);
    }
  });

  return <pointLight ref={light} color="#8b5cf6" intensity={5} distance={6} />;
}


const FloatingShape = ({ position, color, speed }) => {
    const mesh = useRef();
    
    useFrame((state) => {
        mesh.current.rotation.x += 0.01 * speed;
        mesh.current.rotation.y += 0.015 * speed;
    });

    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={mesh} position={position}>
                <icosahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.1} 
                    metalness={0.8} 
                    transparent 
                    opacity={0.6}
                    wireframe 
                />
            </mesh>
        </Float>
    );
};


const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#050505', 5, 20]} />
        <ambientLight intensity={0.5} />
        
        {/* Dynamic Light following mouse */}
        <MouseLight />
        
        {/* Particle System */}
        <ParticleField count={400} />
        
        {/* Floating Geometric Shapes */}
        <FloatingShape position={[-3, 2, -2]} color="#06b6d4" speed={1.5} />
        <FloatingShape position={[3, -2, -1]} color="#8b5cf6" speed={1.2} />
        <FloatingShape position={[0, 0, -4]} color="#ffffff" speed={0.8} />

        {/* Background Stars as fallback depth */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
