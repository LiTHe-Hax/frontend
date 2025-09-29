<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	type ButtonProps = HTMLButtonAttributes;

	const { children, ...restProps }: ButtonProps = $props();
</script>

<button {...restProps}>{@render children?.()}</button>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	button {
		@include mixin.unified-transition(150ms, ease-out, background-color, color, transform);

		border: 0;
		padding: 0.5rem;
		border-radius: 0.25rem;
		background-color: color.$gray-1;
		color: color.$green-2;
		box-shadow: 0 2px 4px 0 color.$shadow;
		font-family: inherit;
		font-size: 1em;
		font-weight: bold;
		transform: scaley(1);

		&:hover {
			background-color: color.$green-2;
			color: color.$gray-1;
			transform: scaley(1.1);
		}
	}
</style>
