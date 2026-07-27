import fallbackData from '../../bucket-list.json';
import {
	BUCKET_LIST_KV_KEY,
	isBucketListItems,
	type BucketListItem,
	type BucketListMetadata
} from '$lib/bucket-list';

export const fallbackMetadata = fallbackData.metadata satisfies BucketListMetadata;
export const fallbackBucketListItems = fallbackData.bucketListItems satisfies BucketListItem[];

export async function readBucketListItems(platform: App.Platform | undefined) {
	const kv = platform?.env.BUCKET_LIST_KV;
	if (!kv) return structuredClone(fallbackBucketListItems);

	try {
		const storedItems = await kv.get<unknown>(BUCKET_LIST_KV_KEY, 'json');
		return isBucketListItems(storedItems) ? storedItems : structuredClone(fallbackBucketListItems);
	} catch (err) {
		console.warn('Failed to read bucket list items from KV', err);
		return structuredClone(fallbackBucketListItems);
	}
}

export async function writeBucketListItems(platform: App.Platform | undefined, items: BucketListItem[]) {
	const kv = platform?.env.BUCKET_LIST_KV;
	if (!kv) {
		throw new Error('BUCKET_LIST_KV binding is not configured');
	}

	await kv.put(BUCKET_LIST_KV_KEY, JSON.stringify(items));
}
