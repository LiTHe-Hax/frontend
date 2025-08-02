<script lang="ts">
	import type { Snippet } from "svelte";

	type Layout = "normal" | "thin";
	type Props = { children: Snippet; layout?: Layout; h1?: string };
	let { children, layout = "normal", h1 }: Props = $props();
</script>

<div class={layout}>
	{#if h1}
		<h1>{h1}</h1>
	{/if}
	{@render children()}
</div>

<style lang="scss">
	@use "$lib/styles/size.scss";

	$inner-mobile-gap: 1rem;
	$outer-mobile-gap: 1rem;

	$inner-desktop-gap: 1rem;
	$outer-desktop-gap: 3rem;

	div {
		&.normal {
			display: flex;
			flex-direction: column;

			@media screen and (max-width: size.$max-mobile-width) {
				gap: $inner-mobile-gap;
				margin: $outer-mobile-gap;
			}

			@media screen and (min-width: size.$min-desktop-width) {
				gap: $inner-desktop-gap;
				margin: $outer-desktop-gap;
			}
		}

		&.thin {
			display: flex;
			flex-direction: column;

			@media screen and (max-width: size.$max-mobile-width) {
				gap: $inner-mobile-gap;
				margin: $outer-mobile-gap;
			}

			@media screen and (min-width: size.$min-desktop-width) {
				gap: $inner-desktop-gap;
				margin: $outer-desktop-gap auto;
				padding: 0 $outer-desktop-gap; // Padding imitates a horizontal margin
				max-width: 39rem;
			}
		}

		h1 {
			margin: 0;
			line-height: 1;
		}
	}
</style>
