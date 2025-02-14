<script>
  import data from "../blogs.json";
  import { viewing } from "../store.js";

  let blogs = data.rss.channel.item;

  function getCardClasses(index) {
    let classes = "col-span-1 row-span-1";

    if (index === 0) {
      classes = "md:col-span-2 md:row-span-2 rounded-t-lg";
    } else if (index === blogs.length - 1) {
      classes = "md:col-span-2 md:row-span-2 rounded-b-lg";
    }

    return classes;
  }

  function getHoverEffect(index) {
    if (index === 0) {
      return "hover:-translate-y-2";
    } else if (index === blogs.length - 1) {
      return "hover:translate-y-2";
    } else if (index % 2 === 0) {
      return "hover:translate-x-2";
    } else {
      return "hover:-translate-x-2";
    }
  }

  function getFixedImage(blog) {
    const imageUrl = blog["content:encoded"].match(/src="([^"]*)"/)[1];
    return imageUrl;
  }

  let currentlyViewing = viewing;

  viewing.subscribe((value) => {
    currentlyViewing = value;
  });
</script>

<section id="blogs" class="space-y-4 mt-8">
  <h2
    id="blogs-heading"
    class={`text-xl font-bold tracking-wide uppercase ${currentlyViewing === "blogs" ? "text-sunrise" : "line-through text-zenith"}`}
  >
    Blogs
  </h2>

  {#if blogs.length === 0}
    <p>No blogs to display.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      {#each blogs as blog, index}
        <a
          href={blog.link}
          target="_blank"
          class={`flex flex-col bg-dusk p-4 text-white transition-all duration-300 ${getHoverEffect(index)} ${getCardClasses(index)}`}
        >
          <img
            src={getFixedImage(blog)}
            alt={blog.title}
            class="w-full h-40 object-cover mb-2 rounded-lg"
          />
          <h2 class="text-lg font-semibold">{blog.title}</h2>
        </a>
      {/each}
    </div>
  {/if}
</section>
