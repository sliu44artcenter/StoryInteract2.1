# The Scholar's Choice - 3D Interactive Story

An immersive 3D interactive story built with React, Three.js, and GSAP. Experience a cinematic tale told purely through visuals, lighting, and animation.

## Story

In a snowy winter city, a scholar who became a top official must decide how to build homes for his citizens. The viewer witnesses the consequences of their choice through a transforming 3D environment.

## Three Endings

### 🏛️ Stone Houses (Good Ending)
- Stone houses rise from the ground
- A blizzard intensifies but houses remain strong
- Warm window lights glow through the storm
- Golden sunlight breaks through as the storm clears

### 🔥 Wood Houses (Fire Ending)
- Wooden houses appear
- Night falls with flickering candlelight
- Fire spreads from house to house
- Red smoke fills the sky as houses burn black

### 💨 Straw Huts (Collapse Ending)
- Simple straw huts emerge
- Wind and snow intensify
- Huts wobble and collapse under pressure
- Blue-white fog engulfs the ruins

## Features

- **No Text Interface**: Story told entirely through visuals
- **Dynamic Lighting**: Atmospheric changes reflect the narrative
- **Smooth Animations**: GSAP-powered cinematic transitions
- **Particle Effects**: Dynamic snow system
- **Camera Movement**: Slow orbiting creates film-like experience
- **Interactive Icons**: Glowing, floating choice indicators

## Tech Stack

- **React** - Component architecture
- **Three.js** - 3D rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js helpers
- **GSAP** - Animation timeline and effects
- **Vite** - Fast development and build tool

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── main.jsx          # App entry point
├── App.jsx           # Main scene orchestrator
├── Scene.jsx         # Environment, lighting, models
├── Choices.jsx       # Interactive choice icons
└── animations.js     # GSAP animation timelines
```

## How It Works

1. **Initial Scene**: Scholar stands in center with snow falling, three glowing icons orbit around
2. **Choice Selection**: Click one of three icons (stone, wood, or straw)
3. **Transition**: Selected icon grows, others fade away
4. **Ending Animation**: Environment transforms based on choice with cinematic camera movement
5. **Visual Storytelling**: Lighting, fog, color, and motion convey the outcome

## Visual Design Principles

- **Lighting as Narrative**: Different colored lights represent mood (warm=safe, red=danger, blue=cold)
- **Camera as Director**: Slow movements guide viewer attention
- **Color Psychology**: Sky and fog colors reflect emotional tone
- **Scale and Motion**: Buildings rise, collapse, or burn to show consequence
- **Particle Systems**: Snow and debris enhance atmosphere

## Development Notes

- All animations are declarative GSAP timelines
- Three.js materials use emissive properties for glowing effects
- React refs provide access to 3D objects for animation
- Camera orbits autonomously before choice, then follows scripted path
- Fog density and color animate to enhance depth and mood

## Performance

- Optimized particle count (2000 snow particles)
- Shadow maps at 2048x2048 resolution
- Efficient geometry with appropriate polygon counts
- No texture loading - all materials use colors and shaders

---

**An interactive visual narrative experience by Claude Code**
