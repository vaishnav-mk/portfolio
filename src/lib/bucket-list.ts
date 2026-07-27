export type BucketListItem = {
	id: number;
	label: string;
	info: string;
	checked: boolean;
};

export type BucketListMetadata = {
	startDate: string;
	birthDate: string;
	averageLifeExpectancy: number;
	quote: string;
	location: {
		name: string;
		mapLink: string;
	};
	inspirationLink: string;
};

export type BucketListPendingChange =
	| { type: 'toggle'; id: number; checked: boolean; label: string }
	| { type: 'delete'; id: number; label: string }
	| { type: 'add'; tempId: number; item: BucketListItem; label: string };

export const BUCKET_LIST_KV_KEY = 'bucket-list-items';

export function isBucketListItem(value: unknown): value is BucketListItem {
	if (!value || typeof value !== 'object') return false;
	const item = value as Record<string, unknown>;
	return (
		typeof item.id === 'number' &&
		typeof item.label === 'string' &&
		typeof item.info === 'string' &&
		typeof item.checked === 'boolean'
	);
}

export function isBucketListItems(value: unknown): value is BucketListItem[] {
	return Array.isArray(value) && value.every(isBucketListItem);
}
