<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type LinkProps = HTMLAnchorAttributes;

	const { children, ...restProps }: LinkProps = $props();
</script>

<a {...restProps}>{@render children?.()}</a>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	a {
		@include mixin.unified-transition(150ms, ease-out, color, fill);

		color: color.$green-2;
		fill: color.$green-2;
		text-decoration: none;

		:global(svg) {
			fill: inherit;
		}

		&:hover {
			color: color.$green-3;
			fill: color.$green-3;
		}
	}
</style>
