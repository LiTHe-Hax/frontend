<script lang="ts">
	import type { Snippet } from "svelte";

	type OverlayedProps = {
		children: Snippet;
		isDisabled?: boolean;
	};

	const { children, isDisabled }: OverlayedProps = $props();
</script>

<div class={[isDisabled && "disabled"]}>
	{@render children()}
</div>

<style lang="scss">
	@use "$lib/styles/mixin";

	div {
		display: contents;

		> :global(*) {
			@include mixin.unified-transition(100ms, ease, opacity, filter);

			opacity: 0.5;
			filter: blur(0.2rem);
			pointer-events: none;
		}

		&.disabled > :global(*) {
			opacity: 1;
			filter: blur(0);
			pointer-events: auto;
		}
	}
</style>
