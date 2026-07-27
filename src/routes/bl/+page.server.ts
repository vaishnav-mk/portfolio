import { fallbackMetadata, readBucketListItems } from '$lib/server/bucket-list';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ platform }) => {
	return {
		metadata: fallbackMetadata,
		bucketListItems: await readBucketListItems(platform)
	};
};
