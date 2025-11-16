<script lang="ts">

  let { 
    primaryText, 
    secondaryText, 
    href,
    class: className = "",
    secondaryClassName = "",
    uppercase = false
  } = $props<{
    primaryText: string;
    secondaryText: string;
    href?: string;
    class?: string;
    secondaryClassName?: string;
    uppercase?: boolean;
  }>();

  let containerElement: HTMLElement | null = $state(null);
  let primaryElement: HTMLElement | null = $state(null);
  let secondaryElement: HTMLElement | null = $state(null);

  $effect(() => {
    if (containerElement && primaryElement && secondaryElement && primaryText && secondaryText) {
      const updateWidth = () => {
        const originalTransform = secondaryElement.style.transform;
        const originalOpacity = secondaryElement.style.opacity;
        const originalVisibility = secondaryElement.style.visibility;
        const originalPosition = secondaryElement.style.position;
        
        secondaryElement.style.transform = 'translateY(0)';
        secondaryElement.style.opacity = '0';
        secondaryElement.style.visibility = 'hidden';
        secondaryElement.style.position = 'static';
        
        const primaryWidth = primaryElement.offsetWidth;
        const secondaryWidth = secondaryElement.offsetWidth;
        const maxWidth = Math.max(primaryWidth, secondaryWidth);
        
        secondaryElement.style.transform = originalTransform;
        secondaryElement.style.opacity = originalOpacity;
        secondaryElement.style.visibility = originalVisibility;
        secondaryElement.style.position = originalPosition;
        
        containerElement.style.width = `${maxWidth}px`;
      };

      updateWidth();
      
      const resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });
      
      resizeObserver.observe(containerElement);
      resizeObserver.observe(primaryElement);
      resizeObserver.observe(secondaryElement);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  });

  const baseClasses = `inline-block overflow-hidden group relative transition-colors duration-300 leading-none cursor-pointer ${className}`;
  const textClasses = uppercase ? "uppercase" : "normal-case";
</script>

{#if href}
  <a 
    bind:this={containerElement}
    href={href}
    class={baseClasses}
  >
    <span 
      bind:this={primaryElement}
      class="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0 whitespace-nowrap leading-none {textClasses}"
    >
      {primaryText}
    </span>
    <span 
      bind:this={secondaryElement}
      class="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap leading-none {textClasses} {secondaryClassName || 'text-dusk opacity-50'}"
    >
      {secondaryText}
    </span>
  </a>
{:else}
  <div bind:this={containerElement} class={baseClasses}>
    <span 
      bind:this={primaryElement}
      class="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0 whitespace-nowrap leading-none {textClasses}"
    >
      {primaryText}
    </span>
    <span 
      bind:this={secondaryElement}
      class="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap leading-none {textClasses} {secondaryClassName || 'text-dusk opacity-50'}"
    >
      {secondaryText}
    </span>
  </div>
{/if}

