// Game Configuration - Roguelike Blitz Mode
const CONFIG = {
    tileSize: 28,
    fps: 60,
    mapSize: 15, // Bite-sized maps
    maxLevel: 10, // Win after level 10!
    pacmanBaseSpeed: 1.2, // Classic smooth speed
    ghostBaseSpeed: 0.95, // Slightly slower than Pacman
    ghostSpeedMultiplier: 0.3, // Ghost speed increases slower than Pacman (was 0.5)
    frightenedGhostSpeed: 0.6, // Slower when vulnerable
    baseFrightenedDuration: 8000, // 8 seconds at level 1
    pointsPerPellet: 10,
    pointsPerPowerPellet: 50,
    pointsPerGhost: 200,
    pointsPerPortal: 25,
    levelCompletionBonus: 500,
    maxLives: 3,
    extraLifeEvery: 5000, // Award extra life every 5000 points
    speedIncreasePerLevel: 0.08, // Gradual increase
    frightenedDecreasePerLevel: 800,
    ghostIncreaseSchedule: [2, 2, 2, 3, 3, 4, 4, 4, 5, 5] // ghosts per level - smoother progression
};

// Bite-sized Map Templates with Looping Patterns and Portals
// 0=wall, 1=pellet, 2=power pellet, 3=empty, 4=ghost spawn, 5=portal
const MAP_TEMPLATES = [
    // Map 1: Classic Loop - Simple outer ring with center obstacles
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,1,1,1,1,0,1,1,1,1,1,2,0],
        [0,1,0,0,1,0,1,1,1,0,1,0,0,1,0],
        [0,1,0,4,1,0,1,0,1,0,1,4,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,1,0,0,0,4,0,0,0,1,0,1,0],
        [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
        [0,5,1,0,1,0,0,4,0,0,1,0,1,5,0],
        [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
        [0,1,0,1,0,0,0,4,0,0,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,4,1,0,1,0,1,0,1,4,0,1,0],
        [0,1,0,0,1,0,1,1,1,0,1,0,0,1,0],
        [0,2,1,1,1,1,1,0,1,1,1,1,1,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 2: Double Loop - Two connected rings
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,5,1,5,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
        [0,1,0,2,0,1,0,4,0,1,0,2,0,1,0],
        [0,1,0,0,0,1,1,1,1,1,0,0,0,1,0],
        [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
        [0,1,0,1,0,0,4,0,4,0,0,1,0,1,0],
        [0,1,1,1,1,1,0,4,0,1,1,1,1,1,0],
        [0,1,0,1,0,0,4,0,4,0,0,1,0,1,0],
        [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
        [0,1,0,0,0,1,1,1,1,1,0,0,0,1,0],
        [0,1,0,2,0,1,0,4,0,1,0,2,0,1,0],
        [0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,5,1,5,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 3: Spiral Pattern
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,0,1,1,1,1,1,1,1,1,1,0,1,0],
        [0,1,0,1,0,0,0,0,0,0,0,1,0,1,0],
        [0,1,0,1,0,1,1,1,1,1,0,1,0,1,0],
        [0,5,0,1,0,1,0,4,0,1,0,1,0,5,0],
        [0,1,0,1,0,1,0,4,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,4,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,1,1,1,1,0,1,0,1,0],
        [0,1,0,1,0,0,0,0,0,0,0,1,0,1,0],
        [0,1,0,1,1,1,1,1,1,1,1,1,0,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 4: Connected Cross - Fully pathable with strategic portals
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,1,0,0,0,1,0,5,0,1,0,0,0,1,0],
        [0,1,0,4,0,1,0,1,0,1,0,4,0,1,0],
        [0,1,0,0,0,1,1,1,1,1,0,0,0,1,0],
        [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
        [0,1,0,1,0,0,4,0,4,0,0,1,0,1,0],
        [0,5,1,1,1,0,0,4,0,0,1,1,1,5,0],
        [0,1,0,1,0,0,4,0,4,0,0,1,0,1,0],
        [0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
        [0,1,0,0,0,1,1,1,1,1,0,0,0,1,0],
        [0,1,0,4,0,1,0,1,0,1,0,4,0,1,0],
        [0,1,0,0,0,1,0,5,0,1,0,0,0,1,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 5: Diamond Loop
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,2,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
        [0,1,0,4,1,1,0,1,0,1,1,4,0,1,0],
        [0,1,1,1,0,1,0,1,0,1,0,1,1,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,5,0,1,0,1,0,1,0],
        [0,5,1,1,1,1,1,4,1,1,1,1,1,5,0],
        [0,1,0,1,0,1,0,5,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,1,1,0,1,0,1,0,1,0,1,1,1,0],
        [0,1,0,4,1,1,0,1,0,1,1,4,0,1,0],
        [0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,2,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 6: Maze Runner - Simplified connected corridors
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,1,1,1,1,5,1,1,1,1,1,2,0],
        [0,1,0,1,0,1,0,0,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,4,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,4,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,4,1,1,1,1,1,1,0],
        [0,5,0,1,0,1,0,4,0,1,0,1,0,5,0],
        [0,1,1,1,1,1,1,4,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,4,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,1,0,1,0,4,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,0,0,1,0,1,0,1,0],
        [0,2,1,1,1,1,1,5,1,1,1,1,1,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 7: Split Zones - Two zones connected by portals
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,1,1,1,1,5,1,1,1,1,1,2,0],
        [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,4,0,1,0,0,0,1,0,4,0,1,0],
        [0,1,0,0,0,1,1,1,1,1,0,0,0,1,0],
        [0,1,1,1,1,1,0,4,0,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,4,0,0,0,0,0,1,0],
        [0,5,1,1,1,1,1,4,1,1,1,1,1,5,0],
        [0,1,0,0,0,0,0,4,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,0,4,0,1,1,1,1,1,0],
        [0,1,0,0,0,1,1,1,1,1,0,0,0,1,0],
        [0,1,0,4,0,1,0,0,0,1,0,4,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        [0,2,1,1,1,1,1,5,1,1,1,1,1,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],

    // Map 8: The Gauntlet - Long corridors with danger
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,1,0,1,0,1,0,5,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,1,0,0,0,1,4,1,0,0,0,1,0,0],
        [0,1,1,1,4,1,1,4,1,1,4,1,1,1,0],
        [0,5,1,1,1,1,1,4,1,1,1,1,1,5,0],
        [0,1,1,1,4,1,1,4,1,1,4,1,1,1,0],
        [0,0,1,0,0,0,1,4,1,0,0,0,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,5,0,1,0,1,0,1,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
];

// Game State - Roguelike Edition
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Adjust canvas size for 15x15 map
        this.canvas.width = CONFIG.mapSize * CONFIG.tileSize;
        this.canvas.height = CONFIG.mapSize * CONFIG.tileSize;

        this.state = 'start'; // start, playing, paused, gameover, victory
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.level = 1;
        this.lives = CONFIG.maxLives;
        this.nextExtraLifeAt = CONFIG.extraLifeEvery; // Track when to award extra life
        this.soundEnabled = true;

        this.map = null;
        this.mapTemplate = null;
        this.pacman = null;
        this.ghosts = [];
        this.portals = [];
        this.pelletsRemaining = 0;
        this.frightenedMode = false;
        this.frightenedTimer = 0;
        this.usedMaps = []; // Track which maps have been used this run
        this.portalCooldown = 0; // Prevent portal exploit
        this.invincible = false; // Prevent lives race condition
        this.invincibleTimer = 0;

        this.keys = {};
        this.lastTime = 0;

        this.init();
    }

    loadHighScore() {
        try {
            return parseInt(localStorage.getItem('pacnate-highscore')) || 0;
        } catch (e) {
            // Private browsing or localStorage disabled
            return 0;
        }
    }

    saveHighScore() {
        try {
            localStorage.setItem('pacnate-highscore', this.highScore);
        } catch (e) {
            // Private browsing or localStorage disabled - silently fail
        }
    }

    init() {
        this.initializeLevel();
        this.setupEventListeners();
        this.updateUI();
        this.gameLoop(0);
    }

    selectRandomMap() {
        // If all maps used, reset the pool
        if (this.usedMaps.length >= MAP_TEMPLATES.length) {
            this.usedMaps = [];
        }

        // Select a map not recently used
        let availableMaps = [];
        for (let i = 0; i < MAP_TEMPLATES.length; i++) {
            if (!this.usedMaps.includes(i)) {
                availableMaps.push(i);
            }
        }

        const mapIndex = availableMaps[Math.floor(Math.random() * availableMaps.length)];
        this.usedMaps.push(mapIndex);
        return MAP_TEMPLATES[mapIndex];
    }

    createMap(template) {
        return template.map(row => [...row]);
    }

    initializeLevel() {
        // Select random map for this level
        this.mapTemplate = this.selectRandomMap();
        this.map = this.createMap(this.mapTemplate);

        // Find portals
        this.portals = [];
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                if (this.map[row][col] === 5) {
                    this.portals.push({x: col + 0.5, y: row + 0.5});
                }
            }
        }

        // Find pacman start position (first empty corridor)
        let startX = 7.5, startY = 7.5;
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                if (this.map[row][col] === 1) {
                    startX = col + 0.5;
                    startY = row + 0.5;
                    break;
                }
            }
            if (startX !== 7.5) break;
        }

        this.pelletsRemaining = this.countPellets();
        this.pacman = new Pacman(startX, startY);

        // Spawn ghosts based on level
        const ghostCount = CONFIG.ghostIncreaseSchedule[Math.min(this.level - 1, CONFIG.ghostIncreaseSchedule.length - 1)];
        this.ghosts = [];

        const ghostSpawns = [];
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                if (this.map[row][col] === 4) {
                    ghostSpawns.push({x: col + 0.5, y: row + 0.5});
                }
            }
        }

        const ghostColors = ['red', 'pink', 'cyan', 'orange', 'purple'];
        const ghostPersonalities = ['chase', 'ambush', 'patrol', 'random', 'chase'];

        for (let i = 0; i < Math.min(ghostCount, ghostSpawns.length); i++) {
            const spawn = ghostSpawns[i % ghostSpawns.length];
            this.ghosts.push(new Ghost(
                spawn.x,
                spawn.y,
                ghostColors[i % ghostColors.length],
                ghostPersonalities[i % ghostPersonalities.length]
            ));
        }

        this.frightenedMode = false;
        this.frightenedTimer = 0;
    }

    countPellets() {
        let count = 0;
        for (let row of this.map) {
            for (let cell of row) {
                if (cell === 1 || cell === 2) count++;
            }
        }
        return count;
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;

            if (e.key === ' ') {
                e.preventDefault();
                if (this.state === 'start') {
                    this.startGame();
                } else if (this.state === 'playing') {
                    this.pauseGame();
                } else if (this.state === 'paused') {
                    this.resumeGame();
                } else if (this.state === 'gameover' || this.state === 'victory') {
                    this.restartGame();
                }
            }

            if (e.key === 'm' || e.key === 'M') {
                this.toggleSound();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Button controls
        document.getElementById('pauseBtn').addEventListener('click', () => {
            if (this.state === 'playing') {
                this.pauseGame();
            } else if (this.state === 'paused') {
                this.resumeGame();
            }
        });

        document.getElementById('soundBtn').addEventListener('click', () => {
            this.toggleSound();
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });
    }

    startGame() {
        this.state = 'playing';
        this.hideOverlay();
    }

    pauseGame() {
        this.state = 'paused';
        this.showOverlay('Game Paused', 'Press SPACE to resume');
    }

    resumeGame() {
        this.state = 'playing';
        this.hideOverlay();
    }

    restartGame() {
        this.score = 0;
        this.level = 1;
        this.lives = CONFIG.maxLives;
        this.nextExtraLifeAt = CONFIG.extraLifeEvery;
        this.usedMaps = [];
        this.initializeLevel();
        this.state = 'playing';
        this.hideOverlay();
        this.updateUI();
    }

    gameOver() {
        this.state = 'gameover';
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.showOverlay('Game Over!', `New High Score: ${this.highScore}! Press SPACE to restart`);
        } else {
            this.showOverlay('Game Over!', `Score: ${this.score}. Press SPACE to restart`);
        }
        this.updateUI();
    }

    victory() {
        this.state = 'victory';
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
        this.showOverlay('🏆 VICTORY! 🏆', `You beat all ${CONFIG.maxLevel} levels! Score: ${this.score}. Press SPACE to play again!`);
        this.updateUI();
    }

    nextLevel() {
        this.level++;

        // Check for victory
        if (this.level > CONFIG.maxLevel) {
            // Add completion bonus
            this.score += CONFIG.levelCompletionBonus * CONFIG.maxLevel;
            this.updateUI();
            this.checkExtraLife();
            this.victory();
            return;
        }

        // Add level bonus
        this.score += CONFIG.levelCompletionBonus;
        this.initializeLevel();
        this.showOverlay(`Level ${this.level}!`, `Get ready... ${CONFIG.ghostIncreaseSchedule[this.level - 1]} ghosts incoming!`, 2000);
        setTimeout(() => {
            if (this.state !== 'gameover' && this.state !== 'victory') {
                this.hideOverlay();
            }
        }, 2000);
        this.updateUI();
        this.checkExtraLife();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        document.getElementById('soundBtn').textContent =
            this.soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    }

    showOverlay(title, message, autohide = 0) {
        document.getElementById('overlayTitle').textContent = title;
        document.getElementById('overlayMessage').textContent = message;
        document.getElementById('gameOverlay').classList.remove('hidden');

        if (autohide > 0) {
            setTimeout(() => this.hideOverlay(), autohide);
        }
    }

    hideOverlay() {
        document.getElementById('gameOverlay').classList.add('hidden');
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('level').textContent = `${this.level}/${CONFIG.maxLevel}`;
        document.getElementById('lives').textContent = '❤️'.repeat(Math.max(0, this.lives));
    }

    checkExtraLife() {
        if (this.score >= this.nextExtraLifeAt) {
            this.lives++;
            this.nextExtraLifeAt += CONFIG.extraLifeEvery;
            this.updateUI();
            this.showOverlay('Extra Life!', `🎉 You earned an extra life at ${this.score} points!`, 1500);
            setTimeout(() => {
                if (this.state === 'playing') {
                    this.hideOverlay();
                }
            }, 1500);
        }
    }

    handleInput() {
        if (this.keys['ArrowUp'] || this.keys['w'] || this.keys['W']) {
            this.pacman.setDirection(0, -1);
        }
        if (this.keys['ArrowDown'] || this.keys['s'] || this.keys['S']) {
            this.pacman.setDirection(0, 1);
        }
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
            this.pacman.setDirection(-1, 0);
        }
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
            this.pacman.setDirection(1, 0);
        }
    }

    update(deltaTime) {
        if (this.state !== 'playing') return;

        this.handleInput();

        // Update frightened mode timer
        if (this.frightenedMode) {
            this.frightenedTimer -= deltaTime;
            if (this.frightenedTimer <= 0) {
                this.frightenedMode = false;
                this.ghosts.forEach(ghost => ghost.frightened = false);
                this.hidePowerTimer();
            }
            this.updatePowerTimer();
        }

        // Update invincibility timer
        if (this.invincible) {
            this.invincibleTimer -= deltaTime;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }

        // Update portal cooldown
        if (this.portalCooldown > 0) {
            this.portalCooldown -= deltaTime;
        }

        // Update Pacman with level-based speed
        const speed = CONFIG.pacmanBaseSpeed + (this.level - 1) * CONFIG.speedIncreasePerLevel;
        this.pacman.update(this.map, speed);

        // Check pellet collision
        const tile = this.getTile(this.pacman.x, this.pacman.y);
        if (tile === 1) {
            this.setTile(this.pacman.x, this.pacman.y, 3);
            this.score += CONFIG.pointsPerPellet;
            this.pelletsRemaining--;
            this.updateUI();
            this.checkExtraLife();
        } else if (tile === 2) {
            this.setTile(this.pacman.x, this.pacman.y, 3);
            this.score += CONFIG.pointsPerPowerPellet;
            this.pelletsRemaining--;
            this.activatePowerMode();
            this.updateUI();
            this.checkExtraLife();
        } else if (tile === 5) {
            // Portal - teleport to another portal (with cooldown to prevent exploit)
            if (this.portalCooldown <= 0) {
                this.usePortal();
            }
        }

        // Update Ghosts with level-based speed (increases slower than Pacman)
        const ghostSpeed = this.frightenedMode ? CONFIG.frightenedGhostSpeed :
                          CONFIG.ghostBaseSpeed + (this.level - 1) * CONFIG.speedIncreasePerLevel * CONFIG.ghostSpeedMultiplier;
        this.ghosts.forEach(ghost => {
            ghost.update(this.map, this.pacman, ghostSpeed);

            // Check ghost collision (only if not invincible)
            if (!this.invincible && this.checkCollision(this.pacman, ghost)) {
                if (this.frightenedMode && ghost.frightened) {
                    this.eatGhost(ghost);
                } else if (!ghost.frightened) {
                    this.loseLive();
                }
            }
        });

        // Check level complete
        if (this.pelletsRemaining === 0) {
            this.nextLevel();
        }
    }

    usePortal() {
        // Find nearest portal
        let nearestPortal = null;
        let minDist = 0.5;

        for (let portal of this.portals) {
            const dx = this.pacman.x - portal.x;
            const dy = this.pacman.y - portal.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
                nearestPortal = portal;
                minDist = dist;
            }
        }

        if (nearestPortal) {
            // Find a different portal to teleport to
            const otherPortals = this.portals.filter(p => p !== nearestPortal);
            if (otherPortals.length > 0) {
                const targetPortal = otherPortals[Math.floor(Math.random() * otherPortals.length)];
                this.pacman.x = targetPortal.x;
                this.pacman.y = targetPortal.y;
                this.score += CONFIG.pointsPerPortal;
                this.portalCooldown = 500; // 500ms cooldown to prevent exploit
                this.updateUI();
                this.checkExtraLife();
            }
        }
    }

    activatePowerMode() {
        const duration = CONFIG.baseFrightenedDuration - (this.level - 1) * CONFIG.frightenedDecreasePerLevel;
        this.frightenedMode = true;
        this.frightenedTimer = Math.max(duration, 3000); // Minimum 3 seconds for playability
        this.frightenedDuration = this.frightenedTimer; // Store initial duration for UI percentage
        this.ghosts.forEach(ghost => ghost.frightened = true);
        this.showPowerTimer();
    }

    showPowerTimer() {
        document.getElementById('powerTimer').classList.remove('hidden');
    }

    hidePowerTimer() {
        document.getElementById('powerTimer').classList.add('hidden');
    }

    updatePowerTimer() {
        const seconds = (this.frightenedTimer / 1000).toFixed(1);
        const percentage = (this.frightenedTimer / this.frightenedDuration) * 100;

        document.getElementById('powerTimerText').textContent = `⚡ ${seconds}s`;
        document.getElementById('powerTimerFill').style.width = `${Math.max(0, percentage)}%`;
    }

    eatGhost(ghost) {
        this.score += CONFIG.pointsPerGhost * this.level; // More points at higher levels
        this.updateUI();
        this.checkExtraLife();
        ghost.respawn();
    }

    loseLive() {
        this.lives--;
        this.updateUI();

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            // Reset positions
            this.pacman.reset();
            this.ghosts.forEach(ghost => ghost.reset());
            this.frightenedMode = false;
            this.invincible = true;
            this.invincibleTimer = 2000; // 2 second invincibility to prevent race condition
            this.state = 'paused';
            this.showOverlay(`Lives: ${this.lives}`, 'Press SPACE to continue', 0);
        }
    }

    checkCollision(pacman, ghost) {
        const dx = pacman.x - ghost.x;
        const dy = pacman.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 0.6;
    }

    getTile(x, y) {
        const col = Math.floor(x);
        const row = Math.floor(y);
        if (row >= 0 && row < this.map.length && col >= 0 && col < this.map[0].length) {
            return this.map[row][col];
        }
        return 0;
    }

    setTile(x, y, value) {
        const col = Math.floor(x);
        const row = Math.floor(y);
        if (row >= 0 && row < this.map.length && col >= 0 && col < this.map[0].length) {
            this.map[row][col] = value;
        }
    }

    render() {
        const ctx = this.ctx;

        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw map
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                const tile = this.map[row][col];
                const x = col * CONFIG.tileSize;
                const y = row * CONFIG.tileSize;

                if (tile === 0) {
                    // Wall
                    ctx.fillStyle = '#1e90ff';
                    ctx.fillRect(x, y, CONFIG.tileSize, CONFIG.tileSize);
                } else if (tile === 1) {
                    // Pellet
                    ctx.fillStyle = '#ffb8ae';
                    ctx.beginPath();
                    ctx.arc(x + CONFIG.tileSize / 2, y + CONFIG.tileSize / 2, 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (tile === 2) {
                    // Power pellet
                    ctx.fillStyle = '#ffb8ae';
                    ctx.beginPath();
                    ctx.arc(x + CONFIG.tileSize / 2, y + CONFIG.tileSize / 2, 6, 0, Math.PI * 2);
                    ctx.fill();
                } else if (tile === 5) {
                    // Portal
                    const time = Date.now() / 200;
                    const pulse = Math.sin(time) * 0.3 + 0.7;
                    ctx.fillStyle = `rgba(138, 43, 226, ${pulse})`;
                    ctx.beginPath();
                    ctx.arc(x + CONFIG.tileSize / 2, y + CONFIG.tileSize / 2, 8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }
        }

        // Draw ghosts
        this.ghosts.forEach(ghost => ghost.render(ctx, this.frightenedMode));

        // Draw Pacman
        this.pacman.render(ctx);
    }

    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Pacman Class
class Pacman {
    constructor(x, y) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.nextDx = 0;
        this.nextDy = 0;
        this.mouthAngle = 0;
        this.mouthSpeed = 0.3;
    }

    setDirection(dx, dy) {
        this.nextDx = dx;
        this.nextDy = dy;
    }

    update(map, speed) {
        // Try to change direction
        if (this.canMove(map, this.x + this.nextDx * 0.1, this.y + this.nextDy * 0.1)) {
            this.dx = this.nextDx;
            this.dy = this.nextDy;
        }

        // Move
        const newX = this.x + this.dx * speed * 0.05;
        const newY = this.y + this.dy * speed * 0.05;

        if (this.canMove(map, newX, newY)) {
            this.x = newX;
            this.y = newY;
        }

        // Animate mouth
        if (this.dx !== 0 || this.dy !== 0) {
            this.mouthAngle += this.mouthSpeed;
            if (this.mouthAngle > 0.8 || this.mouthAngle < 0) {
                this.mouthSpeed = -this.mouthSpeed;
            }
        }
    }

    canMove(map, x, y) {
        const corners = [
            [x - 0.4, y - 0.4],
            [x + 0.4, y - 0.4],
            [x - 0.4, y + 0.4],
            [x + 0.4, y + 0.4]
        ];

        for (let [cx, cy] of corners) {
            const col = Math.floor(cx);
            const row = Math.floor(cy);
            if (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
                const tile = map[row][col];
                if (tile === 0) return false;
            } else {
                return false;
            }
        }
        return true;
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.dx = 0;
        this.dy = 0;
        this.nextDx = 0;
        this.nextDy = 0;
    }

    render(ctx) {
        const x = this.x * CONFIG.tileSize;
        const y = this.y * CONFIG.tileSize;
        const radius = CONFIG.tileSize / 2 - 2;

        // Get direction angle
        let angle = 0;
        if (this.dx > 0) angle = 0;
        else if (this.dx < 0) angle = Math.PI;
        else if (this.dy < 0) angle = -Math.PI / 2;
        else if (this.dy > 0) angle = Math.PI / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, radius, this.mouthAngle, Math.PI * 2 - this.mouthAngle);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.restore();
    }
}

