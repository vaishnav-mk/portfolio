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
	let container: HTMLDivElement;

	const ASCII_CHARS = ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

	const HTML_ESCAPE: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

	function escapeHtml(char: string) {
		return HTML_ESCAPE[char] ?? char;
	}

	function getCharForBrightness(brightness: number) {
		const index = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
		return escapeHtml(ASCII_CHARS[index]);
	}

	function rgbToHex(r: number, g: number, b: number) {
		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
	}

	function convertToAscii(imageUrl: string) {
		return new Promise<string>((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.referrerPolicy = 'no-referrer';

			img.onload = () => {
				try {
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

							if (a < 50) {
								row += '<span style="opacity:0.1"> </span>';
							} else {
								const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
								row += `<span style="color:${rgbToHex(r, g, b)}">${getCharForBrightness(brightness)}</span>`;
							}
						}
						result += `${row}\n`;
					}

					resolve(result);
				} catch (err) {
					reject(err instanceof Error ? err : new Error('Failed to convert image'));
				}
			};

			img.onerror = () => reject(new Error('Failed to load image'));
			img.src = imageUrl;
		});
	}

	onMount(() => {
		if (!src) {
			error = true;
			loading = false;
			return;
		}

		let cancelled = false;
		let idleId: number | undefined;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		async function runConversion() {
			try {
				const result = await convertToAscii(src);
				if (!cancelled) asciiArt = result;
			} catch (err) {
				console.error('ASCII conversion error:', err);
				if (!cancelled) error = true;
			} finally {
				if (!cancelled) loading = false;
			}
		}

		function scheduleConversion() {
			if ('requestIdleCallback' in window) {
				idleId = window.requestIdleCallback(() => runConversion(), { timeout: 1500 });
			} else {
				timeoutId = setTimeout(runConversion, 200);
			}
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					observer.disconnect();
					scheduleConversion();
				}
			},
			{ rootMargin: '120px' }
		);

		observer.observe(container);

		return () => {
			cancelled = true;
			observer.disconnect();
			if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
			if (timeoutId !== undefined) clearTimeout(timeoutId);
		};
	});
</script>

<div bind:this={container} class="ascii-container font-mono h-full w-full overflow-hidden flex items-center justify-center" role="img" aria-label={alt || undefined} aria-hidden={!alt || undefined}>
	{#if loading}
		<div class="ascii-loading" aria-label="Loading image">
			<span></span>
			<span></span>
			<span></span>
		</div>
	{:else if error}
		<div class="ascii-error">[image unavailable]</div>
	{:else}
		<pre class="ascii-art">{@html asciiArt}</pre>
	{/if}
</div>

<style>
	.ascii-container {
		contain: layout paint;
		background:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(255, 166, 158, 0.015) 2px,
				rgba(255, 166, 158, 0.015) 4px
			),
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 3px,
				rgba(255, 166, 158, 0.01) 3px,
				rgba(255, 166, 158, 0.01) 6px
			),
			radial-gradient(ellipse at center, var(--color-oc-bg-alt) 0%, var(--color-oc-bg) 100%);
	}

	.ascii-art {
		font-size: 2.8px;
		line-height: 0.95;
		letter-spacing: 0.3px;
		margin: 0;
		white-space: pre;
		font-weight: 500;
		text-shadow: 0 0 1px currentColor;
	}

	.ascii-error {
		color: var(--color-oc-text-muted);
		font-size: 0.75rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.ascii-loading {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.ascii-loading span {
		display: block;
		width: 0.42rem;
		height: 0.42rem;
		border: 1px solid color-mix(in srgb, var(--color-sunrise) 55%, transparent);
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-sunrise) 10%, transparent);
		animation: ascii-bubble 1.35s ease-in-out infinite;
	}

	.ascii-loading span:nth-child(2) {
		animation-delay: 0.16s;
	}

	.ascii-loading span:nth-child(3) {
		animation-delay: 0.32s;
	}

	@keyframes ascii-bubble {
		0%, 80%, 100% {
			opacity: 0.35;
			transform: translateY(0) scale(0.84);
		}

		40% {
			opacity: 0.9;
			transform: translateY(-0.18rem) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ascii-loading span {
			animation: none;
			opacity: 0.55;
			transform: none;
		}
	}
</style>
