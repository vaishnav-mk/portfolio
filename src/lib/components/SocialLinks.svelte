<script lang="ts">
  import HoverTransform from './HoverTransform.svelte';

  let { links = [], brand = '~/vm:', brandSecondary = 'bucket list :D' } = $props<{
    links?: any[];
    brand?: string;
    brandSecondary?: string;
  }>();
</script>

<div class="relative md:mt-6 md:mb-4">
  <div class="relative z-10 flex flex-row items-center gap-3 sm:gap-4 flex-wrap text-sm">
    <HoverTransform
      primaryText={brand}
      secondaryText={brandSecondary}
      href="/bl"
      class="text-sunrise font-bold"
      secondaryClassName="text-white"
    />
    {#each links as link}
      {#if link.label === 'Twitter'}
        <a
          href={link.href}
          class="lowercase text-zenith hover:text-sunrise transition-colors duration-300 text-center"
          target="_blank"
        >
          @{link.href.split('/').pop()}
        </a>
      {:else if link.label === 'resume'}
        <a
          href={link.href}
          class="lowercase text-zenith hover:text-sunrise transition-colors duration-300 text-center underline decoration-wavy decoration-sunrise underline-offset-4"
          target="_blank"
        >
          {link.label}
        </a>
      {:else}
        <a
          href={link.href}
          class="lowercase text-zenith hover:text-sunrise transition-colors duration-300 text-center"
          target="_blank"
        >
          {link.label}
        </a>
      {/if}
    {/each}
  </div>
</div>
