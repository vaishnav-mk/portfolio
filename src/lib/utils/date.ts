export function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

export function formatUtc(d: Date): string {
	const p = (v: number) => String(v).padStart(2, '0');
	return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`;
}

export function formatDistanceToDate(date: Date): string {
	const diff = date.getTime() - Date.now();
	const abs = Math.abs(diff);

	const MINUTE = 60 * 1000;
	const HOUR = 60 * MINUTE;
	const DAY = 24 * HOUR;
	const MONTH = 30.4375 * DAY;
	const YEAR = 365.25 * DAY;

	const units = [
		{ label: 'year', value: YEAR },
		{ label: 'month', value: MONTH },
		{ label: 'day', value: DAY },
		{ label: 'hour', value: HOUR },
		{ label: 'minute', value: MINUTE }
	];

	const unit = units.find((candidate) => abs >= candidate.value) ?? units.at(-1)!;
	const count = Math.max(1, Math.round(abs / unit.value));
	const phrase = `${count} ${unit.label}${count === 1 ? '' : 's'}`;

	return diff >= 0 ? `in ${phrase}` : `${phrase} ago`;
}
