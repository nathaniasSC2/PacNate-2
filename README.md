# PacNate 🎮⚡

**The Bejeweled Blitz of Pac-Man** - A roguelike Pac-Man game with bite-sized maps, random generation, and escalating challenge. Perfect for quick 5-10 minute gaming sessions!

## 🎯 Game Overview

PacNate Blitz transforms classic Pac-Man into an exciting roguelike experience with:
- **10 Levels to Victory**: Beat all 10 progressively harder levels to win!
- **8 Unique Map Templates**: Random selection each level keeps every run fresh
- **Roguelike Progression**: Dynamic difficulty with more ghosts and faster speeds
- **Portal System**: Teleport across the map for tactical advantages
- **Looping Map Patterns**: Bite-sized 15x15 mazes designed for quick completion

## ✨ Roguelike Features

### 🗺️ **Random Map Generation**
- 8 hand-crafted map templates with unique layouts
- New random map each level (no repeats until all seen)
- Maps include: Classic Loop, Double Loop, Spiral, Cross, Diamond, Maze Runner, Quarters, Gauntlet

### 🌀 **Portal System**
- Purple pulsing portals scattered across maps
- Teleport to random other portal on touch
- +25 points per portal use
- Strategic escapes from ghosts or shortcuts to pellets

### 👻 **Progressive Ghost Spawning**
- **Levels 1-2**: 2 ghosts (manageable warmup)
- **Levels 3-4**: 3 ghosts (moderate challenge)
- **Levels 5-7**: 4 ghosts (intense action)
- **Levels 8-10**: 5 ghosts (maximum chaos!)

### ⚡ **Escalating Difficulty**
- Smooth classic 60fps gameplay
- Speed increases +8% per level (gradual increase)
- Power pellet duration decreases (-800ms per level, min 2s)
- Ghost points scale with level (200 × level)
- Level completion bonus: 500 points per level

### 🏆 **Victory Condition**
- Complete all 10 levels = WIN!
- Massive bonus score for completion
- High score tracking across runs

## 🎮 How to Play

### Starting the Game

1. Open `index.html` in your browser
2. Press **SPACE** to begin your run
3. Clear all pellets to advance to next level
4. Beat level 10 to achieve victory!

### Controls

**Keyboard:**
- **Arrow Keys** or **WASD**: Move Pac-Man
- **SPACE**: Pause/Resume (or start new run after game over)
- **M**: Toggle sound on/off

**Buttons:**
- **Pause**: Pause/resume gameplay
- **Sound**: Toggle audio
- **Restart**: Start a fresh run from level 1

## 🎯 Gameplay Mechanics

### Scoring System
- **Small Pellet**: 10 points
- **Power Pellet**: 50 points
- **Portal Use**: 25 points
- **Ghost (powered up)**: 200 × current level points
- **Level Completion**: 500 bonus points

### Power Pellets
- Turn ghosts blue and vulnerable
- Duration: 8 seconds (level 1) → 2 seconds (level 10)
- Eat ghosts for big points while powered up
- Ghosts respawn at spawn points after being eaten

### Lives System
- Start with 3 lives (❤️❤️❤️)
- Lose a life when touching a ghost (unless powered up)
- Game over when all lives lost
- Positions reset after losing a life

### Portal Mechanics
- Walk over purple pulsing circles to teleport
- Randomly sends you to another portal on the map
- Can't teleport to the same portal you entered
- Grants points and escapes danger

## 🗺️ Map Types

Each map is fully connected with smooth pathable routes:

1. **Classic Loop**: Simple ring with central obstacles - great for beginners
2. **Double Loop**: Two connected rings - multiple path choices
3. **Spiral**: Inward spiral pattern - tricky navigation
4. **Connected Cross**: Symmetrical cross layout with strategic portals
5. **Diamond**: Diagonal patterns - unique movement flow
6. **Maze Runner**: Simplified connected corridors - strategic movement
7. **Split Zones**: Two zones linked by portals - portal mastery required
8. **The Gauntlet**: Long corridors packed with ghosts - test of skill

**Note**: All maps are fully connected and pathable. Map 7 features two zones that require portals to traverse between them, adding strategic teleportation gameplay.

## 👻 Ghost AI Personalities

- **Red Ghost (Chase)**: Directly pursues Pac-Man
- **Pink Ghost (Ambush)**: Aims 4 tiles ahead of Pac-Man
- **Cyan Ghost (Patrol)**: Patrols between map corners
- **Orange Ghost (Random)**: Unpredictable scatter behavior
- **Purple Ghost** (levels 8-10): Additional chaser

## 🎲 Roguelike Elements

### What Makes This Roguelike?
- ✅ **Randomization**: Different map each level
- ✅ **Progression**: Difficulty scales throughout run
- ✅ **Permanent Death**: Game over = start from level 1
- ✅ **Session-Based**: Complete 10-level run in one sitting
- ✅ **Variety**: 8 maps × random order = unique every time
- ✅ **High Stakes**: Lives are precious, play carefully

