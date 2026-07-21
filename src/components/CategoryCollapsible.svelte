<script lang="ts">
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";

  type Props = {
    children: Snippet;
    title: string;
  };

  const { title, children }: Props = $props();

  let isOpen = $state(false);

  const toggle = () => {
    // oxlint-disable-next-line unicorn/no-top-level-assignment-in-function
    isOpen = !isOpen;
  };
</script>

<div>
  <button
    class="text-ctp-pink mx-auto my-5 w-max cursor-pointer"
    onclick={() => toggle()}
    type="button"
  >
    <span
      class="i-lucide-chevron-right inline-block h-8 w-8 transition-transform"
      class:rotate-90={isOpen}
    ></span>
    <span class="align-middle text-3xl lowercase">{title}</span>
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
