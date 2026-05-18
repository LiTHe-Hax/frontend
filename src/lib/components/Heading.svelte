<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		children?: Snippet;
		level: 1 | 2 | 3 | 4 | 5 | 6;
	};
	const { children, level, ...restProps }: Props = $props();
</script>

<svelte:element this={`h${level}`} {...restProps}>
	{@render children?.()}
</svelte:element>

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
