// Game Configuration
const CONFIG = {
    tileSize: 20,
    fps: 60,
    pacmanSpeed: 2,
    ghostSpeed: 1.8,
    frightenedGhostSpeed: 1,
    frightenedDuration: 10000, // 10 seconds
    pointsPerPellet: 10,
    pointsPerPowerPellet: 50,
    pointsPerGhost: 200,
    levelSpeedIncrease: 0.2,
    maxLives: 3
};

// Game Map (0=wall, 1=pellet, 2=power pellet, 3=empty, 4=ghost house)
const MAP = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,4,4,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [3,3,3,3,3,3,1,3,3,3,0,4,4,4,4,4,4,0,3,3,3,1,3,3,3,3,3,3],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,2,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// Game State
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = 'start'; // start, playing, paused, gameover
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('pacnate-highscore')) || 0;
        this.level = 1;
        this.lives = CONFIG.maxLives;
        this.soundEnabled = true;

        this.map = this.createMap();
        this.pacman = null;
        this.ghosts = [];
        this.pelletsRemaining = 0;
        this.frightenedMode = false;
        this.frightenedTimer = 0;

        this.keys = {};
        this.lastTime = 0;

        this.init();
    }

    init() {
        this.initializeGame();
        this.setupEventListeners();
        this.updateUI();
        this.gameLoop(0);
    }

    createMap() {
        return MAP.map(row => [...row]);
    }

    initializeGame() {
        this.map = this.createMap();
        this.pelletsRemaining = this.countPellets();
        this.pacman = new Pacman(13.5, 19);
        this.ghosts = [
            new Ghost(11.5, 13, 'red', 'chase'),
            new Ghost(13.5, 13, 'pink', 'ambush'),
            new Ghost(15.5, 13, 'cyan', 'patrol'),
            new Ghost(13.5, 15, 'orange', 'random')
        ];
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
                } else if (this.state === 'gameover') {
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
        this.initializeGame();
        this.state = 'playing';
        this.hideOverlay();
        this.updateUI();
    }

    gameOver() {
        this.state = 'gameover';
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('pacnate-highscore', this.highScore);
            this.showOverlay('Game Over!', `New High Score: ${this.highScore}! Press SPACE to restart`);
        } else {
            this.showOverlay('Game Over!', `Score: ${this.score}. Press SPACE to restart`);
        }
        this.updateUI();
    }

    nextLevel() {
        this.level++;
        this.initializeGame();
        this.showOverlay(`Level ${this.level}!`, 'Get ready...', 2000);
        setTimeout(() => {
            if (this.state !== 'gameover') {
                this.hideOverlay();
            }
        }, 2000);
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
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = '❤️'.repeat(Math.max(0, this.lives));
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
            }
        }

        // Update Pacman
        const speed = CONFIG.pacmanSpeed + (this.level - 1) * CONFIG.levelSpeedIncrease;
        this.pacman.update(this.map, speed);

        // Check pellet collision
        const tile = this.getTile(this.pacman.x, this.pacman.y);
        if (tile === 1) {
            this.setTile(this.pacman.x, this.pacman.y, 3);
            this.score += CONFIG.pointsPerPellet;
            this.pelletsRemaining--;
            this.updateUI();
        } else if (tile === 2) {
            this.setTile(this.pacman.x, this.pacman.y, 3);
            this.score += CONFIG.pointsPerPowerPellet;
            this.pelletsRemaining--;
            this.activatePowerMode();
            this.updateUI();
        }

        // Update Ghosts
        const ghostSpeed = this.frightenedMode ? CONFIG.frightenedGhostSpeed :
                          CONFIG.ghostSpeed + (this.level - 1) * CONFIG.levelSpeedIncrease * 0.5;
        this.ghosts.forEach(ghost => {
            ghost.update(this.map, this.pacman, ghostSpeed);

            // Check ghost collision
            if (this.checkCollision(this.pacman, ghost)) {
                if (this.frightenedMode) {
                    this.eatGhost(ghost);
                } else {
                    this.loseLive();
                }
            }
        });

        // Check level complete
        if (this.pelletsRemaining === 0) {
            this.nextLevel();
        }
    }

    activatePowerMode() {
        this.frightenedMode = true;
        this.frightenedTimer = CONFIG.frightenedDuration;
        this.ghosts.forEach(ghost => ghost.frightened = true);
    }

    eatGhost(ghost) {
        this.score += CONFIG.pointsPerGhost;
        this.updateUI();
        ghost.reset();
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
            this.showOverlay(`Lives: ${this.lives}`, 'Get ready...', 2000);
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
                    ctx.arc(x + CONFIG.tileSize / 2, y + CONFIG.tileSize / 2, 5, 0, Math.PI * 2);
                    ctx.fill();
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
        this.mouthOpen = true;
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

        // Wrap around
        if (this.x < 0) this.x = map[0].length - 0.5;
        if (this.x >= map[0].length) this.x = 0.5;

        // Animate mouth
        this.mouthAngle += this.mouthSpeed;
        if (this.mouthAngle > 0.8 || this.mouthAngle < 0) {
            this.mouthSpeed = -this.mouthSpeed;
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
                if (map[row][col] === 0) return false;
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

        // Wrap around
        if (this.x < 0) this.x = map[0].length - 0.5;
        if (this.x >= map[0].length) this.x = 0.5;
    }

    chooseDirection(map, pacman) {
        if (this.frightened) {
            // Random movement when frightened
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
                targetX = this.x > 14 ? 26 : 1;
                targetY = this.y > 14 ? 25 : 1;
            } else {
                // Orange: Random/scatter
                targetX = Math.random() * map[0].length;
                targetY = Math.random() * map.length;
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
            // Frightened ghost (blue)
            ctx.fillStyle = '#2121ff';
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

        // Eyes
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x - size * 0.3, y - size * 0.2, size * 0.25, 0, Math.PI * 2);
        ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.25, 0, Math.PI * 2);
        ctx.fill();

        if (!frightenedMode || !this.frightened) {
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
