<script lang="ts">
	import { page } from "$app/state";

	import { getPreviousEvents, getUpcomingEvents, type Event } from "$lib/api/event";

	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import EventArticle from "$lib/components/EventArticle.svelte";
	import Pagination from "$lib/components/Pagination.svelte";

	type Props = {
		showPrevious?: boolean;
	};

	const { showPrevious }: Props = $props();

	let currentPage = $state(1);
	let pageCount = $state(1);
	let events = $state<Event[] | undefined>(undefined);
	let isLoading = $state(true);
	let error = $state<string | undefined>(undefined);

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

		let getEvents;
		if (showPrevious) {
			getEvents = getPreviousEvents;
		} else {
			getEvents = getUpcomingEvents;
		}

		getEvents(currentPage)
			.then((response) => {
				if (response.isSuccessful) {
					events = response.data!.results;
					pageCount = response.data!.page_count;
				} else {
					error = "There are no events on this page. Please go to a previous page.";
				}
			})
			.catch(() => {
				error = "There was an error at the server. Please try again later.";
			})
			.finally(() => {
				isLoading = false;
			});
	});
</script>

<ArticleGroup layout="thin">
	{#if isLoading}
		<i class="icon loading fa-solid fa-spinner fa-spin-pulse"></i>
	{:else if events && events.length !== 0}
		{#each events as event (event.title)}
			<EventArticle {event} />
		{/each}
	{:else}
		<div>
			<i class="icon error fa-solid fa-heart-crack"></i>
			<p class="error-message">
				{error}
			</p>
		</div>
	{/if}

	{#if events}
		<Pagination {currentPage} {pageCount} buttonCount={5} />
	{/if}
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/color";

	.icon {
		display: block;
		margin: 0 auto;
		font-size: 2em;

		&.error {
			color: color.$red;
		}
	}

	.error-message {
		text-align: center;
	}
</style>
