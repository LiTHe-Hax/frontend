<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type Props = HTMLAnchorAttributes;
	const { children, ...restProps }: Props = $props();
</script>

<a {...restProps}>{@render children?.()}</a>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	a {
		@include mixin.unified-transition(100ms, ease, color, fill);

		color: color.$primary;
		fill: color.$primary;
		cursor: pointer;

		:global(svg) {
			fill: inherit;
		}

		&:hover {
			color: color.$primary-highlight;
			fill: color.$primary-highlight;
		}
	}
</style>
