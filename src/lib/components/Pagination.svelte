<script lang="ts">
	import { page as pageState } from "$app/state";

	type Props = {
		currentPage: number;
		pageCount: number;
		buttonCount: number;
	};
	const { currentPage, pageCount, buttonCount }: Props = $props();

	const visiblePages = $derived.by(() => {
		const prevPages = Math.floor((buttonCount - 1) / 2);
		const nextPages = Math.ceil((buttonCount - 1) / 2);

		let minPage = currentPage - prevPages;
		let maxPage = currentPage + nextPages;

		if (minPage < 1) {
			const increase = 1 - minPage;
			minPage += increase;
			maxPage += increase;
		}

		if (maxPage > pageCount) {
			const decrease = pageCount - maxPage;
			minPage += decrease;
			maxPage += decrease;
			if (minPage < 1) {
				minPage = 1;
			}
		}

		return Array.from(Array(maxPage - minPage + 1), (_, idx) => idx + minPage);
	});

	function getPageHref(page: number) {
		const basePath = pageState.url.pathname;
		if (page === 1) {
			return `${basePath}`;
		} else {
			return `${basePath}?page=${page}`;
		}
	}
</script>

<div>
	<a href={getPageHref(1)} aria-label="First">
		<i class={["fa-solid", "fa-width-auto", "fa-angles-left"]}></i>
	</a>
	{#each visiblePages as page (page)}
		<a class={[currentPage == page && "selected"]} href={getPageHref(page)}>
			{page}
		</a>
	{/each}
	<a href={getPageHref(pageCount)} aria-label="Last">
		<i class={["fa-solid", "fa-width-auto", "fa-angles-right"]}></i>
	</a>
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	div {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;

		@include mixin.on-mobile {
			gap: size.$spacing-xs;
		}

		@include mixin.on-desktop {
			gap: size.$spacing-s;
		}

		a {
			@include mixin.unified-transition(100ms, ease, background-color);

			padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
			border-radius: size.$radius-l;
			background-color: color.$primary;
			color: color.$primary-text;
			font-weight: bold;
			line-height: 1;
			cursor: pointer;

			&:hover {
				background-color: color.$primary-highlight;
			}
		}
	}
</style>
