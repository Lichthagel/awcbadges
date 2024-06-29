<script lang="ts">
  import { slide } from "svelte/transition";

  export let title: string;

  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
  };
</script>

<div>
  <button on:click={() => toggle()} type="button">
    <h2 class="text-gradient mx-auto my-5 w-max text-3xl lowercase">
      {title}
    </h2>
  </button>
  {#if isOpen}
  <div
    class="overflow-x-scroll whitespace-nowrap lg:whitespace-normal"
    transition:slide={{ duration: 500 }}
  >
      <slot />
  </div>
  {/if}
</div>
