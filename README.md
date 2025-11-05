# PacNate 🎮

A modern, polished Pac-Man game optimized for quick 5-10 minute gaming sessions. Perfect for when you need a quick distraction or break!

## Features

- **Classic Gameplay**: Traditional Pac-Man mechanics with smooth controls
- **Quick Sessions**: Each game naturally lasts 5-10 minutes, perfect for short breaks
- **Progressive Difficulty**: Each level increases in speed and challenge
- **Smart Ghost AI**: Four ghosts with different personalities (Chase, Ambush, Patrol, Random)
- **Power-Ups**: Eat power pellets to turn the tables on ghosts
- **Local High Scores**: Track your best scores across sessions
- **Pause/Resume**: Flexible gameplay - pause anytime
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard & Button Controls**: Multiple input methods
- **Sound Toggle**: Play with or without sound effects

## How to Play

### Starting the Game

1. Open `index.html` in your web browser
2. Press **SPACE** or click anywhere to start

### Controls

**Keyboard:**
- **Arrow Keys** or **WASD**: Move Pac-Man
- **SPACE**: Start game / Pause / Resume
- **M**: Toggle sound on/off

**Mouse/Touch:**
- Click the **Pause** button to pause/resume
- Click **Sound** button to toggle audio
- Click **Restart** button to start a new game

### Gameplay

- **Objective**: Eat all pellets to complete the level
- **Pellets**: Small dots worth 10 points each
- **Power Pellets**: Large dots in corners worth 50 points - makes ghosts vulnerable for 10 seconds
- **Ghosts**: Avoid ghosts or they'll cost you a life. When powered up, eat them for 200 points!
- **Lives**: You start with 3 lives. Game over when all lives are lost
- **Levels**: Each level gets progressively faster

### Ghost Personalities

- **Red Ghost (Chase)**: Directly chases Pac-Man
- **Pink Ghost (Ambush)**: Tries to get ahead of Pac-Man
- **Cyan Ghost (Patrol)**: Patrols between corners
- **Orange Ghost (Random)**: Moves randomly, unpredictable

### Scoring

- **Small Pellet**: 10 points
- **Power Pellet**: 50 points
- **Ghost (when powered up)**: 200 points

## Quick Setup

Simply open `index.html` in any modern web browser. No installation or build process required!

```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Node.js
npx http-server

# Then visit: http://localhost:8000
```

## Game Design Choices

This game is specifically designed for quick sessions:

1. **Balanced Difficulty**: Starts easy but ramps up gradually
2. **Clear Progression**: Visual feedback for score, lives, and level
3. **No Grinding**: Each level is completable in 2-3 minutes
4. **Instant Restart**: Quick reset to jump right back in
5. **Saved Progress**: High scores persist across sessions

## Browser Compatibility

Works best in modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Tips for Best Experience

- **Full Screen**: Press F11 for immersive gameplay
- **Clear Mind**: Each session is a fresh start - focus on the current game
- **Learn Patterns**: Ghost AI is consistent - learn their behaviors
- **Corner Power**: Use power pellets strategically when ghosts are nearby
- **Quick Breaks**: Perfect for 5-10 minute breaks between work sessions

## Technical Details

- **Pure Vanilla JS**: No frameworks or dependencies
- **Canvas Rendering**: Smooth 60 FPS gameplay
- **LocalStorage**: Persistent high score tracking
- **Responsive Design**: Adapts to different screen sizes
- **Optimized Performance**: Efficient collision detection and rendering

## Future Enhancements (Ideas)

- Fruit bonuses for extra points
- Different maze layouts
- Online leaderboards
- Mobile touch controls
- Custom difficulty settings
- Achievement system

## Credits

Inspired by the classic Pac-Man arcade game by Namco (1980). This is a modern recreation built from scratch for quick, casual gaming sessions.

## License

Free to use for personal enjoyment. Have fun!

---

**Enjoy your quick Pac-Man sessions! 🟡👻**
