<script lang="ts">
	import { asset } from "$app/paths";
	import { onMount } from "svelte";

	onMount(() => {
		// The root layout can't be broken out of, so this achieves the same effect
		const layoutHeaders = document.querySelectorAll("body > div > header");
		for (const layoutHeader of layoutHeaders) {
			layoutHeader.remove();
		}
	});
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

<div class="game-container">
	<div class="header">
		<h1>Raccoon Jump</h1>
		<p>Reach Level 100 to claim your prize!</p>
	</div>

	<div class="stats">
		<div class="stat">Level: <span id="levelDisplay">1</span></div>
		<div class="stat">Height: <span id="heightDisplay">0</span>m</div>
	</div>

	<canvas id="gameCanvas" width="400" height="600"></canvas>

	<div class="controls">
		<kbd>A</kbd> Move Left
		<kbd>D</kbd> Move Right
		<kbd>SPACE</kbd> Jump
	</div>

	<div class="message" id="gameOverMsg">
		<h2>GAME OVER</h2>
		<p>You fell into the void!</p>
		<p>Reached Level: <span id="finalLevel">1</span></p>
		{@html '<button onclick="game.restart()">Try Again</button>'}
	</div>

	<div class="message" id="winMsg">
		<h2>CONGRATULATIONS!</h2>
		<p>You've outraccooned me!</p>
		<div class="flag" id="flagDisplay"></div>
		<p id="flagNote"></p>
		<a
			href="https://docs.google.com/forms/d/e/1FAIpQLSdsEcwp7Az2AvHHUs3XrYFXAWbR9XLCbEtiev9J6dCm3F4VJQ/viewform?usp=header"
			target="_blank"
			rel="noopener noreferrer"
			class="submit-link">Submit your flag here</a
		>
		{@html '<button onclick="game.restart()">Play Again</button>'}
	</div>

	<script src={asset("/scripts/xmasctf.js")}></script>
</div>

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.game-container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		overflow: hidden;
		background: #0a0f0a;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		text-wrap: nowrap;
	}

	.header {
		text-align: center;
		color: #32cd32;
	}

	.header h1 {
		font-size: 2.5rem;
		text-shadow: 0 0 20px rgba(50, 205, 50, 0.5);
		margin-bottom: 5px;
	}

	.header p {
		color: #5a8a5a;
		font-size: 0.9rem;
	}

	.stats {
		display: flex;
		gap: 40px;
		color: white;
		font-size: 1.2rem;
	}

	.stat {
		background: rgba(50, 205, 50, 0.1);
		padding: 10px 25px;
		border-radius: 10px;
		border: 1px solid rgba(50, 205, 50, 0.3);
	}

	.stat span {
		color: #32cd32;
		font-weight: bold;
	}

	#gameCanvas {
		border: 3px solid #32cd32;
		border-radius: 10px;
		box-shadow: 0 0 30px rgba(50, 205, 50, 0.3);
		background: #050805;
	}

	.controls {
		color: #5a8a5a;
		text-align: center;
		font-size: 0.9rem;
	}

	.controls kbd {
		background: #1a2a1a;
		padding: 5px 12px;
		border-radius: 5px;
		border: 1px solid #32cd32;
		color: #32cd32;
		font-family: monospace;
		margin: 0 5px;
	}

	.message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(5, 10, 5, 0.95);
		padding: 40px;
		border-radius: 15px;
		border: 2px solid #32cd32;
		text-align: center;
		color: white;
		display: none;
		z-index: 100;
		min-width: 350px;
	}

	.message h2 {
		color: #32cd32;
		margin-bottom: 15px;
		font-size: 1.8rem;
	}

	.message p {
		margin-bottom: 20px;
		line-height: 1.6;
	}

	.message .flag {
		background: #0a150a;
		padding: 15px;
		border-radius: 8px;
		font-family: monospace;
		color: #32cd32;
		font-size: 1.1rem;
		word-break: break-all;
		border: 1px solid #32cd32;
	}

	.message .flag.corrupted {
		color: #ef4444;
		border-color: #ef4444;
	}

	.message :global(button) {
		background: #32cd32;
		color: #0a0f0a;
		border: none;
		padding: 12px 30px;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s;
		margin-top: 15px;
	}

	.message :global(button):hover {
		background: #45e045;
		transform: scale(1.05);
	}

	#flagNote {
		font-size: 0.8em;
		color: #5a8a5a;
		margin-top: 10px;
	}

	#flagNote.error {
		color: #ef4444;
	}

	.hint {
		color: #3a5a3a;
		font-size: 0.8rem;
		margin-top: 30px;
		font-style: italic;
	}

	.submit-link {
		display: block;
		color: #32cd32;
		margin-top: 15px;
		font-size: 0.95rem;
		text-decoration: none;
		border-bottom: 1px dashed #32cd32;
		padding-bottom: 2px;
		transition: all 0.2s;
	}

	.submit-link:hover {
		color: #45e045;
		border-color: #45e045;
	}
</style>
