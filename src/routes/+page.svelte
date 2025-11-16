<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Experiences from '$lib/components/Experiences.svelte';
  import Blogs from '$lib/components/Blogs.svelte';
  import Analytics from '$lib/components/Analytics.svelte';
  import data from '../data.json';
  import { viewingState, setViewing } from '$lib/store.svelte';

  $effect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setViewing(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>~vm</title>
</svelte:head>

<div class="rotate-email">
  <a href={`mailto:${data.portfolio.email}`} class="email-link">
    <span class="text-zenith opacity-50">reach out to me @</span> {data.portfolio.email}
  </a>
  <span class="email-line"></span>
</div>

<div class="relative flex flex-col w-screen mx-auto font-sans text-base max-w-1440 text-dawn md:flex-row md:py-[88px] p-8 shadow-inner shadow-2xl">
  <div class="max-h-screen h-auto w-full md:w-1/3 md:max-w-xs md:fixed">
    <Header
      name={data.portfolio.name}
      description={data.portfolio.description}
      sections={data.sections.map((s) => s.label)}
      socialLinks={data.socialLinks}
      byline={data.byline}
      currentWork={data.currentWork}
    />
  </div>

  <div class="relative w-full md:ml-auto md:w-2/5 flex flex-col space-y-16">
    <Experiences experiences={data.experiences} />
    <Projects projects={data.projects} />
    <Blogs />
  </div>

  <div class="fixed top-0 left-0 z-20 w-full h-32 pointer-events-none gradient-to-b from-night to-transparent"></div>
</div>

<Analytics />
