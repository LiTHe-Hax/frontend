const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CONFIG = {
	PLAYER_WIDTH: 40,
	PLAYER_HEIGHT: 40,
	PLATFORM_WIDTH: 80,
	PLATFORM_HEIGHT: 15,
	GRAVITY: 0.5,
	JUMP_FORCE: -15,
	MOVE_SPEED: 3,
	BASE_PLATFORM_GAP: 60,
	GAP_INCREASE_PER_LEVEL: 12,
	WIN_LEVEL: 100,
};

const ENCRYPTED_FLAG = [
	72, 1, 88, 59, 109, 101, 114, 114, 121, 95, 114, 97, 99, 99, 47, 111, 87, 109, 97, 115, 125,
];
const FLAG_KEY_SEED = 0x4c695448;

class Player {
	constructor() {
		this.width = CONFIG.PLAYER_WIDTH;
		this.height = CONFIG.PLAYER_HEIGHT;
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - 100;
		this.velocityX = 0;
		this.velocityY = 0;
		this.onGround = false;
	}

	update() {
		this.velocityY += CONFIG.GRAVITY;
		this.x += this.velocityX;
		this.y += this.velocityY;

		if (this.x < -this.width) this.x = canvas.width;
		if (this.x > canvas.width) this.x = -this.width;

		this.velocityX *= 0.9;
	}

	jump() {
		if (this.onGround) {
			this.velocityY = CONFIG.JUMP_FORCE;
			this.onGround = false;
		}
	}

