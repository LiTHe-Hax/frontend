<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		title: string;
	};
	const { children, title }: Props = $props();

	let isCollapsed = $state(true);
	const toggleCollapsed = () => (isCollapsed = !isCollapsed);
</script>

<div class="collapsable-section">
	<button onclick={toggleCollapsed}>
		<i class={["fa-solid", "fa-width-auto", "fa-caret-right", isCollapsed && "collapsed"]}></i>
		{title}
	</button>
	<div class={["content", isCollapsed && "collapsed"]}>
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	.collapsable-section {
		margin: size.$spacing-s 0;

		button {
			@include mixin.unified-transition(100ms, ease, background-color);

			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			gap: calc(0.5 * size.$spacing-s);
			padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
			width: 100%;
			border-radius: size.$radius-l;
			background-color: color.$widget;
			color: color.$primary;
			font-weight: bold;
			line-height: 1;
			cursor: pointer;

			&:hover {
				background-color: color.$widget-highlight;
			}

			i {
				@include mixin.unified-transition(100ms, ease, transform);

				transform: rotate(90deg);

				&.collapsed {
					transform: rotate(0deg);
				}
			}
		}

		.content {
			@include mixin.unified-transition(100ms, ease, height);

			padding: size.$spacing-s 0 0 size.$spacing-s;
			height: auto;
			opacity: 1;
			overflow: hidden;

			&.collapsed {
				padding-top: 0;
				height: 0;
				opacity: 0;
			}

			:global {
				@include mixin.remove-top-bottom-child-margins;
			}

			@supports (interpolate-size: allow-keywords) {
				@include mixin.unified-transition(100ms, ease, height, padding, opacity);
			}
		}
	}
</style>
