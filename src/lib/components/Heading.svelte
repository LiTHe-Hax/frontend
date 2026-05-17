<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		children?: Snippet;
		level: 1 | 2 | 3 | 4 | 5 | 6;
	};
	const { children, level, ...restProps }: Props = $props();
</script>

{#if level === 1}
	<h1 {...restProps}>{@render children?.()}</h1>
{:else if level === 2}
	<h2 {...restProps}>{@render children?.()}</h2>
{:else if level === 3}
	<h3 {...restProps}>{@render children?.()}</h3>
{:else if level === 4}
	<h4 {...restProps}>{@render children?.()}</h4>
{:else if level === 5}
	<h5 {...restProps}>{@render children?.()}</h5>
{:else}
	<h6 {...restProps}>{@render children?.()}</h6>
{/if}

<style lang="scss">
	@use "$lib/styles/color";

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: revert;
		color: color.$primary;
		font-size: revert;
		font-weight: bold;
	}
</style>
