<script lang="ts">
	import { page } from "$app/state";

	import { getPreviousEvents, getUpcomingEvents, type Event } from "$lib/api/event";

	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import EventArticle from "$lib/components/EventArticle.svelte";
	import Pagination from "$lib/components/Pagination.svelte";

	type Props = { showPrevious?: boolean };
	const { showPrevious }: Props = $props();

	let currentPage = $state(1);
	let pageCount = $state(1);
	let events = $state<Event[] | undefined>(undefined);
	let isLoading = $state(true);
	let error = $state<string | undefined>(undefined);

	const getEvents = $derived(showPrevious ? getPreviousEvents : getUpcomingEvents);

	$effect.pre(() => {
		const pageParam = page.url.searchParams.get("page") || "1";
		try {
			currentPage = parseInt(pageParam);
		} catch {
			currentPage = 1;
		}
	});

	$effect(() => {
		isLoading = true;
		error = undefined;

		getEvents(currentPage)
			.then((response) => {
				if (response.isSuccessful) {
					events = response.data!.results;
					pageCount = response.data!.page_count;
					if (events.length == 0) {
						error = `There are no ${showPrevious ? "previous" : "upcoming"} events.`;
					}
				} else {
					error = "There are no events on this page. Please go to a previous page.";
				}
			})
			.catch(() => {
				error = "Could not reach the server. Please try again later.";
			})
			.finally(() => {
				isLoading = false;
			});
	});
</script>

<ArticleGroup layout="thin">
	{#if isLoading}
		<div class="status-overlay">
			<i class={["loading", "fa-solid", "fa-spinner", "fa-spin-pulse"]}></i>
		</div>
	{:else if error}
		<div class="status-overlay">
			<i class={["error", "fa-solid", "fa-heart-crack"]}></i>
			<p>{error}</p>
		</div>
	{:else}
		{#each events as event (event.title)}
			<EventArticle {event} />
		{/each}
	{/if}

	{#if events || !isLoading}
		<div class={["pagination-container", "mobile"]}>
			<Pagination {currentPage} {pageCount} buttonCount={3} />
		</div>
		<div class={["pagination-container", "desktop"]}>
			<Pagination {currentPage} {pageCount} buttonCount={5} />
		</div>
	{/if}
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	.status-overlay {
		text-align: center;

		i {
			display: block;
			margin: 0 auto;
			font-size: 2em;

			&.error {
				color: color.$error;
			}
		}

		p {
			margin: size.$spacing-xs 0 0;
		}
	}

	.pagination-container {
		&.mobile {
			display: contents;

			@include mixin.on-desktop {
				display: none;
			}
		}

		&.desktop {
			display: contents;

			@include mixin.on-mobile {
				display: none;
			}
		}
	}
</style>
