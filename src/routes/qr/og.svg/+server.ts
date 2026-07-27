import QRCode from 'qrcode';
import data from '../../../portfolio.json';
import { escapeSvgText, truncateText, utf8ToBase64 } from '$lib/utils/svg';
import type { Portfolio } from '$lib/types';
import type { RequestHandler } from './$types';

const portfolio = data as Portfolio;

export const GET: RequestHandler = async ({ url }) => {
	const target = url.origin;
	const byline = truncateText(portfolio.byline, 70);
	const qr = await QRCode.toString(target, {
		type: 'svg',
		errorCorrectionLevel: 'H',
		margin: 2,
		width: 420,
		color: {
			dark: '#141414',
			light: '#ffd6d1'
		}
	});

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
		<rect width="1200" height="630" fill="#0d0d0d"/>
		<path d="M0 72H1200M0 558H1200M74 0V630M1126 0V630" stroke="#282828" stroke-width="2"/>
		<rect x="102" y="102" width="1020" height="426" fill="#141414" stroke="#282828" stroke-width="2"/>
		<rect x="148" y="136" width="388" height="388" fill="#ffd6d1" stroke="#ffa69e" stroke-width="3"/>
		<image href="data:image/svg+xml;base64,${utf8ToBase64(qr)}" x="164" y="152" width="356" height="356"/>
		<text x="590" y="172" fill="#ffa69e" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22" letter-spacing="8">QR</text>
		<text x="590" y="286" fill="#e5e5e5" font-family="JetBrains Mono, ui-monospace, monospace" font-size="64" font-weight="600">${escapeSvgText(portfolio.portfolio.name)}</text>
		<text x="590" y="350" fill="#a3a3a3" font-family="JetBrains Mono, ui-monospace, monospace" font-size="30">${escapeSvgText(byline)}</text>
		<path d="M590 400H1050" stroke="#282828" stroke-width="2"/>
		<text x="590" y="452" fill="#858585" font-family="JetBrains Mono, ui-monospace, monospace" font-size="26">${escapeSvgText(target.replace(/^https?:\/\//, ''))}</text>
	</svg>`;

	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
