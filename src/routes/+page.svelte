<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import BlogSection from '$lib/components/BlogSection.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import type { Portfolio } from '$lib/types';
	
	import data from '../portfolio.json';

	const portfolioData = data as Portfolio;
	const mediumHref = portfolioData.socialLinks.find((l) => l.id === 'medium')?.href ?? '';
</script>

<Seo
	title={`~/vm: ${portfolioData.portfolio.name}`}
	description={portfolioData.portfolio.description}
	image={`/og.svg?title=${encodeURIComponent(portfolioData.portfolio.name)}&description=${encodeURIComponent(portfolioData.byline)}`}
	imageAlt={`${portfolioData.portfolio.name} portfolio card`}
/>

<Hero data={portfolioData} />
<AboutSection data={portfolioData} />
<ExperienceSection experiences={portfolioData.experiences} />
<ProjectsSection projects={portfolioData.projects} />
<BlogSection {mediumHref} />
