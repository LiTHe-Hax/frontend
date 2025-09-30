<script lang="ts">
	import { page as pageState } from "$app/state";

	type Props = {
		currentPage: number;
		pageCount: number;
		buttonCount: number;
	};

	const { currentPage, pageCount, buttonCount }: Props = $props();

	const visiblePages = $derived.by(() => {
		const leftLinks = Math.floor((buttonCount - 1) / 2);
		const rightLinks = Math.ceil((buttonCount - 1) / 2);

		let minPage = currentPage - leftLinks;
		let maxPage = currentPage + rightLinks;

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

	function getPageLink(page: number) {
		const basePath = pageState.url.pathname;
		if (page === 1) {
			return `${basePath}`;
		} else {
			return `${basePath}?page=${page}`;
		}
	}
</script>

<div class="pagination">
	<a href={getPageLink(1)} aria-label="First">
		<i class="fa-solid fa-angles-left fa-width-auto"></i>
	</a>
	{#each visiblePages as page (page)}
		<a class={[currentPage === page && "selected"]} href={getPageLink(page)}>{page}</a>
	{/each}
	<a href={getPageLink(pageCount)} aria-label="Last">
		<i class="fa-solid fa-angles-right fa-width-auto"></i>
	</a>
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	.pagination {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.3rem;

		a {
			border: 0.15rem solid color.$green-2;
			padding: 0.4rem 0.6rem;
			border-radius: 0.5rem;
			background-color: color.$black-1;
			color: color.$green-2;
			font-weight: bold;
			line-height: 1;
			text-decoration: none;

			&.selected {
				background-color: color.$green-2;
				color: color.$black-1;
			}

			@include mixin.on-mobile() {
				transition: none;
			}

			@include mixin.on-desktop() {
				@include mixin.unified-transition(150ms, ease, background-color, color, transform);

				&:hover {
					background-color: color.$green-2;
					color: color.$black-1;
					transform: scale(1.1);
				}
			}
		}
	}
</style>
