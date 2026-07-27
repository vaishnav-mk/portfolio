# Portfolio

SvelteKit 2 + Svelte 5 portfolio built with Tailwind CSS 4 and deployed on Cloudflare Pages/Workers.

## Commands

| Command | Action |
| --- | --- |
| `pnpm dev` | Start local development server |
| `pnpm check` | Run Svelte/TypeScript checks |
| `pnpm build` | Build for Cloudflare |
| `pnpm preview` | Preview with Vite |
| `pnpm preview:cf` | Build and preview with Wrangler Pages |
| `pnpm deploy` | Build and deploy to Cloudflare Pages |

## Stack

- SvelteKit 2 / Svelte 5 runes
- Tailwind CSS 4 via `@tailwindcss/vite`
- Cloudflare adapter with Wrangler config

## Cloudflare Setup

The bucket-list page reads and writes through the `BUCKET_LIST_KV` binding.

1. Create a KV namespace: `wrangler kv namespace create BUCKET_LIST_KV`.
2. Replace `REPLACE_WITH_BUCKET_LIST_KV_ID` in `wrangler.jsonc` with the namespace ID.
3. Set the write password secret: `wrangler pages secret put BUCKET_LIST_PASSWORD`.
4. For local Wrangler preview, copy `.dev.vars.example` to `.dev.vars` and set a local password.

If the KV binding is unavailable, `/bl` falls back to `src/bucket-list.json` for reads. Writes require KV and `BUCKET_LIST_PASSWORD`.
