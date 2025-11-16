<script lang="ts">
  const finished = `
  ><<        ><<     ><<       ><< <<       ><<     ><<     ><<<<<<<<     ><<<<<<<<
  ><<        ><<     ><<     ><<    ><<     ><<     ><<     ><<           ><<      
  ><<   ><   ><<     ><<      ><<           ><<     ><<     ><<           ><<      
  ><<  ><<   ><<     ><<        ><<         ><<<<<< ><<     ><<<<<<       ><<<<<<  
  ><< >< ><< ><<     ><<           ><<      ><<     ><<     ><<           ><<      
  >< ><    ><<<<     ><<     ><<    ><<     ><<     ><<     ><<           ><<      
  ><<        ><<     ><<       ><< <<       ><<     ><<     ><<<<<<<<     ><<<<<<<<
`;

  const initial = finished.replace(/  /g, '>>').replace(/ /g, '<');
  let name = $state(initial);

  $effect(() => {
    const interval = setInterval(() => {
      const spaces: number[] = [...finished].reduce((acc: number[], char, i) => {
        if (char === ' ' && name[i] !== ' ' && name[i] !== '\n') acc.push(i);
        return acc;
      }, []);

      if (spaces.length === 0) {
        clearInterval(interval);
        return;
      }

      const randomIndex = Math.floor(Math.random() * spaces.length);
      const indexToChange = spaces[randomIndex];
      name = name.substring(0, indexToChange) + ' ' + name.substring(indexToChange + 1);
    }, 1);

    return () => clearInterval(interval);
  });
</script>

<div class="font-mono whitespace-pre-wrap text-center font-bold text-[5px] md:text-lg w-full h-full justify-center items-center flex text-sunrise tracking-widest">
  {name}
</div>
