<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		translucent?: boolean;
	};
	const { children, translucent }: Props = $props();
</script>

<article class={[translucent && "translucent"]}>
	<div class="contents">
		{@render children()}
	</div>
</article>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	article {
		border-radius: size.$radius-l;
		background-color: color.$article;
		color: color.$article-text;

		@include mixin.on-mobile {
			padding: size.$spacing-s;
		}

		@include mixin.on-desktop {
			padding: size.$spacing-m;
		}

		.contents :global {
			@include mixin.remove-top-bottom-child-margins();
		}

		&.translucent {
			.contents {
				@include mixin.unified-transition(100ms, ease, opacity, filter);

				opacity: 0.5;
				filter: saturate(50%);
			}

			&:hover .contents {
				opacity: 1;
				filter: saturate(100%);
			}
		}
	}
</style>
