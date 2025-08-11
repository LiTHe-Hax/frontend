<script lang="ts">
	import type { Snippet } from "svelte";

	const { children }: { children: Snippet } = $props();
</script>

<article>
	{@render children()}
</article>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	article {
		border-radius: 0.5rem;
		background-color: color.$black-2;
		color: color.$white;

		:global {
			@include mixin.remove-top-bottom-child-margins();
		}

		@include mixin.on-mobile() {
			padding: 1rem;
		}

		@include mixin.on-desktop() {
			padding: 1.5rem;
		}
	}
</style>
