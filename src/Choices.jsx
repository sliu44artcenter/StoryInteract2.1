import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

// Stone Icon
function StoneIcon({ position, onClick, visible }) {
  const groupRef = useRef()
  const lightRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta

    if (groupRef.current && visible) {
      // Gentle floating
      groupRef.current.position.y = position[1] + Math.sin(timeRef.current * 1.2) * 0.15
      groupRef.current.rotation.y += delta * 0.5

      // Pulsing glow
      if (lightRef.current) {
        lightRef.current.intensity = 2 + Math.sin(timeRef.current * 2) * 0.5
      }
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 1,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }, [])

  if (!visible) return null

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer'
        if (groupRef.current) {
          gsap.to(groupRef.current.scale, {
            x: 1.2, y: 1.2, z: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        }
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default'
        if (groupRef.current) {
          gsap.to(groupRef.current.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      }}
    >
      {/* Stone block */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color="#95a5a6"
          roughness={0.7}
          metalness={0.3}
          emissive="#95a5a6"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Stone texture detail */}
      <mesh position={[0.1, 0.1, 0.41]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial color="#7f8c8d" roughness={0.9} />
      </mesh>

      {/* Glow */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#95a5a6"
        intensity={2}
        distance={4}
      />

      {/* Glow sphere */}
      <mesh scale={1.3}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#95a5a6"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}

// Wood Icon
function WoodIcon({ position, onClick, visible }) {
  const groupRef = useRef()
  const lightRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta

    if (groupRef.current && visible) {
      groupRef.current.position.y = position[1] + Math.sin(timeRef.current * 1.5 + 2) * 0.15
      groupRef.current.rotation.y += delta * 0.5

      if (lightRef.current) {
        lightRef.current.intensity = 2 + Math.sin(timeRef.current * 2.5) * 0.5
      }
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 1,
        delay: 0.7,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }, [])

  if (!visible) return null

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer'
        if (groupRef.current) {
          gsap.to(groupRef.current.scale, {
            x: 1.2, y: 1.2, z: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        }
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default'
        if (groupRef.current) {
          gsap.to(groupRef.current.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      }}
    >
      {/* Wood log */}
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 1.2, 16]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.8}
          emissive="#8b4513"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wood rings */}
      <mesh position={[0.61, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.15, 0.25, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      <mesh position={[-0.61, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <ringGeometry args={[0.15, 0.25, 16]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Glow */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#d2691e"
        intensity={2}
        distance={4}
      />

      {/* Glow sphere */}
      <mesh scale={1.3}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#d2691e"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}

// Straw Icon
function StrawIcon({ position, onClick, visible }) {
  const groupRef = useRef()
  const lightRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta

    if (groupRef.current && visible) {
      groupRef.current.position.y = position[1] + Math.sin(timeRef.current * 1.8 + 4) * 0.15
      groupRef.current.rotation.y += delta * 0.5

      if (lightRef.current) {
        lightRef.current.intensity = 2 + Math.sin(timeRef.current * 3) * 0.5
      }
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 1,
        delay: 0.9,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }, [])

  if (!visible) return null

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer'
        if (groupRef.current) {
          gsap.to(groupRef.current.scale, {
            x: 1.2, y: 1.2, z: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        }
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default'
        if (groupRef.current) {
          gsap.to(groupRef.current.scale, {
            x: 1, y: 1, z: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      }}
    >
      {/* Straw bundle - multiple cylinders */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.25
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, 1, 6]} />
            <meshStandardMaterial
              color="#daa520"
              roughness={1}
              emissive="#daa520"
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}

      {/* Center straw */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1, 6]} />
        <meshStandardMaterial
          color="#daa520"
          roughness={1}
          emissive="#daa520"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glow */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#f4a460"
        intensity={2}
        distance={4}
      />

      {/* Glow sphere */}
      <mesh scale={1.3}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#f4a460"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}

// Main Choices component
export default function Choices({ onChoiceSelected, visible = true }) {
  const radius = 3.5
  const height = 3

  // Calculate positions in a circle around the scholar
  const stonePosition = [
    Math.cos(0) * radius,
    height,
    Math.sin(0) * radius
  ]

  const woodPosition = [
    Math.cos((Math.PI * 2) / 3) * radius,
    height,
    Math.sin((Math.PI * 2) / 3) * radius
  ]

  const strawPosition = [
    Math.cos((Math.PI * 4) / 3) * radius,
    height,
    Math.sin((Math.PI * 4) / 3) * radius
  ]

  return (
    <group>
      <StoneIcon
        position={stonePosition}
        onClick={() => onChoiceSelected('stone')}
        visible={visible}
      />
      <WoodIcon
        position={woodPosition}
        onClick={() => onChoiceSelected('wood')}
        visible={visible}
      />
      <StrawIcon
        position={strawPosition}
        onClick={() => onChoiceSelected('straw')}
        visible={visible}
      />
    </group>
  )
}
