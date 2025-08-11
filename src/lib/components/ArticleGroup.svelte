<script lang="ts">
	import type { Snippet } from "svelte";

	type Layout = "normal" | "thin";

	const { children, layout = "normal" }: { children: Snippet; layout?: Layout } = $props();
</script>

<div class={layout}>
	{@render children()}
</div>

<style lang="scss">
	@use "$lib/styles/mixin";

	$inner-mobile-gap: 1rem;
	$outer-mobile-gap: 1rem;

	$inner-desktop-gap: 1rem;
	$outer-desktop-gap: 3rem;

	.normal {
		display: flex;
		flex-direction: column;

		@include mixin.on-mobile() {
			gap: $inner-mobile-gap;
			margin: $outer-mobile-gap;
		}

		@include mixin.on-desktop() {
			gap: $inner-desktop-gap;
			margin: $outer-desktop-gap;
		}
	}

	.thin {
		display: flex;
		flex-direction: column;

		@include mixin.on-mobile() {
			// The group on mobile is already thin enough, so this is the same as the normal layout
			gap: $inner-mobile-gap;
			margin: $outer-mobile-gap;
		}

		@include mixin.on-desktop() {
			gap: $inner-desktop-gap;
			margin: $outer-desktop-gap auto;
			padding: 0 $outer-desktop-gap;
			max-width: 39rem;
			box-sizing: content-box;
		}
	}
</style>
