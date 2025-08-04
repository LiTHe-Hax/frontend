<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { children: Snippet };
	let { children }: Props = $props();
</script>

<article>
	{@render children()}
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
	}
</style>
