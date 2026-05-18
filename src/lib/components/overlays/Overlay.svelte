<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		isDisabled?: boolean;
	};
	const { children, isDisabled }: Props = $props();
</script>

<div class={[isDisabled && "disabled"]}>
	{@render children()}
</div>

<style lang="scss">
	@use "$lib/styles/mixin";

	div {
		@include mixin.unified-transition(100ms, ease, opacity, visibility);

		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 1;
		visibility: visible;

		:global {
			@include mixin.remove-top-bottom-child-margins;
		}

		&.disabled {
			opacity: 0;
			visibility: hidden;
		}
	}
</style>
