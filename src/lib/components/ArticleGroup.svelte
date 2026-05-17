<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		layout?: "wide" | "thin";
	};
	const { children, layout = "wide" }: Props = $props();
</script>

<div class={layout}>
	{@render children()}
</div>

<style lang="scss">
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	div {
		&.wide {
			display: flex;
			flex-direction: column;
			gap: size.$spacing-s;
		}

		&.thin {
			@extend .wide;

			@include mixin.on-desktop {
				margin: 0 auto;
				max-width: 39rem;
			}
		}
	}
</style>
