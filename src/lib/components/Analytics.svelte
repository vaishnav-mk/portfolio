<script lang="ts">
  import { inject } from '@vercel/analytics';

  $effect(() => {
    inject();
  });
</script>
