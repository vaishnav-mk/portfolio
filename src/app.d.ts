/// <reference types="@cloudflare/workers-types" />

declare global {
	namespace App {
		interface Error {}
		interface Locals {}
		interface PageData {}
		interface Platform {
			env: {
				BUCKET_LIST_KV?: KVNamespace;
				BUCKET_LIST_PASSWORD?: string;
			};
			context: ExecutionContext;
			caches: CacheStorage & { default: Cache };
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
