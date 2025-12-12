<script lang="ts">
  import data from '../../blogs.json';
  import { viewingState } from '../store.svelte';

  const blogs = data.rss.channel.item;
  let isViewingBlogs = $derived(viewingState.value === 'blogs');

  function getCardClasses(index: number) {
    if (index === 0) return 'md:col-span-2 md:row-span-2 rounded-t-lg';
    if (index === blogs.length - 1) return 'md:col-span-2 md:row-span-2 rounded-b-lg';
    return 'col-span-1 row-span-1';
  }

  function getHoverEffect(index: number) {
    if (index === 0) return 'hover:-translate-y-2';
    if (index === blogs.length - 1) return 'hover:translate-y-2';
    return index % 2 === 0 ? 'hover:translate-x-2' : 'hover:-translate-x-2';
  }

  function getFixedImage(blog: any) {
    const match = blog['content:encoded']?.match(/src="([^"]*)"/);
    return match ? match[1] : null;
  }
</script>

<section id="blogs" class="space-y-4 mt-8">
  <h2 class="text-xl font-bold tracking-wide uppercase {isViewingBlogs ? 'text-sunrise' : 'line-through text-zenith'}">
    Blogs
  </h2>

  {#if blogs.length === 0}
    <p>No blogs to display.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      {#each blogs as blog, index}
        {@const image = getFixedImage(blog)}
        <a
          href={blog.link}
          target="_blank"
          class="flex flex-col bg-dusk p-3 md:p-4 text-white transition-all duration-300 {getHoverEffect(index)} {getCardClasses(index)}"
        >
          {#if image}
            <img src={image} alt={blog.title} class="w-full h-32 md:h-40 object-cover mb-2 rounded-lg" />
          {/if}
          <h2 class="text-base md:text-lg font-semibold">{blog.title}</h2>
        </a>
      {/each}
    </div>
  {/if}
</section>
