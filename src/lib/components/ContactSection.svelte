<script lang="ts">
	interface Props {
		email: string;
	}
	
	let { email }: Props = $props();
</script>

<section id="contact" class="border-t border-[#333333] bg-[#1a1a1a]">
	<div class="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
		<!-- Section Header -->
		<div class="mb-10">
			<h2 class="text-2xl md:text-3xl text-[#e5e5e5] mb-3">Get in touch</h2>
			<p class="text-sm text-[#8e8b8b] max-w-lg">
				Have a project in mind or want to discuss opportunities? I'd love to hear from you.
			</p>
		</div>
		
		<!-- Contact Form -->
		<div class="max-w-lg border border-[#333333] bg-[#242424]">
			<form class="p-6 space-y-4" onsubmit={(e) => { e.preventDefault(); }}>
				<div>
					<label for="email-input" class="block text-xs text-[#8e8b8b] mb-2 uppercase tracking-wider">
						Your Email
					</label>
					<input
						type="email"
						id="email-input"
						required
						placeholder="you@example.com"
						class="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333333] text-sm text-[#e5e5e5] placeholder-[#656363] focus:outline-none focus:border-[#656363]"
					/>
				</div>
				
				<div>
					<label for="message" class="block text-xs text-[#8e8b8b] mb-2 uppercase tracking-wider">
						Message
					</label>
					<textarea
						id="message"
						required
						rows="4"
						placeholder="Tell me about your project..."
						class="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333333] text-sm text-[#e5e5e5] placeholder-[#656363] focus:outline-none focus:border-[#656363] resize-none"
					></textarea>
				</div>
				
				<a
					href="mailto:{email}"
					class="inline-flex items-center justify-center w-full px-4 py-2.5 border border-[#333333] bg-[#1a1a1a] text-sm text-[#e5e5e5] hover:bg-[#333333] hover:border-[#444444] transition-colors"
				>
					Send via Email Client
				</a>
			</form>
		</div>
		
		<!-- Direct Email -->
		<div class="mt-8">
			<p class="text-xs text-[#656363] mb-2">Or email directly:</p>
			<a 
				href="mailto:{email}"
				class="text-sm text-[#8e8b8b] hover:text-[#e5e5e5] transition-colors"
			>
				{email}
			</a>
		</div>
	</div>
</section>
