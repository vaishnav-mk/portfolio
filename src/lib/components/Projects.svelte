<script lang="ts">
  import ProjectCard from './ProjectCard.svelte';
  import { viewingState } from '../store.svelte';

  let { projects } = $props<{ projects: any[] }>();

  let heading = $state<HTMLElement | null>(null);
  let isViewingProjects = $derived(viewingState.value === 'projects');

  $effect(() => {
    heading = document.getElementById('projects-heading');
  });

  $effect(() => {
    if (!heading) return;
    if (isViewingProjects) {
      heading.classList.remove('text-zenith', 'line-through');
      heading.classList.add('text-sunrise');
    } else {
      heading.classList.add('text-zenith', 'line-through');
      heading.classList.remove('text-sunrise');
    }
  });
</script>

<section id="projects" class="space-y-4">
  <h2
    id="projects-heading"
    class="text-xl font-bold tracking-wide uppercase {isViewingProjects ? 'text-sunrise' : 'text-zenith line-through'}"
  >
    Projects
  </h2>
  <div class="flex flex-wrap md:flex-nowrap">
    <div class="w-full md:w-1/2">
      {#each projects.filter((_: any, i: number) => i % 2 === 0) as project, index}
        <ProjectCard {project} index={index * 2} totalProjects={projects.length} layout="left" />
      {/each}
    </div>
    <div class="w-full md:w-1/2 md:ml-2 md:mt-8">
      {#each projects.filter((_: any, i: number) => i % 2 !== 0) as project, index}
        <ProjectCard {project} index={index * 2 + 1} totalProjects={projects.length} layout="right" />
      {/each}
    </div>
  </div>
</section>
