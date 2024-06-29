<script lang="ts">
  import { slide } from "svelte/transition";

  export let title: string;

  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
  };
</script>

<div>
  <button
    class="text-ctp-pink mx-auto my-5 w-max"
    on:click={() => toggle()}
    type="button"
  >
    <span
      class="inline-block transition-transform w-8 h-8 i-lucide-chevron-right"
      class:rotate-90={isOpen}
    />
    <span class="text-3xl lowercase align-middle">{title}</span>
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
