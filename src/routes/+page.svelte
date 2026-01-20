<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	import data from '$lib/../data.json';
</script>

<div class="min-h-screen bg-[#1a1a1a]">
	<Navigation />
	
	<main>
		<Hero {data} />
		
		<AboutSection {data} />
		
		<ExperienceSection experiences={data.experiences} />
		
		<ProjectsSection projects={data.projects} />
		
		<ContactSection email={data.portfolio.email} />
	</main>
	
	<Footer socialLinks={data.socialLinks} email={data.portfolio.email} />
</div>