### Run Variance
No two runs are the same:
- Map order is randomized
- Ghost spawn positions vary per map
- Your strategy must adapt to each map's layout
- Portal locations create different tactical options

## 💡 Strategy Tips

### Early Game (Levels 1-3)
- Learn map layouts and portal locations
- Take your time, clear systematically
- Save power pellets for when ghosts cluster
- Practice portal usage without pressure

### Mid Game (Levels 4-7)
- Speed is increasing - make decisive moves
- Use portals defensively to escape danger
- Clear pellets near power pellets last
- Lead ghosts away before collecting clusters

### Late Game (Levels 8-10)
- Extremely fast - precision is critical
- 5 ghosts = use every tactical tool
- Power pellets are shorter - time carefully
- Portals are essential for survival
- Don't get greedy - survival > points

### Advanced Tactics
- **Portal Chains**: Use multiple portals in sequence for escapes
- **Ghost Herding**: Group ghosts before power pellet
- **Pattern Recognition**: Learn map-specific routes
- **Risk Management**: Know when to retreat vs. push forward
- **Power Timing**: Save power pellets for clutch moments

## 🏆 Winning the Game

**Victory Requirements:**
- Complete all 10 levels without losing all lives
- Each level must be fully cleared (all pellets eaten)
- No time limit - focus on survival and completion

**Victory Rewards:**
- Special victory screen
- Massive completion bonus (5000 points!)
- High score saves if new personal best
- Bragging rights!

## 🚀 Quick Setup

### Browser Play (Instant)
Simply open `index.html` in any modern browser. No installation needed!

### Local Server (Optional)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Then visit: http://localhost:8000
```

## 🎨 Technical Details

### Built With
- **Pure Vanilla JavaScript**: No frameworks or dependencies
- **HTML5 Canvas**: Smooth 60 FPS rendering
- **LocalStorage**: Persistent high score tracking
- **Responsive Design**: Works on desktop and tablet

### Performance
- Optimized collision detection
- Efficient pathfinding for ghost AI
- Smooth animations at 60 FPS
- Small file size (~30KB total)

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Session Design Philosophy

PacNate Blitz is designed around the "Bejeweled Blitz" philosophy:

- **Quick Sessions**: 30-60 seconds per level = 5-10 minute full runs
- **Immediate Action**: No menus or setup, just press space
- **Rising Tension**: Difficulty curve keeps you engaged
- **High Replayability**: Random maps = never gets stale
- **Skill Progression**: Learn patterns and improve over time
- **Clear Goal**: Beat level 10 = definitive win condition

Perfect for:
- Coffee breaks
- Between meetings
- Quick mental reset
- Score chasing
- Improving personal bests

## 📊 Difficulty Progression

Smooth classic gameplay with gradual difficulty increase:

| Level | Ghosts | Speed Mult | Power Duration | Intensity |
|-------|--------|------------|----------------|-----------|
| 1     | 2      | 1.0x       | 8.0s           | ⭐        |
| 2     | 2      | 1.08x      | 7.2s           | ⭐        |
| 3     | 3      | 1.16x      | 6.4s           | ⭐⭐      |
| 4     | 3      | 1.24x      | 5.6s           | ⭐⭐      |
| 5     | 4      | 1.32x      | 4.8s           | ⭐⭐⭐    |
| 6     | 4      | 1.40x      | 4.0s           | ⭐⭐⭐    |
| 7     | 4      | 1.48x      | 3.2s           | ⭐⭐⭐⭐  |
| 8     | 5      | 1.56x      | 2.4s           | ⭐⭐⭐⭐  |
| 9     | 5      | 1.64x      | 2.0s           | ⭐⭐⭐⭐⭐|
| 10    | 5      | 1.72x      | 2.0s           | ⭐⭐⭐⭐⭐|

**Base Speeds**: Pacman: 1.2, Ghosts: 0.95, Frightened: 0.6
**Speed Increase**: +8% per level (gradual and smooth)

## 🔮 Future Enhancement Ideas

- Additional map templates
- Different tile types (speed boosts, etc.)
- Ghost modifiers (faster chase ghost, etc.)
- Daily challenge mode with fixed seed
- Leaderboard system
- Achievement system
- Multiple difficulty modes
- Endless mode after victory

## 🎮 Credits

Inspired by:
- **Pac-Man** (Namco, 1980) - The original arcade classic
- **Bejeweled Blitz** (PopCap) - Fast session design philosophy
- **Roguelike games** - Randomization and progression systems

Built from scratch as a modern web game optimized for quick, addictive gameplay sessions.

## 📝 License

Free to use for personal enjoyment. Have fun conquering all 10 levels!

---

**Ready to start your run? Press SPACE and go! 🟡👻⚡**
