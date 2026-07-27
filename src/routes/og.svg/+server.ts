import data from '../../portfolio.json';
import { escapeSvgText, truncateText } from '$lib/utils/svg';
import type { Portfolio } from '$lib/types';
import type { RequestHandler } from './$types';

const portfolio = data as Portfolio;

export const GET: RequestHandler = async ({ url }) => {
	const title = truncateText(url.searchParams.get('title') || `~/vm: ${portfolio.portfolio.name}`, 42);
	const subtitle = truncateText(url.searchParams.get('description') || portfolio.byline, 78);

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
		<rect width="1200" height="630" fill="#0d0d0d"/>
		<path d="M0 72H1200M0 558H1200M74 0V630M1126 0V630" stroke="#282828" stroke-width="2"/>
		<g opacity="0.16" fill="#ffa69e" font-family="JetBrains Mono, ui-monospace, monospace" font-size="15">
			<text x="28" y="34">01110110 01101101 00101111 01110001 01110010</text>
			<text x="820" y="600">01110111 01101111 01110010 01101011 01100101 01110010</text>
		</g>
		<rect x="104" y="118" width="992" height="394" fill="#141414" stroke="#282828" stroke-width="2"/>
		<text x="144" y="174" fill="#ffa69e" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22" letter-spacing="8">PORTFOLIO</text>
		<text x="144" y="292" fill="#e5e5e5" font-family="JetBrains Mono, ui-monospace, monospace" font-size="68" font-weight="600">${escapeSvgText(title)}</text>
		<text x="144" y="364" fill="#a3a3a3" font-family="JetBrains Mono, ui-monospace, monospace" font-size="30">${escapeSvgText(subtitle)}</text>
		<text x="144" y="460" fill="#858585" font-family="JetBrains Mono, ui-monospace, monospace" font-size="24">${escapeSvgText(url.origin.replace(/^https?:\/\//, ''))}</text>
		<path d="M144 410H1056" stroke="#282828" stroke-width="2"/>
	</svg>`;

	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
