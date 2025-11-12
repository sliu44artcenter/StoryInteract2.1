import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Snow Particle System
export function Snow({ intensity = 1.0 }) {
  const pointsRef = useRef()
  const velocitiesRef = useRef([])

  const particleCount = 2000

  const { positions, particles } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = []

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      velocities.push({
        y: -Math.random() * 0.05 - 0.02,
        x: (Math.random() - 0.5) * 0.02
      })
    }

    velocitiesRef.current = velocities

    return { positions, particles: particleCount }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < particleCount; i++) {
      const velocity = velocitiesRef.current[i]

      positions[i * 3] += velocity.x * intensity
      positions[i * 3 + 1] += velocity.y * intensity

      // Reset particle when it falls below ground
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 30
        positions[i * 3] = (Math.random() - 0.5) * 50
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Ground plane
export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#e8f0f7"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

// Sky background
export function Sky() {
  const meshRef = useRef()

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial
        color="#b8d4e8"
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// Scholar figure in center
export function Scholar() {
  return (
    <group position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 1.5, 8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#f5d5b8" />
      </mesh>

      {/* Hat (official scholar hat) */}
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.3, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Hat top */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 1.3, 0]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 1, 8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      <mesh position={[0.6, 1.3, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 1, 8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      <mesh position={[0.2, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  )
}

// Stone Houses
export function StoneHouses() {
  const positions = [
    [-4, 0, -3],
    [4, 0, -2],
    [-3, 0, 3],
    [3, 0, 4],
    [0, 0, -5]
  ]

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* House body */}
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[1.5, 2, 1.5]} />
            <meshStandardMaterial color="#7f8c8d" roughness={0.9} />
          </mesh>

          {/* Roof */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[1.2, 1.2, 4]} />
            <meshStandardMaterial color="#555555" />
          </mesh>

          {/* Window with warm light */}
          <mesh position={[0, 1.2, 0.76]}>
            <boxGeometry args={[0.4, 0.4, 0.02]} />
            <meshStandardMaterial
              color="#ffcc66"
              emissive="#ffcc66"
              emissiveIntensity={0}
            />
          </mesh>

          {/* Window light */}
          <pointLight
            position={[0, 1.2, 1]}
            color="#ffcc66"
            intensity={0}
            distance={3}
          />
        </group>
      ))}
    </group>
  )
}

// Wood Houses
export function WoodHouses() {
  const positions = [
    [-4, 0, -3],
    [4, 0, -2],
    [-3, 0, 3],
    [3, 0, 4],
    [0, 0, -5]
  ]

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* House body */}
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[1.5, 2, 1.5]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} />
          </mesh>

          {/* Roof */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[1.2, 1.2, 4]} />
            <meshStandardMaterial color="#654321" />
          </mesh>

          {/* Window */}
          <mesh position={[0, 1.2, 0.76]}>
            <boxGeometry args={[0.4, 0.4, 0.02]} />
            <meshStandardMaterial color="#2c1810" />
          </mesh>
        </group>
      ))}

      {/* Fire lights (initially off) */}
      <pointLight
        position={[0, 2, 0]}
        color="#ff6600"
        intensity={0}
        distance={10}
      />
    </group>
  )
}

// Straw Huts
export function StrawHuts() {
  const positions = [
    [-4, 0, -3],
    [4, 0, -2],
    [-3, 0, 3],
    [3, 0, 4],
    [0, 0, -5]
  ]

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Hut body */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.9, 1, 1.6, 8]} />
            <meshStandardMaterial color="#daa520" roughness={1} />
          </mesh>

          {/* Roof */}
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[1.1, 1.5, 8]} />
            <meshStandardMaterial color="#cd853f" roughness={1} />
          </mesh>

          {/* Small door */}
          <mesh position={[0, 0.5, 0.91]}>
            <boxGeometry args={[0.3, 0.6, 0.02]} />
            <meshStandardMaterial color="#8b7355" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Main lighting setup
export function Lighting() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Fill light */}
      <directionalLight
        position={[-5, 10, -5]}
        intensity={0.3}
        color="#b3d9ff"
      />

      {/* Rim light */}
      <pointLight
        position={[0, 5, 8]}
        intensity={0.5}
        color="#e6f2ff"
      />
    </>
  )
}
