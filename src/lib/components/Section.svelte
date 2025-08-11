<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { children: Snippet; isThin?: boolean };
	let { children, isThin = false }: Props = $props();
</script>

<section class={isThin ? "thin" : ""}>
	{@render children()}
</section>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	section {
		border-radius: 0.5rem;
		background-color: color.$black-2;
		color: color.$white;

		@include mixin.on-mobile() {
			margin: 1rem;
			padding: 1rem;
		}

		@include mixin.on-desktop() {
			margin: 3rem;
			padding: 1.5rem;

			&.thin {
				margin: 3rem auto;
				max-width: min(36rem, calc(100% - 6rem)); // Fakes a 3rem horizontal margin
			}
		}

		:global {
			@include mixin.remove-top-bottom-child-margins();
		}
	}
</style>