// Ghost Class
class Ghost {
    constructor(x, y, color, personality) {
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.color = color;
        this.personality = personality;
        this.dx = 0;
        this.dy = 0;
        this.frightened = false;
        this.moveTimer = 0;
    }

    update(map, pacman, speed) {
        this.moveTimer++;

        // Update direction every 10 frames
        if (this.moveTimer >= 10) {
            this.moveTimer = 0;
            this.chooseDirection(map, pacman);
        }

        // Move
        const newX = this.x + this.dx * speed * 0.05;
        const newY = this.y + this.dy * speed * 0.05;

        if (this.canMove(map, newX, newY)) {
            this.x = newX;
            this.y = newY;
        } else {
            // Hit a wall, choose new direction
            this.chooseDirection(map, pacman);
        }
    }

    chooseDirection(map, pacman) {
        if (this.frightened) {
            // Random movement when frightened (run away)
            const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            const validDirs = directions.filter(([dx, dy]) =>
                this.canMove(map, this.x + dx * 0.5, this.y + dy * 0.5)
            );
            if (validDirs.length > 0) {
                const [dx, dy] = validDirs[Math.floor(Math.random() * validDirs.length)];
                this.dx = dx;
                this.dy = dy;
            }
        } else {
            // Different AI based on personality
            let targetX, targetY;

            if (this.personality === 'chase') {
                // Red: Chase Pacman directly
                targetX = pacman.x;
                targetY = pacman.y;
            } else if (this.personality === 'ambush') {
                // Pink: Aim ahead of Pacman
                targetX = pacman.x + pacman.dx * 4;
                targetY = pacman.y + pacman.dy * 4;
            } else if (this.personality === 'patrol') {
                // Cyan: Patrol corners
                targetX = this.x > CONFIG.mapSize / 2 ? CONFIG.mapSize - 2 : 2;
                targetY = this.y > CONFIG.mapSize / 2 ? CONFIG.mapSize - 2 : 2;
            } else {
                // Orange: Random/scatter
                targetX = Math.random() * CONFIG.mapSize;
                targetY = Math.random() * CONFIG.mapSize;
            }

            // Find best direction toward target
            const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            let bestDir = [0, 0];
            let bestDist = Infinity;

            for (let [dx, dy] of directions) {
                if (this.canMove(map, this.x + dx * 0.5, this.y + dy * 0.5)) {
                    const newX = this.x + dx;
                    const newY = this.y + dy;
                    const dist = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestDir = [dx, dy];
                    }
                }
            }

            this.dx = bestDir[0];
            this.dy = bestDir[1];
        }
    }

    canMove(map, x, y) {
        const col = Math.floor(x);
        const row = Math.floor(y);
        if (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
            const tile = map[row][col];
            return tile !== 0;
        }
        return false;
    }

    respawn() {
        // Teleport back to start after being eaten
        this.x = this.startX;
        this.y = this.startY;
        this.frightened = false;
        this.dx = 0;
        this.dy = 0;
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.dx = 0;
        this.dy = 0;
        this.frightened = false;
    }

    render(ctx, frightenedMode) {
        const x = this.x * CONFIG.tileSize;
        const y = this.y * CONFIG.tileSize;
        const size = CONFIG.tileSize / 2 - 2;

        if (frightenedMode && this.frightened) {
            // Frightened ghost (blue/flashing at 2Hz to prevent seizure risk)
            const flash = Math.floor(Date.now() / 500) % 2;
            ctx.fillStyle = flash ? '#2121ff' : '#ffffff';
        } else {
            ctx.fillStyle = this.color;
        }

        // Ghost body
        ctx.beginPath();
        ctx.arc(x, y - size / 2, size, Math.PI, 0, false);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x + size * 0.66, y + size * 0.66);
        ctx.lineTo(x + size * 0.33, y + size);
        ctx.lineTo(x, y + size * 0.66);
        ctx.lineTo(x - size * 0.33, y + size);
        ctx.lineTo(x - size * 0.66, y + size * 0.66);
        ctx.lineTo(x - size, y + size);
        ctx.closePath();
        ctx.fill();

        // Eyes (if not frightened)
        if (!frightenedMode || !this.frightened) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x - size * 0.3, y - size * 0.2, size * 0.25, 0, Math.PI * 2);
            ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.25, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(x - size * 0.3, y - size * 0.2, size * 0.12, 0, Math.PI * 2);
            ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.12, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Initialize game when page loads
let game;
window.addEventListener('load', () => {
    game = new Game();
});
