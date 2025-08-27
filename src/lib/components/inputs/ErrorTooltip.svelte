<script lang="ts">
	import type { Snippet } from "svelte";

	type ErrorTooltipProps = { children?: Snippet };

	const { children }: ErrorTooltipProps = $props();
</script>

<div class={["error-tooltip"]}>
	{@render children?.()}
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	.error-tooltip {
		@include mixin.unified-transition(100ms, ease-out, opacity, visibility);

		position: absolute;
		bottom: calc(100% + 8px);
		right: 0;
		padding: 0.2rem 0.4rem;
		border: 1px solid color.$red;
		border-radius: 0.25rem;
		background-color: color.$black-2;
		color: color.$white;
		opacity: 0;
		visibility: hidden;

		&::after {
			content: "";
			position: absolute;
			top: 100%;
			left: 25%;
			border: 8px solid color.$black-2;
			border-right-color: transparent;
			border-bottom-color: transparent;
			border-left-color: transparent;
		}

		&::before {
			content: "";
			position: absolute;
			top: calc(100% + 1px);
			left: 25%;
			border: 8px solid color.$red;
			border-right-color: transparent;
			border-bottom-color: transparent;
			border-left-color: transparent;
		}
	}

	:global(*:hover) > .error-tooltip,
	:global(*:focus) ~ .error-tooltip {
		opacity: 1;
		visibility: visible;
	}
</style>