	draw() {
		const x = this.x;
		const y = this.y;

		ctx.save();

		const tailX = x + 35;
		const tailY = y + 30;
		ctx.fillStyle = "#6b7280";
		ctx.beginPath();
		ctx.ellipse(tailX + 8, tailY, 10, 6, 0.3, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#1f2937";
		ctx.fillRect(tailX + 2, tailY - 5, 4, 10);
		ctx.fillRect(tailX + 10, tailY - 4, 4, 8);

		ctx.fillStyle = "#6b7280";
		ctx.beginPath();
		ctx.ellipse(x + 20, y + 28, 14, 12, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "#9ca3af";
		ctx.beginPath();
		ctx.ellipse(x + 20, y + 32, 8, 6, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "#6b7280";
		ctx.beginPath();
		ctx.ellipse(x + 20, y + 12, 12, 10, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "#4b5563";
		ctx.beginPath();
		ctx.moveTo(x + 8, y + 10);
		ctx.lineTo(x + 5, y - 2);
		ctx.lineTo(x + 14, y + 5);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(x + 32, y + 10);
		ctx.lineTo(x + 35, y - 2);
		ctx.lineTo(x + 26, y + 5);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "#d1d5db";
		ctx.beginPath();
		ctx.moveTo(x + 10, y + 8);
		ctx.lineTo(x + 9, y + 2);
		ctx.lineTo(x + 14, y + 6);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(x + 30, y + 8);
		ctx.lineTo(x + 31, y + 2);
		ctx.lineTo(x + 26, y + 6);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "#1f2937";
		ctx.beginPath();
		ctx.ellipse(x + 12, y + 12, 6, 5, -0.2, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(x + 28, y + 12, 6, 5, 0.2, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(x + 12, y + 12, 4, 0, Math.PI * 2);
		ctx.arc(x + 28, y + 12, 4, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "#1f2937";
		ctx.beginPath();
		ctx.arc(x + 13, y + 12, 2, 0, Math.PI * 2);
		ctx.arc(x + 29, y + 12, 2, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "#1f2937";
		ctx.beginPath();
		ctx.ellipse(x + 20, y + 18, 3, 2, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.strokeStyle = "#4b5563";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x + 5, y + 16);
		ctx.lineTo(x + 12, y + 18);
		ctx.moveTo(x + 5, y + 19);
		ctx.lineTo(x + 12, y + 19);
		ctx.moveTo(x + 28, y + 18);
		ctx.lineTo(x + 35, y + 16);
		ctx.moveTo(x + 28, y + 19);
		ctx.lineTo(x + 35, y + 19);
		ctx.stroke();

		ctx.restore();
	}
}

class Platform {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.width = CONFIG.PLATFORM_WIDTH;
		this.height = CONFIG.PLATFORM_HEIGHT;
		this.id = id;
		this.visited = false;
	}

	draw() {
		ctx.fillStyle = this.visited ? "#22c55e" : "#4ade80";
		ctx.beginPath();
		ctx.roundRect(this.x, this.y, this.width, this.height, 5);
		ctx.fill();

		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.beginPath();
		ctx.roundRect(this.x + 5, this.y + 2, this.width - 10, 4, 2);
		ctx.fill();
	}
}

class JourneyProof {
	constructor() {
		this.platformsVisited = 0;
	}

	recordPlatformVisit() {
		this.platformsVisited++;
	}

	decryptFlag() {
		const requiredVisits = 95;

		if (this.platformsVisited < requiredVisits) {
			return {
				success: false,
				flag: this.generateCorruptedFlag(),
				visits: this.platformsVisited,
				required: requiredVisits,
			};
		}

		let key = [];
		let keyState = FLAG_KEY_SEED;
		for (let i = 0; i < ENCRYPTED_FLAG.length; i++) {
			keyState = ((keyState * 1103515245 + 12345) >>> 0) & 0x7fffffff;
			key.push(keyState % 256);
		}

		let decrypted = "";
		for (let i = 0; i < ENCRYPTED_FLAG.length; i++) {
			decrypted += String.fromCharCode(ENCRYPTED_FLAG[i] ^ key[i] % 128);
		}

		return { success: true, flag: decrypted };
	}

	generateCorruptedFlag() {
		const chars = "CORRUPTED_DATA_!@#$%";
		let result = "LiTHe{";
		let state = this.platformsVisited * 31337;
		for (let i = 0; i < 20; i++) {
			state = (state * 1103515245 + 12345) >>> 0;
			result += chars[state % chars.length];
		}
		return result + "}";
	}

	reset() {
		this.platformsVisited = 0;
	}
}

class Game {
	constructor() {
		this.player = new Player();
		this.platforms = [];
		this.journeyProof = new JourneyProof();
		this.level = 1;
		this.height = 0;
		this.cameraY = 0;
		this.gameOver = false;
		this.won = false;
		this.keys = { left: false, right: false };
		this.platformIdCounter = 0;

		this.initPlatforms();
		this.setupControls();
		this.gameLoop();
	}

	getPlatformGap() {
		return CONFIG.BASE_PLATFORM_GAP + this.level * CONFIG.GAP_INCREASE_PER_LEVEL;
	}

	initPlatforms() {
		const startPlatform = new Platform(
			canvas.width / 2 - CONFIG.PLATFORM_WIDTH / 2,
			canvas.height - 50,
			this.platformIdCounter++,
		);
		this.platforms.push(startPlatform);

		for (let i = 1; i < 10; i++) {
			this.generatePlatform(canvas.height - 50 - i * this.getPlatformGap());
		}
	}

	generatePlatform(y) {
		const x = Math.random() * (canvas.width - CONFIG.PLATFORM_WIDTH);
		const platform = new Platform(x, y, this.platformIdCounter++);
		this.platforms.push(platform);
	}

	setupControls() {
		document.addEventListener("keydown", (e) => {
			if (e.key === "a" || e.key === "A") this.keys.left = true;
			if (e.key === "d" || e.key === "D") this.keys.right = true;
			if (e.key === " ") {
				e.preventDefault();
				this.player.jump();
			}
		});

		document.addEventListener("keyup", (e) => {
			if (e.key === "a" || e.key === "A") this.keys.left = false;
			if (e.key === "d" || e.key === "D") this.keys.right = false;
		});
	}

	checkCollisions() {
		this.player.onGround = false;

		for (const platform of this.platforms) {
			const adjustedPlatformY = platform.y - this.cameraY;

			if (
				this.player.velocityY > 0 &&
				this.player.x < platform.x + platform.width &&
				this.player.x + this.player.width > platform.x &&
				this.player.y + this.player.height >= adjustedPlatformY &&
				this.player.y + this.player.height <= adjustedPlatformY + platform.height + 10
			) {
				this.player.y = adjustedPlatformY - this.player.height;
				this.player.velocityY = 0;
				this.player.onGround = true;

				if (!platform.visited) {
					platform.visited = true;
					this.journeyProof.recordPlatformVisit();
				}
			}
		}
	}

	validateLevel(newLevel) {
		if (typeof newLevel !== "number" || newLevel < 1) {
			return this.level;
		}
		return Math.floor(newLevel);
	}

	checkWin() {
		if (this.level >= CONFIG.WIN_LEVEL && !this.won) {
			this.won = true;
			this.showWinMessage();
		}
	}

	showWinMessage() {
		const result = this.journeyProof.decryptFlag();
		const flagDisplay = document.getElementById("flagDisplay");
		const flagNote = document.getElementById("flagNote");

		flagDisplay.textContent = result.flag;

		if (result.success) {
			flagDisplay.className = "flag";
			flagNote.textContent = "";
		} else {
			flagDisplay.className = "flag corrupted";
			flagNote.textContent = `Flag corrupted! Journey incomplete (${result.visits}/${result.required} platforms visited)`;
			flagNote.className = "error";
		}

		document.getElementById("winMsg").style.display = "block";
	}

	showGameOver() {
		document.getElementById("finalLevel").textContent = this.level;
		document.getElementById("gameOverMsg").style.display = "block";
	}

	update() {
		if (this.gameOver || this.won) return;

		if (this.keys.left) this.player.velocityX = -CONFIG.MOVE_SPEED;
		if (this.keys.right) this.player.velocityX = CONFIG.MOVE_SPEED;

		this.player.update();
		this.checkCollisions();

		if (this.player.y < canvas.height / 3) {
			const diff = canvas.height / 3 - this.player.y;
			this.player.y = canvas.height / 3;
			this.cameraY -= diff;
			this.height = Math.max(this.height, Math.floor(-this.cameraY / 10));

			const newLevel = Math.floor(this.height / 50) + 1;
			this.level = this.validateLevel(newLevel);

			this.checkWin();
		}

		while (
			this.platforms.length > 0 &&
			this.platforms[this.platforms.length - 1].y - this.cameraY > -50
		) {
			const lastPlatform = this.platforms[this.platforms.length - 1];
			const gap = this.getPlatformGap();
			this.generatePlatform(lastPlatform.y - gap);
		}

		this.platforms = this.platforms.filter((p) => p.y - this.cameraY < canvas.height + 50);

		if (this.player.y > canvas.height) {
			this.gameOver = true;
			this.showGameOver();
		}

		document.getElementById("levelDisplay").textContent = this.level;
		document.getElementById("heightDisplay").textContent = this.height;
	}

	draw() {
		ctx.fillStyle = "#0a0a15";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "rgba(50, 205, 50, 0.2)";
		for (let i = 0; i < 50; i++) {
			const x = (i * 73 + this.cameraY * 0.1) % canvas.width;
			const y = (i * 91) % canvas.height;
			ctx.beginPath();
			ctx.arc(x, y, 1, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.save();
		ctx.translate(0, -this.cameraY);
		for (const platform of this.platforms) {
			platform.draw();
		}
		ctx.restore();

		this.player.draw();

		ctx.fillStyle = "rgba(233, 69, 96, 0.2)";
		ctx.font = "bold 80px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.level, canvas.width / 2, canvas.height / 2);
	}

	restart() {
		document.getElementById("gameOverMsg").style.display = "none";
		document.getElementById("winMsg").style.display = "none";

		this.player = new Player();
		this.platforms = [];
		this.journeyProof.reset();
		this.level = 1;
		this.height = 0;
		this.cameraY = 0;
		this.gameOver = false;
		this.won = false;
		this.platformIdCounter = 0;

		this.initPlatforms();
	}

	gameLoop() {
		this.update();
		this.draw();
		requestAnimationFrame(() => this.gameLoop());
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Game();
