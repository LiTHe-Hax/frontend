<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = HTMLButtonAttributes;
	const { children, ...restProps }: Props = $props();
</script>

<button {...restProps}>{@render children?.()}</button>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	button {
		@include mixin.unified-transition(100ms, ease, background-color);

		padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
		border-radius: size.$radius-l;
		background-color: color.$widget;
		color: color.$primary;
		font-weight: bold;
		text-align: center;
		line-height: 1;
		cursor: pointer;

		&:hover,
		&:focus {
			background-color: color.$widget-highlight;
		}
	}
</style>
