<script lang="ts">
  let { company, companyLink, position } = $props<{
    company: string;
    companyLink: string;
    position: string;
  }>();
</script>

<p class="text-sunrise font-semibold">
  Currently working as an {position} at 
  <a 
    href={companyLink} 
    class="underline font-bold decoration-wavy underline-offset-4 decoration-2 hover:text-zenith transition-colors duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    {company}
  </a>
</p>

