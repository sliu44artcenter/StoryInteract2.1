import gsap from 'gsap'

// Stone House Ending - Good Ending
export const animateStoneEnding = (refs) => {
  const {
    houses,
    lights,
    fog,
    sky,
    snow,
    camera,
    windowLights,
    sunlight
  } = refs

  const tl = gsap.timeline()

  // Phase 1: Houses appear (stone)
  tl.to(houses.stone.scale, {
    x: 1, y: 1, z: 1,
    duration: 2,
    ease: 'back.out(1.2)',
    stagger: 0.3
  }, 0)

  // Phase 2: Blizzard intensifies
  tl.to(sky.material.color, {
    r: 0.2, g: 0.25, b: 0.35,
    duration: 2
  }, 1)

  tl.to(fog, {
    density: 0.15,
    duration: 2
  }, 1)

  tl.to(snow.intensity, {
    value: 2.0,
    duration: 2
  }, 1)

  // Phase 3: Window lights glow warmly
  tl.to(windowLights, {
    intensity: 3.0,
    duration: 1.5,
    ease: 'power2.out'
  }, 3)

  // Phase 4: Golden sunlight breaks through
  tl.to(sunlight.intensity, {
    value: 2.5,
    duration: 3,
    ease: 'power2.inOut'
  }, 4.5)

  tl.to(sunlight.color, {
    r: 1.0, g: 0.85, b: 0.4,
    duration: 3
  }, 4.5)

  tl.to(sky.material.color, {
    r: 0.9, g: 0.75, b: 0.5,
    duration: 3
  }, 4.5)

  tl.to(fog, {
    density: 0.02,
    duration: 3
  }, 4.5)

  // Camera movement
  tl.to(camera.position, {
    y: camera.position.y + 2,
    duration: 7,
    ease: 'power1.inOut'
  }, 0)

  return tl
}

// Wood House Ending - Fire
export const animateWoodEnding = (refs) => {
  const {
    houses,
    lights,
    fog,
    sky,
    snow,
    camera,
    fireLight,
    fireParticles
  } = refs

  const tl = gsap.timeline()

  // Phase 1: Wooden houses appear
  tl.to(houses.wood.scale, {
    x: 1, y: 1, z: 1,
    duration: 2,
    ease: 'back.out(1.2)',
    stagger: 0.3
  }, 0)

  // Phase 2: Night falls
  tl.to(sky.material.color, {
    r: 0.05, g: 0.05, b: 0.1,
    duration: 2
  }, 1.5)

  tl.to(lights.ambient.intensity, {
    value: 0.1,
    duration: 2
  }, 1.5)

  // Phase 3: Orange light flickers inside
  tl.to(fireLight.start, {
    intensity: 2.0,
    duration: 1,
    ease: 'power2.in'
  }, 3)

  // Phase 4: Fire spreads
  tl.to(fireLight.spread, {
    intensity: 5.0,
    duration: 2,
    ease: 'power2.out'
  }, 4)

  tl.to(fireParticles, {
    active: true,
    duration: 0.1
  }, 4)

  // Phase 5: Houses turn black
  tl.to(houses.wood.material.color, {
    r: 0.1, g: 0.08, b: 0.05,
    duration: 2.5,
    stagger: 0.4
  }, 5)

  // Red smoke fills sky
  tl.to(fog.color, {
    r: 0.6, g: 0.2, b: 0.1,
    duration: 2
  }, 5.5)

  tl.to(fog, {
    density: 0.25,
    duration: 2
  }, 5.5)

  tl.to(sky.material.color, {
    r: 0.4, g: 0.1, b: 0.05,
    duration: 2
  }, 5.5)

  // Camera shakes slightly
  tl.to(camera.position, {
    x: camera.position.x + 0.3,
    y: camera.position.y - 0.5,
    duration: 6,
    ease: 'rough({ template: none.out, strength: 2, points: 20, taper: none, randomize: true, clamp: false })'
  }, 0)

  return tl
}

