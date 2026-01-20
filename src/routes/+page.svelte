<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import Blogs from '$lib/components/Blogs.svelte';
	
	import data from '../data.json';
</script>

<svelte:head>
	<title>~/vm: {data.portfolio.name}</title>
	<meta name="description" content={data.portfolio.description} />
</svelte:head>

<Hero {data} />
<AboutSection {data} />
<ExperienceSection experiences={data.experiences} />
<ProjectsSection projects={data.projects} />
<Blogs />
