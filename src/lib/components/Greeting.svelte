<script lang="ts">
  import { onMount } from 'svelte';
  import data from '../../data.json';

  const logo = [
    "  ><<        ><<     ><<       ><< <<       ><<     ><<     ><<<<<<<<     ><<<<<<<<  ",
    "  ><<        ><<     ><<     ><<    ><<     ><<     ><<     ><<           ><<        ",
    "  ><<   ><   ><<     ><<      ><<           ><<     ><<     ><<           ><<        ",
    "  ><<  ><<   ><<     ><<        ><<         ><<<<<< ><<     ><<<<<<       ><<<<<<    ",
    "  ><< >< ><< ><<     ><<           ><<      ><<     ><<     ><<           ><<        ",
    "  >< ><    ><<<<     ><<     ><<    ><<     ><<     ><<     ><<           ><<        ",
    "  ><<        ><<     ><<       ><< <<       ><<     ><<     ><<<<<<<<     ><<<<<<<<  ",
  ];

  const cols = 160;
  const rows = 50;
  const logoStartRow = Math.floor((rows - logo.length) / 2);
  const logoStartCol = Math.floor((cols - logo[0].length) / 2);

  function buildGrid() {
    const grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        const inLogoRow = r >= logoStartRow && r < logoStartRow + logo.length;
        const logoRowIdx = r - logoStartRow;
        const inLogoCol = inLogoRow && c >= logoStartCol && c < logoStartCol + logo[0].length;
        const logoColIdx = c - logoStartCol;

        if (inLogoCol && logo[logoRowIdx][logoColIdx] !== ' ') {
          row.push(logo[logoRowIdx][logoColIdx]);
        } else {
          row.push(Math.random() > 0.5 ? '<' : '>');
        }
      }
      grid.push(row);
    }
    return grid;
  }

  function buildTarget() {
    const grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        const inLogoRow = r >= logoStartRow && r < logoStartRow + logo.length;
        const logoRowIdx = r - logoStartRow;
        const inLogoCol = inLogoRow && c >= logoStartCol && c < logoStartCol + logo[0].length;
        const logoColIdx = c - logoStartCol;

        if (inLogoCol) {
          row.push(logo[logoRowIdx][logoColIdx]);
        } else {
          row.push(' ');
        }
      }
      grid.push(row);
    }
    return grid;
  }

  let grid = buildGrid();
  const target = buildTarget();
  let display = $state(grid.map(r => r.join('')).join('\n'));
  let isComplete = $state(false);

  onMount(() => {
    const interval = setInterval(() => {
      const mismatches: [number, number][] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (target[r][c] === ' ' && grid[r][c] !== ' ') {
            mismatches.push([r, c]);
          }
        }
      }

      if (mismatches.length === 0) {
        clearInterval(interval);
        isComplete = true;
        return;
      }

      const batchSize = Math.max(8, Math.floor(mismatches.length / 15));

      for (let i = 0; i < batchSize && mismatches.length > 0; i++) {
        const idx = Math.floor(Math.random() * mismatches.length);
        const [r, c] = mismatches[idx];
        grid[r][c] = ' ';
        mismatches.splice(idx, 1);
      }

      display = grid.map(r => r.join('')).join('\n');
    }, 16);

    return () => clearInterval(interval);
  });
</script>

<div class="relative w-full h-full flex flex-col justify-center items-center bg-night overflow-hidden">
  <div class="ascii-container transition-transform duration-300" class:scale-105={isComplete}>
    <pre
      class="font-mono font-bold text-sunrise transition-colors duration-300 select-none"
      class:text-zenith={isComplete}
    >{display}</pre>
  </div>

  {#if isComplete}
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-fade-in">
      <p class="text-xs text-dawn/40 tracking-wide">~/vm</p>
    </div>
  {/if}

  <p class="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right text-[10px] md:text-xs text-dawn/30 italic max-w-[200px]">{data.byline}</p>
</div>

<style>
  .ascii-container {
    font-size: 3px;
    line-height: 1.1;
    transform: scale(1);
  }

  @media (min-width: 400px) {
    .ascii-container {
      font-size: 4px;
    }
  }

  @media (min-width: 640px) {
    .ascii-container {
      font-size: 7px;
    }
  }

  @media (min-width: 768px) {
    .ascii-container {
      font-size: 10px;
    }
  }

  @media (min-width: 1024px) {
    .ascii-container {
      font-size: 13px;
    }
  }

  @media (min-width: 1280px) {
    .ascii-container {
      font-size: 16px;
    }
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.4s ease-out forwards;
  }
</style>
