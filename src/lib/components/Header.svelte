<script lang="ts">
  import SocialLinks from './SocialLinks.svelte';
  import CompanyLink from './CompanyLink.svelte';
  import HoverTransform from './HoverTransform.svelte';
  import { viewingState } from '../store.svelte';

  let { name, description, sections, socialLinks, byline, currentWork } = $props<{
    name: string;
    description: string;
    sections: string[];
    socialLinks: any[];
    byline: string;
    currentWork: any;
  }>();

  const navItems = sections.map((section: string, index: number) => ({
    key: section.toLowerCase(),
    index: index + 1,
    label: section.charAt(0).toUpperCase() + section.slice(1),
  }));

  let currentViewing = $derived(viewingState.value);
  
  function isActive(key: string): boolean {
    return currentViewing === key;
  }
</script>

<div class="flex flex-col justify-between w-full max-w-xs md:w-1/3 md:max-w-full md:fixed mb-12">
  <div class="flex flex-col space-y-2 mb-8 md:mb-12">
    <p class="leading-relaxed text-sunrise">Hi, my name is</p>
    <div class="hover-container">
      <h1 class="text-3xl font-bold leading-tight lg:text-6xl text-zenith">
        <span class="sr-only">{name}</span>
        <span aria-hidden="true">
          <HoverTransform 
            primaryText={name}
            secondaryText="wishee"
            class="text-white py-2 cursor-default"
            secondaryClassName="text-white"
          />
        </span>
      </h1>
    </div>

    <h1 class="font-bold leading-tight lg:text-3xl text-zenith opacity-50">{byline}</h1>
    <p class="leading-relaxed opacity-50">{description}</p>
    <CompanyLink 
      company={currentWork.company}
      companyLink={currentWork.companyLink}
      position={currentWork.position}
    />
  </div>

  <nav class="hidden md:mt- md:block md:mb-16">
    <ul class="flex flex-col space-y-8" id="nav">
      {#each navItems as item}
        {@const active = isActive(item.key)}
        <li>
          <a
            class="flex items-center space-x-4 hover:text-[#F4F4F4] transition duration-300 font-bold group"
            class:text-zenith={active}
            class:text-[#A5A5A7]={!active}
            href={`#${item.key}`}
          >
            <span class="text-xs text-sunrise">.0{item.index}</span>
            <span 
              class="block h-px bg-zenith transition-all duration-300 group-hover:w-24"
              class:w-24={active}
              class:w-12={!active}
            ></span>
            <span class="text-sm uppercase">{item.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <SocialLinks links={socialLinks} />
</div>
