<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Experiences from '$lib/components/Experiences.svelte';
  import Blogs from '$lib/components/Blogs.svelte';
  import data from '../data.json';
  import { setViewing } from '$lib/store.svelte';

  const twitterLink = data.socialLinks.find((link: any) => link.label === 'Twitter');
  const twitterHandle = twitterLink?.href?.split('/').pop() || '';

  $effect(() => {
    const sections = document.querySelectorAll('section');
    const sectionVisibility = new Map<string, boolean>();

    // Initialize all sections as not visible
    sections.forEach((section) => {
      sectionVisibility.set(section.id, false);
    });

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          sectionVisibility.set(entry.target.id, entry.isIntersecting);
        });

        // Find the first visible section (in DOM order)
        for (const section of sections) {
          if (sectionVisibility.get(section.id)) {
            setViewing(section.id);
            break;
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -60% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>~vm</title>
</svelte:head>

<div class="rotate-email">
  {#if twitterLink}
    <a href={twitterLink.href} target="_blank" class="email-link hover:text-zenith">
      @{twitterHandle}
    </a>
    <span class="text-zenith opacity-50 email-link">/</span>
  {/if}
  <a href={`mailto:${data.portfolio.email}`} class="email-link">
    <span class="text-zenith opacity-50">reach out to me @</span> {data.portfolio.email}
  </a>
  <span class="email-line"></span>
</div>

<div class="relative flex flex-col w-full mx-auto font-sans text-sm max-w-1440 text-dawn md:flex-row md:py-[88px] p-8 md:pl-48 md:pr-40 shadow-inner shadow-2xl">
  <div class="h-auto w-full md:w-1/3 md:max-w-xs">
    <Header
      name={data.portfolio.name}
      description={data.portfolio.description}
      sections={data.sections.map((s) => s.label)}
      socialLinks={data.socialLinks}
      byline={data.byline}
      currentWork={data.currentWork}
      brand={data.portfolio.brand}
      brandSecondary={data.portfolio.brandSecondary}
      nickname={data.portfolio.nickname}
    />
  </div>

  <div class="relative w-full md:ml-auto md:w-2/5 flex flex-col space-y-12">
    <Experiences experiences={data.experiences} />
    <Projects projects={data.projects} />
    <Blogs />
  </div>

  <div class="fixed top-0 left-0 z-20 w-full h-32 pointer-events-none bg-gradient-to-b from-night to-transparent"></div>
</div>
