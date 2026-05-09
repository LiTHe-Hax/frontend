<script lang="ts">
	import type { Snippet } from "svelte";

	type Layout = "normal" | "thin";
	type Props = { children: Snippet; h1?: string; layout?: Layout };

	const { children, h1, layout = "normal" }: Props = $props();
</script>

<div class={layout}>
	{#if h1}
		<h1>{h1}</h1>
	{/if}
	{@render children()}
</div>

<style lang="scss">
	@use "$lib/styles/mixin";

	div {
		&.normal {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&.thin {
			@extend .normal;

			@include mixin.on-desktop() {
				margin: 0 auto;
				max-width: 39rem;
				box-sizing: content-box;
			}
		}
	}

	h1 {
		margin: 0;
		line-height: 1;
	}
</style>