// Straw House Ending - Collapse
export const animateStrawEnding = (refs) => {
  const {
    houses,
    lights,
    fog,
    sky,
    snow,
    camera,
    windForce,
    debris
  } = refs

  const tl = gsap.timeline()

  // Phase 1: Straw huts appear
  tl.to(houses.straw.scale, {
    x: 1, y: 1, z: 1,
    duration: 2,
    ease: 'back.out(1.2)',
    stagger: 0.3
  }, 0)

  // Phase 2: Wind and snow intensify
  tl.to(snow.intensity, {
    value: 3.0,
    duration: 1.5
  }, 1.5)

  tl.to(windForce, {
    strength: 5.0,
    duration: 2,
    ease: 'power2.in'
  }, 1.5)

  tl.to(sky.material.color, {
    r: 0.15, g: 0.2, b: 0.3,
    duration: 2
  }, 1.5)

  // Phase 3: Huts start wobbling
  tl.to(houses.straw.rotation, {
    z: 0.15,
    duration: 0.5,
    yoyo: true,
    repeat: 3,
    ease: 'power1.inOut'
  }, 3)

  // Phase 4: Huts collapse
  tl.to(houses.straw.scale, {
    y: 0.3,
    duration: 1,
    ease: 'power2.in',
    stagger: 0.2
  }, 4.5)

  tl.to(houses.straw.rotation, {
    x: Math.PI / 4,
    z: Math.PI / 6,
    duration: 1,
    ease: 'power2.in',
    stagger: 0.2
  }, 4.5)

  // Debris scatters
  tl.to(debris, {
    active: true,
    duration: 0.1
  }, 4.8)

  // Phase 5: Blue-white lighting and heavy fog
  tl.to(lights.ambient.color, {
    r: 0.7, g: 0.8, b: 1.0,
    duration: 2
  }, 5.5)

  tl.to(fog.color, {
    r: 0.8, g: 0.85, b: 0.95,
    duration: 2
  }, 5.5)

  tl.to(fog, {
    density: 0.3,
    duration: 2
  }, 5.5)

  // Camera tilts
  tl.to(camera.position, {
    x: camera.position.x - 1,
    z: camera.position.z + 2,
    duration: 7,
    ease: 'power1.out'
  }, 0)

  return tl
}

// Fade out unselected choices
export const fadeOutChoices = (choiceRefs, selectedIndex) => {
  const tl = gsap.timeline()

  choiceRefs.forEach((ref, index) => {
    if (index !== selectedIndex) {
      tl.to(ref.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.8,
        ease: 'back.in(1.7)'
      }, 0)
    } else {
      // Selected choice grows and moves to center
      tl.to(ref.scale, {
        x: 1.5, y: 1.5, z: 1.5,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, 0)
      tl.to(ref.position, {
        y: ref.position.y + 1,
        duration: 1,
        ease: 'power2.out'
      }, 0.3)
      tl.to(ref.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.6,
        ease: 'power2.in'
      }, 1.2)
    }
  })

  return tl
}

// Initial camera orbit
export const cameraOrbit = (camera, targetPosition) => {
  const tl = gsap.timeline({ repeat: -1 })

  tl.to(camera.position, {
    x: targetPosition.x + Math.sin(0) * 15,
    z: targetPosition.z + Math.cos(0) * 15,
    duration: 20,
    ease: 'none',
    modifiers: {
      x: (x) => targetPosition.x + Math.sin(Date.now() * 0.0001) * 15,
      z: (z) => targetPosition.z + Math.cos(Date.now() * 0.0001) * 15
    }
  })

  return tl
}

// Glow pulse animation for choices
export const pulseGlow = (intensity) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true })

  tl.to(intensity, {
    value: intensity.value * 1.5,
    duration: 1.5,
    ease: 'sine.inOut'
  })

  return tl
}
