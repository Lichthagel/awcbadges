<script lang="ts">
  import type { Snippet } from "svelte";

  import { slide } from "svelte/transition";

  type Props = {
    children: Snippet;
    title: string;
  };

  const {
    title,
    children,
  }: Props = $props();

  let isOpen = $state(false);

  const toggle = () => {
    isOpen = !isOpen;
  };
</script>

<div>
  <button
    class="text-ctp-pink mx-auto my-5 w-max"
    onclick={() => toggle()}
    type="button"
  >
    <span
      class="inline-block transition-transform w-8 h-8 i-lucide-chevron-right"
      class:rotate-90={isOpen}
    ></span>
    <span class="text-3xl lowercase align-middle">{title}</span>
  </button>
  {#if isOpen}
    <div
      class="overflow-x-scroll whitespace-nowrap lg:whitespace-normal"
      transition:slide={{ duration: 500 }}
    >
      {@render children()}
    </div>
  {/if}
</div>
