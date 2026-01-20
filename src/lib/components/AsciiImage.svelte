<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		alt?: string;
		width?: number;
		height?: number;
	}

	let { src, alt = '', width = 120, height = 40 }: Props = $props();
	let asciiArt = $state('');
	let loading = $state(true);
	let error = $state(false);

	const ASCII_CHARS = ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

	function getCharForBrightness(brightness: number): string {
		const index = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
		return ASCII_CHARS[index];
	}

	function rgbToHex(r: number, g: number, b: number): string {
		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
	}

	async function convertToAscii(imageUrl: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) {
					reject(new Error('Could not get canvas context'));
					return;
				}

				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);

				const imageData = ctx.getImageData(0, 0, width, height);
				const pixels = imageData.data;

				let result = '';
				for (let y = 0; y < height; y++) {
					let row = '';
					for (let x = 0; x < width; x++) {
						const idx = (y * width + x) * 4;
						const r = pixels[idx];
						const g = pixels[idx + 1];
						const b = pixels[idx + 2];
						const a = pixels[idx + 3];

						const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
						const char = getCharForBrightness(brightness);

						if (a < 50) {
							row += `<span style="opacity:0.1"> </span>`;
						} else {
							const color = rgbToHex(r, g, b);
							row += `<span style="color:${color}">${char}</span>`;
						}
					}
					result += row + '\n';
				}

				resolve(result);
			};

			img.onerror = () => {
				reject(new Error('Failed to load image'));
			};

			img.src = imageUrl;
		});
	}

	onMount(async () => {
		if (!src) {
			error = true;
			loading = false;
			return;
		}

		try {
			asciiArt = await convertToAscii(src);
			loading = false;
		} catch (err) {
			console.error('ASCII conversion error:', err);
			error = true;
			loading = false;
		}
	});
</script>

<div class="ascii-container" role="img" aria-label={alt}>
	{#if loading}
		<div class="ascii-loading">
			<span class="loading-char">░▒▓</span>
		</div>
	{:else if error}
		<div class="ascii-error">[ ░░░ ]</div>
	{:else}
		<pre class="ascii-art">{@html asciiArt}</pre>
	{/if}
</div>

<style>
	.ascii-container {
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
		overflow: hidden;
		background: linear-gradient(145deg, rgba(5,5,10,0.6) 0%, rgba(15,15,25,0.4) 100%);
		padding: 6px;
		border: 1px solid rgba(255,255,255,0.03);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ascii-art {
		font-size: 4.5px;
		line-height: 0.95;
		letter-spacing: 0;
		margin: 0;
		white-space: pre;
		font-weight: 500;
		text-shadow: 0 0 1px currentColor;
	}

	.ascii-loading {
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-sunrise, #f7b731);
	}

	.loading-char {
		animation: pulse 1.2s ease-in-out infinite;
		font-size: 16px;
		letter-spacing: 3px;
	}

	.ascii-error {
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-oc-text-muted, #888);
		font-size: 11px;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 1; }
	}
</style>
