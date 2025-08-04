<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { children: Snippet; translucent?: boolean };
	let { children, translucent }: Props = $props();
</script>

<article>
	{#if translucent}
		<div class="translucent">
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}
</article>

<style lang="scss">
	@use "$lib/styles/color.scss";
	@use "$lib/styles/size.scss";
	@use "$lib/styles/mixin.scss";

	article {
		@include mixin.remove-edge-child-margins();

		border-radius: 0.5rem;
		background: color.$black-2;
		color: color.$white;

		@media screen and (max-width: size.$max-mobile-width) {
			padding: 1rem;
		}

		@media screen and (min-width: size.$min-desktop-width) {
			padding: 1.5rem;
		}

		.translucent {
			@include mixin.remove-edge-child-margins();

			opacity: 0.5;
			transition: opacity 150ms ease-out;

			:global(img) {
				filter: saturate(50%);
				transition: filter 150ms ease-out;
			}
		}

		&:hover .translucent {
			opacity: 1;

			:global(img) {
				filter: saturate(100%);
			}
		}
	}
</style>
