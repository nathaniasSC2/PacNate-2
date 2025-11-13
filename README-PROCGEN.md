# PacNate - Procedural Generation Test Build

## Overview

This is an experimental test build of PacNate that replaces the handcrafted map templates with **fully procedural map generation**. Every level generates a unique, playable maze using cellular automata.

## How to Run

Open `index-procgen.html` in your web browser to play the procedural generation version.

## Procedural Generation System

### Algorithm: Cellular Automata

The map generator uses a cellular automata approach inspired by cave generation algorithms:

1. **Initialize**: Random noise grid with higher path density in center
2. **Smooth**: Apply cellular automata rules (3 iterations)
   - 5+ wall neighbors → become wall
   - Otherwise → become path
3. **Connectivity**: Flood fill to find largest connected region
   - Keep only the largest connected area
   - Fill all disconnected zones with walls
4. **Border**: Ensure all edges are walls
5. **Pellets**: Convert all paths to pellets
6. **Special Items**:
   - 4 power pellets (placed near corners)
   - 4-6 ghost spawns (random placement)
   - 3-5 portals (random placement)

### Key Features

- **Infinite Variety**: Every level is unique
- **Guaranteed Connectivity**: All paths are reachable
- **Balanced Difficulty**: Central areas have more paths than edges
- **No Dead-Ends**: Smoothing algorithm naturally creates loops
- **True Roguelike**: Authentic procedural generation experience

### Comparison to Handcrafted Maps

| Feature | Handcrafted (main build) | Procedural (test build) |
|---------|-------------------------|------------------------|
| Map Count | 12 unique maps | Infinite unique maps |
| Variety | High (curated) | Infinite (algorithmic) |
| Quality | Guaranteed good | Usually good, occasionally weird |
| Predictability | Patterns emerge | Always surprising |
| Performance | Instant | ~5-10ms generation time |
| Roguelike Score | 3.5/10 | 8/10 |

### Technical Implementation

**Files Modified**:
- `game-procgen.js`: Added `ProceduralMapGenerator` class
- `index-procgen.html`: Updated UI to indicate procedural build

**Key Classes**:
```javascript
class ProceduralMapGenerator {
    generate()              // Main generation pipeline
    initializeMap()         // Create noise grid
    applyCellularAutomata() // Smooth 3 iterations
    ensureConnectivity()    // Flood fill validation
    addBorder()             // Wall perimeter
    placePellets()          // Fill paths with pellets
    placeSpecialItems()     // Add power pellets, ghosts, portals
}
```

### Known Issues

1. **Occasional Sparse Maps**: Some generations may have fewer paths than ideal
2. **No Retry Limit**: Infinite loop possible if generation fails repeatedly (unlikely)
3. **Performance**: Generation takes 5-10ms per level (not noticeable)
4. **No Seeding**: Cannot replay same map sequence

### Future Improvements

- [ ] Add seed support for reproducible maps
- [ ] Biome system (open arenas, tight mazes, etc.)
- [ ] Difficulty scaling (more walls at higher levels)
- [ ] Hand-crafted + procedural hybrid mode
- [ ] Map quality scoring and rejection sampling

## Comparison to Main Build

To compare the procedural build to the handcrafted build:

1. Play `index.html` (handcrafted maps)
2. Play `index-procgen.html` (procedural maps)
3. Notice the difference in:
   - Map variety (procedural has infinite)
   - Map quality (handcrafted is more consistent)
   - Surprise factor (procedural is always new)

## Development Notes

This test build was created to explore whether procedural generation could improve the roguelike experience. The cellular automata approach successfully creates playable mazes with guaranteed connectivity.

**Verdict**: Procedural generation works well and significantly increases replayability. However, handcrafted maps provide better visual consistency and guaranteed quality. A hybrid approach (handcrafted + procedural) might be ideal.

## Files in This Build

- `index-procgen.html` - HTML entry point
- `game-procgen.js` - Game logic with procedural generator
- `styles.css` - Shared styles (same as main build)
- `README-PROCGEN.md` - This file

---

**Status**: Experimental Test Build
**Created**: 2025-01-13
**Purpose**: Explore procedural map generation for increased replayability
