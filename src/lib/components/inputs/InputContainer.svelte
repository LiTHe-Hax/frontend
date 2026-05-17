<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		label?: string;
		forId?: string;
		error?: string;
	};
	const { children, label, forId, error }: Props = $props();
</script>

<div class={["input-container", error && "error"]}>
	{#if label}
		<label for={forId}>{label}</label>
	{/if}
	{@render children()}
	<div class="tooltip">{error}</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	.input-container {
		@include mixin.unified-transition(100ms, ease, border-radius, border-color);

		display: inline-block;
		position: relative;
		border: size.$widget-border solid color.$widget;
		border-radius: size.$radius-l;

		&:focus-within {
			border-color: color.$widget-highlight;
		}

		label {
			@include mixin.unified-transition(100ms, ease, color);

			position: absolute;
			top: -0.7em;
			left: calc(size.$spacing-s - size.$spacing-xxs);
			padding: 0 size.$spacing-xxs;
			background-color: color.$article;
			color: color.$primary;
			font-weight: bold;
			line-height: 1;
			cursor: default;
		}

		.tooltip {
			@include mixin.unified-transition(100ms, ease, border-radius, opacity, visibility);

			position: absolute;
			right: calc(-1 * size.$widget-border);
			bottom: 100%;
			padding: calc(0.5 * size.$spacing-xs) size.$spacing-xs;
			max-width: 65%;
			border-radius: size.$radius-l size.$radius-l size.$radius-l 0;
			background-color: color.$error;
			color: color.$error-text;
			font-size: size.$input-font;
			opacity: 0;
			visibility: hidden;
		}

		&.error {
			border-color: color.$error;

			label {
				color: color.$error;
			}

			&:hover,
			&:focus-within {
				border-top-right-radius: 0;

				.tooltip {
					border-bottom-right-radius: 0;
					opacity: 1;
					visibility: visible;
				}
			}
		}
	}
</style>
