export function escapeSvgText(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function truncateText(value: string, maxLength: number) {
	return value.length > maxLength ? `${value.slice(0, Math.max(0, maxLength - 1))}…` : value;
}

export function utf8ToBase64(value: string) {
	const bytes = new TextEncoder().encode(value);
	let binary = '';
	for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
	return btoa(binary);
}
