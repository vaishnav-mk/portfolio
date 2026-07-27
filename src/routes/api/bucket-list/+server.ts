import { json } from '@sveltejs/kit';
import { isBucketListItems } from '$lib/bucket-list';
import { writeBucketListItems } from '$lib/server/bucket-list';
import { MAX_BUCKET_LIST_ITEMS, MAX_ITEM_LABEL_LENGTH, MAX_ITEM_INFO_LENGTH } from '$lib/constants';
import type { RequestHandler } from './$types';

const MAX_REQUEST_BYTES = 100_000;

function hasValidItemIds(items: { id: number }[]) {
	const ids = new Set<number>();
	for (const item of items) {
		if (!Number.isSafeInteger(item.id) || ids.has(item.id)) return false;
		ids.add(item.id);
	}
	return true;
}

export const POST: RequestHandler = async ({ request, platform }) => {
	const contentType = request.headers.get('content-type') ?? '';
	if (!contentType.includes('application/json')) {
		return json({ error: 'Expected JSON request body' }, { status: 415 });
	}

	const contentLength = Number(request.headers.get('content-length') ?? 0);
	if (contentLength > MAX_REQUEST_BYTES) {
		return json({ error: 'Request body is too large' }, { status: 413 });
	}

	const body = await request.json().catch(() => null);

	if (!body || typeof body !== 'object') {
		return json({ error: 'Invalid request body' }, { status: 400 });
	}

	const { password, bucketListItems } = body as Record<string, unknown>;
	const expectedPassword = platform?.env.BUCKET_LIST_PASSWORD;

	if (!expectedPassword) {
		return json({ error: 'Bucket list password is not configured' }, { status: 501 });
	}

	if (typeof password !== 'string' || password !== expectedPassword) {
		return json({ error: 'Invalid password' }, { status: 403 });
	}

	if (!isBucketListItems(bucketListItems)) {
		return json({ error: 'Invalid bucket list items' }, { status: 400 });
	}

	if (bucketListItems.length > MAX_BUCKET_LIST_ITEMS) {
		return json({ error: `Too many items (max ${MAX_BUCKET_LIST_ITEMS})` }, { status: 400 });
	}

	if (!hasValidItemIds(bucketListItems)) {
		return json({ error: 'Invalid bucket list item IDs' }, { status: 400 });
	}

	for (const item of bucketListItems) {
		if (item.label.length > MAX_ITEM_LABEL_LENGTH || item.info.length > MAX_ITEM_INFO_LENGTH) {
			return json({ error: 'Item label or info exceeds maximum length' }, { status: 400 });
		}
	}

	try {
		await writeBucketListItems(platform, bucketListItems);
		return json({ ok: true });
	} catch (err) {
		console.error('Failed to write bucket list items', err);
		return json({ error: 'Failed to save bucket list items' }, { status: 500 });
	}
};
