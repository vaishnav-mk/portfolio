<script lang="ts">
  import HoverTransform from './HoverTransform.svelte';
  
  let { links = [] } = $props<{ links?: any[] }>();
</script>

<div class="relative md:mt-16 md:mb-8">
  <div class="relative z-10 flex flex-row items-center gap-4 sm:gap-6 flex-wrap">
    <HoverTransform 
      primaryText="~/vm:"
      secondaryText="bucket list :D"
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
