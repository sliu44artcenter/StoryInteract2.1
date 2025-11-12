import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  Snow,
  Ground,
  Sky,
  Scholar,
  StoneHouses,
  WoodHouses,
  StrawHuts,
  Lighting
} from './Scene'
import Choices from './Choices'

// Camera controller for cinematic movement
function CameraController({ choice, isAnimating }) {
  const { camera } = useThree()
  const orbitRef = useRef(null)
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    if (!isAnimating) {
      // Slow orbit around the scene
      timeRef.current += delta * 0.15
      const radius = 15
      camera.position.x = Math.sin(timeRef.current) * radius
      camera.position.z = Math.cos(timeRef.current) * radius
      camera.position.y = 8
      camera.lookAt(0, 2, 0)
    }
  })

  useEffect(() => {
    camera.position.set(0, 8, 15)
    camera.lookAt(0, 2, 0)
  }, [camera])

  return null
}

// Main story orchestrator
function StoryScene() {
  const [choice, setChoice] = useState(null)
  const [showChoices, setShowChoices] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const skyRef = useRef()
  const snowRef = useRef()
  const stoneHousesRef = useRef()
  const woodHousesRef = useRef()
  const strawHutsRef = useRef()
  const fogRef = useRef()
  const ambientLightRef = useRef()
  const directionalLightRef = useRef()

  const { camera, scene } = useThree()

  // Set up fog
  useEffect(() => {
    scene.fog = new THREE.Fog('#b8d4e8', 10, 50)
    fogRef.current = scene.fog
  }, [scene])

  const handleChoiceSelected = (selectedChoice) => {
    if (isAnimating) return

    setChoice(selectedChoice)
    setShowChoices(false)
    setIsAnimating(true)

    // Animate choice selection and trigger ending
    gsap.delayedCall(1.5, () => {
      triggerEnding(selectedChoice)
    })
  }

  const triggerEnding = (selectedChoice) => {
    const timeline = gsap.timeline()

    if (selectedChoice === 'stone') {
      animateStoneEnding(timeline)
    } else if (selectedChoice === 'wood') {
      animateWoodEnding(timeline)
    } else if (selectedChoice === 'straw') {
      animateStrawEnding(timeline)
    }
  }

  const animateStoneEnding = (tl) => {
    const houses = stoneHousesRef.current

    // Phase 1: Stone houses rise from ground
    tl.to(houses.scale, {
      x: 1, y: 1, z: 1,
      duration: 2.5,
      ease: 'back.out(1.2)'
    })

    // Phase 2: Sky darkens, blizzard intensifies
    tl.to(skyRef.current.material.color, {
      r: 0.2, g: 0.25, b: 0.35,
      duration: 2
    }, 1.5)

    if (fogRef.current) {
      tl.to(fogRef.current, {
        density: 0.15,
        near: 5,
        far: 30,
        duration: 2
      }, 1.5)

      tl.to(fogRef.current.color, {
        r: 0.3, g: 0.35, b: 0.45,
        duration: 2
      }, 1.5)
    }

    // Intensify snow
    tl.to({}, { duration: 2 }, 1.5)

    // Phase 3: Window lights glow warmly
    houses.children.forEach((house, i) => {
      const windowLight = house.children.find(child => child.isPointLight)
      const windowMesh = house.children.find(child =>
        child.isMesh && child.geometry.parameters.width === 0.4
      )

      if (windowLight) {
        tl.to(windowLight, {
          intensity: 3.5,
          duration: 1.5,
          ease: 'power2.out'
        }, 4 + i * 0.2)
      }

      if (windowMesh && windowMesh.material) {
        tl.to(windowMesh.material, {
          emissiveIntensity: 2.5,
          duration: 1.5,
          ease: 'power2.out'
        }, 4 + i * 0.2)
      }
    })

    // Phase 4: Golden sunlight breaks through
    tl.to(directionalLightRef.current, {
      intensity: 1.5,
      duration: 3,
      ease: 'power2.inOut'
    }, 6)

    tl.to(directionalLightRef.current.color, {
      r: 1.0, g: 0.9, b: 0.7,
      duration: 3
    }, 6)

    tl.to(skyRef.current.material.color, {
      r: 0.95, g: 0.8, b: 0.6,
      duration: 3
    }, 6)

    if (fogRef.current) {
      tl.to(fogRef.current, {
        density: 0.02,
        duration: 3
      }, 6)

      tl.to(fogRef.current.color, {
        r: 0.95, g: 0.85, b: 0.7,
        duration: 3
      }, 6)
    }

    // Camera movement
    tl.to(camera.position, {
      y: camera.position.y + 3,
      duration: 9,
      ease: 'power1.inOut'
    }, 0)
  }

  const animateWoodEnding = (tl) => {
    const houses = woodHousesRef.current

    // Phase 1: Wooden houses appear
    tl.to(houses.scale, {
      x: 1, y: 1, z: 1,
      duration: 2.5,
      ease: 'back.out(1.2)'
    })

    // Phase 2: Night falls
    tl.to(skyRef.current.material.color, {
      r: 0.05, g: 0.05, b: 0.1,
      duration: 2.5
    }, 2)

    tl.to(ambientLightRef.current, {
      intensity: 0.15,
      duration: 2.5
    }, 2)

    if (fogRef.current) {
      tl.to(fogRef.current.color, {
        r: 0.1, g: 0.1, b: 0.15,
        duration: 2.5
      }, 2)
    }

    // Phase 3: Orange flickering light appears
    const fireLight = houses.children.find(child => child.isPointLight)
    if (fireLight) {
      tl.to(fireLight, {
        intensity: 1.5,
        duration: 1,
        ease: 'power2.in'
      }, 4.5)

      // Flickering effect
      tl.to(fireLight, {
        intensity: 2.5,
        duration: 0.1,
        repeat: 10,
        yoyo: true,
        ease: 'rough({ strength: 3, points: 20 })'
      }, 5.5)

      // Phase 4: Fire spreads
      tl.to(fireLight, {
        intensity: 6.0,
        distance: 15,
        duration: 2,
        ease: 'power2.out'
      }, 6.5)
    }

    // Phase 5: Houses turn black (burned)
    houses.children.forEach((house, i) => {
      const bodyMesh = house.children.find(child =>
        child.isMesh && child.geometry.type === 'BoxGeometry'
      )
      const roofMesh = house.children.find(child =>
        child.isMesh && child.geometry.type === 'ConeGeometry'
      )

      if (bodyMesh && bodyMesh.material) {
        tl.to(bodyMesh.material.color, {
          r: 0.1, g: 0.08, b: 0.05,
          duration: 2,
          ease: 'power2.in'
        }, 7 + i * 0.3)
      }

      if (roofMesh && roofMesh.material) {
        tl.to(roofMesh.material.color, {
          r: 0.05, g: 0.03, b: 0.02,
          duration: 2,
          ease: 'power2.in'
        }, 7 + i * 0.3)
      }
    })

    // Red smoke fills sky
    tl.to(skyRef.current.material.color, {
      r: 0.4, g: 0.1, b: 0.05,
      duration: 2.5
    }, 8)

    if (fogRef.current) {
      tl.to(fogRef.current, {
        density: 0.25,
        duration: 2.5
      }, 8)

      tl.to(fogRef.current.color, {
        r: 0.5, g: 0.15, b: 0.1,
        duration: 2.5
      }, 8)
    }

    // Camera movement with slight shake
    tl.to(camera.position, {
      y: camera.position.y - 1,
      x: camera.position.x + 2,
      duration: 10,
      ease: 'power1.inOut'
    }, 0)
  }

  const animateStrawEnding = (tl) => {
    const huts = strawHutsRef.current

    // Phase 1: Straw huts appear
    tl.to(huts.scale, {
      x: 1, y: 1, z: 1,
      duration: 2.5,
      ease: 'back.out(1.2)'
    })

    // Phase 2: Wind and snow intensify
    tl.to(skyRef.current.material.color, {
      r: 0.6, g: 0.7, b: 0.85,
      duration: 2
    }, 2)

    if (fogRef.current) {
      tl.to(fogRef.current.color, {
        r: 0.7, g: 0.75, b: 0.85,
        duration: 2
      }, 2)
    }

    tl.to(ambientLightRef.current.color, {
      r: 0.7, g: 0.8, b: 1.0,
      duration: 2
    }, 2)

    // Phase 3: Huts wobble in wind
    huts.children.forEach((hut, i) => {
      tl.to(hut.rotation, {
        z: 0.15,
        duration: 0.3,
        yoyo: true,
        repeat: 5,
        ease: 'sine.inOut'
      }, 4 + i * 0.1)
    })

    // Phase 4: Huts collapse
    huts.children.forEach((hut, i) => {
      tl.to(hut.scale, {
        y: 0.2,
        duration: 1.2,
        ease: 'power3.in'
      }, 6.5 + i * 0.3)

      tl.to(hut.rotation, {
        x: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
        z: Math.PI / 6 + (Math.random() - 0.5) * 0.3,
        duration: 1.2,
        ease: 'power3.in'
      }, 6.5 + i * 0.3)

      tl.to(hut.position, {
        y: -0.5,
        duration: 1.2,
        ease: 'bounce.out'
      }, 6.5 + i * 0.3)
    })

    // Phase 5: Heavy fog and blue-white lighting
    if (fogRef.current) {
      tl.to(fogRef.current, {
        density: 0.35,
        near: 3,
        far: 25,
        duration: 2.5
      }, 8)

      tl.to(fogRef.current.color, {
        r: 0.85, g: 0.9, b: 0.98,
        duration: 2.5
      }, 8)
    }

    tl.to(skyRef.current.material.color, {
      r: 0.75, g: 0.8, b: 0.9,
      duration: 2.5
    }, 8)

    // Camera tilts and pulls back
    tl.to(camera.position, {
      x: camera.position.x - 3,
      z: camera.position.z + 4,
      y: camera.position.y + 1,
      duration: 10,
      ease: 'power1.out'
    }, 0)
  }

  return (
    <>
      <CameraController choice={choice} isAnimating={isAnimating} />

      {/* Lighting */}
      <ambientLight ref={ambientLightRef} intensity={0.4} color="#ffffff" />
      <directionalLight
        ref={directionalLightRef}
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
      <directionalLight position={[-5, 10, -5]} intensity={0.3} color="#b3d9ff" />
      <pointLight position={[0, 5, 8]} intensity={0.5} color="#e6f2ff" />

      {/* Environment */}
      <Sky ref={skyRef} />
      <Snow ref={snowRef} intensity={1.0} />
      <Ground />

      {/* Scholar */}
      <Scholar />

      {/* Choices */}
      <Choices onChoiceSelected={handleChoiceSelected} visible={showChoices} />

      {/* Houses - all start hidden */}
      <group ref={stoneHousesRef} scale={[0, 0, 0]}>
        <StoneHouses />
      </group>

      <group ref={woodHousesRef} scale={[0, 0, 0]}>
        <WoodHouses />
      </group>

      <group ref={strawHutsRef} scale={[0, 0, 0]}>
        <StrawHuts />
      </group>
    </>
  )
}

// Main App
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas
        shadows
        camera={{ position: [0, 8, 15], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <StoryScene />
      </Canvas>
    </div>
  )
}
