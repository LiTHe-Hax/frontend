<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { disabled?: boolean; children?: Snippet };
	let { disabled = false, children }: Props = $props();
</script>

<button type="submit" {disabled}>
	{#if children !== undefined}
		{@render children()}
	{/if}
</button>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	button {
		@include mixin.unified-transition(150ms, ease-out, background-color, color, transform);

		padding: 0.5rem;
		border: 0;
		border-radius: 0.25rem;
		background-color: color.$gray-1;
		color: color.$green-2;
		box-shadow: 0 2px 4px 0 color.$shadow;
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
