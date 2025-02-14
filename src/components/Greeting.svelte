<script>
  import { onMount, onDestroy } from "svelte";
  import { M } from "svelte-motion";

  const finished = `
  ><<        ><<     ><<       ><< <<       ><<     ><<     ><<<<<<<<     ><<<<<<<<
  ><<        ><<     ><<     ><<    ><<     ><<     ><<     ><<           ><<      
  ><<   ><   ><<     ><<      ><<           ><<     ><<     ><<           ><<      
  ><<  ><<   ><<     ><<        ><<         ><<<<<< ><<     ><<<<<<       ><<<<<<  
  ><< >< ><< ><<     ><<           ><<      ><<     ><<     ><<           ><<      
  >< ><    ><<<<     ><<     ><<    ><<     ><<     ><<     ><<           ><<      
  ><<        ><<     ><<       ><< <<       ><<     ><<     ><<<<<<<<     ><<<<<<<<
`;

  const initial = finished.replace(/  /g, ">>").replace(/ /g, "<");
  let name = initial;
  let done = false;
  let interval;

  onMount(() => {
    if (name === finished) return;

    interval = setInterval(() => {
      const indexes = [...finished].reduce((acc, char, i) => {
        if (char === " " && name[i] !== " " && name[i] !== "\n") acc.push(i);
        return acc;
      }, []);

      const index = indexes[Math.floor(Math.random() * indexes.length)];

      name = name
        .split("")
        .map((char, i) => (i === index ? " " : char))
        .join("");

      if (indexes.length === 1 && !done) {
        done = true;
        clearInterval(interval);
      }
    }, 1);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div
  class="font-mono whitespace-pre-wrap text-center font-bold text-[5px] md:text-lg w-full h-full justify-center items-center flex text-sunrise tracking-widest"
>
  {name}
</div>
