<script lang="ts">
	import type { Snippet } from "svelte";

	const { children, translucent }: { children: Snippet; translucent?: boolean } = $props();
</script>

<article class={[translucent && "translucent"]}>
	<div class="contents">
		{@render children()}
	</div>
</article>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	article {
		border-radius: 0.5rem;
		background-color: color.$black-2;
		color: color.$white;

		@include mixin.on-mobile() {
			padding: 1rem;
		}

		@include mixin.on-desktop() {
			padding: 1.5rem;
		}

		.contents :global {
			@include mixin.remove-top-bottom-child-margins();
		}

		&.translucent {
			.contents {
				@include mixin.unified-transition(150ms, ease, opacity);

				opacity: 0.5;

				:global(img) {
					@include mixin.unified-transition(150ms, ease, filter);

					filter: saturate(50%);
				}
			}

			&:hover .contents {
				opacity: 1;

				:global(img) {
					filter: saturate(100%);
				}
			}
		}
	}
</style>
