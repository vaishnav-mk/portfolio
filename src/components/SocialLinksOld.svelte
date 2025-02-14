<script>
  export let links = [];

  const generateBinaryBackground = (rows, cols) => {
    let background = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        background += Math.random() < 0.5 ? "1" : "0";
      }
      background += "\n";
    }
    return background;
  };

  const rows = 100;
  const cols = 120;
  const binaryBackground = generateBinaryBackground(rows, cols);

  let showButton = false;

  setTimeout(() => {
    showButton = true;
  }, 3200);

  const alertText = `
  POODOO    INHINT
    CA  Q
    TS  ALMCADR

    TC  BANKCALL
    CADR  VAC5STOR  # STORE ERASABLES FOR DEBUGGING PURPOSES.

    INDEX  ALMCADR
    CAF  0
ABORT2    TC  BORTENT

OCT77770  OCT  77770    # DONT MOVE
    CA  V37FLBIT  # IS AVERAGE G ON
    MASK  FLAGWRD7
    CCS  A
    TC  WHIMPER -1  # YES.  DONT DO POODOO.  DO BAILOUT.

    TC  DOWNFLAG
    ADRES  STATEFLG

    TC  DOWNFLAG
    ADRES  REINTFLG

    TC  DOWNFLAG
    ADRES  NODOFLAG

    TC  BANKCALL
    CADR  MR.KLEAN
    TC  WHIMPER
  `;
  const handleButtonClick = () => {
    alert(alertText);
  };
</script>

<div
  class="relative mt-8 md:mt-16 bg-dusk rounded-lg w-full shadow-lg overflow-hidden"
>
  <div class="binary-background">{binaryBackground}</div>
  <div
    class="relative z-10 flex flex-col items-center md:flex-row p-4 justify-around"
  >
    <div class="grid grid-cols-2 gap-6">
      {#each links as link}
        <a
          href={link.href}
          class="button text-sunrise uppercase font-semibold px-6 py-3 bg-blur hover:bg-sunrise-light rounded-lg transition duration-300 transform hover:-translate-y-1"
          target="_blank"
        >
          <svg
            id="Link Square"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect
              width="24"
              height="24"
              stroke="none"
              fill="#000000"
              opacity="0"
            />
            <g transform="matrix(1.43 0 0 1.43 12 12)">
              <g>
                <g transform="matrix(1 0 0 1 -1.25 1.25)">
                  <path
                    style="stroke: #ffa69e; stroke-width: 1; fill: none;"
                    transform=" translate(-5.75, -8.25)"
                    d="M 6.58333 3.25754 C 5.32518 3.2348 4.07723 3.2635 2.79332 3.34365 C 1.82935 3.40383 1.06367 4.17231 0.960635 5.13264 C 0.852307 6.14225 0.75 7.18436 0.75 8.25 C 0.75 9.31563 0.852307 10.3578 0.960635 11.3674 C 1.06367 12.3277 1.82945 13.0962 2.79341 13.1564 C 4.79356 13.2812 6.70644 13.2812 8.70659 13.1564 C 9.67055 13.0962 10.4363 12.3277 10.5394 11.3674 C 10.6477 10.3578 10.75 9.31563 10.75 8.25 C 10.75 7.97055 10.743 7.69272 10.7306 7.41667"
                    stroke-linecap="round"
                  />
                </g>
                <g transform="matrix(1 0 0 1 3.13 -3.19)">
                  <path
                    style="stroke: #ffa69e; stroke-width: 1; fill: none;"
                    transform=" translate(-10.13, -3.81)"
                    d="M 7.25011 6.68397 L 13.0036 0.930377"
                    stroke-linecap="round"
                  />
                </g>
                <g transform="matrix(1 0 0 1 4.06 -4.11)">
                  <path
                    style="stroke: #ffa69e; stroke-width: 1; fill: none;"
                    transform=" translate(-11.06, -2.89)"
                    d="M 13.0283 4.98438 C 13.1893 3.36376 13.1894 2.47364 13.0283 0.923794 C 11.4785 0.762746 10.5884 0.762837 8.96774 0.923793"
                    stroke-linecap="round"
                  />
                </g>
              </g>
            </g>
          </svg>
          {link.label}
        </a>
      {/each}
    </div>

    <div class="mt-6 md:mt-0 flex justify-end">
      {#if !showButton}
        <img
          src="https://vaishnav-mk.vercel.app/_next/image?url=%2Fhero.webp&w=640&q=75"
          alt="Avatar"
          class="w-24 h-24 rounded-full border-4 border-sunrise shadow-md hover-image"
        />
      {:else}
        <img
          src="https://vaishnav-mk.vercel.app/_next/image?url=%2Fhero.webp&w=640&q=75"
          alt="Avatar"
          class="w-24 h-24 rounded-full border-4 border-green-500 shadow-md cursor-pointer"
          on:click={handleButtonClick}
          type="button"
        />
      {/if}
    </div>
  </div>
</div>

<style>
  .binary-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: "Courier New", monospace;
    color: rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
    white-space: pre;
    pointer-events: none;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    backdrop-filter: blur(10px);
  }

  .button svg {
    margin-right: 0.5rem;
    fill: currentColor;
    width: 1em;
    height: 1em;
  }

  .hover-image {
    transition:
      transform 3s ease,
      border-color 3s ease;
  }

  .hover-image:hover {
    transform: rotate(360deg);
    border-color: #22c55e;
  }
</style>
