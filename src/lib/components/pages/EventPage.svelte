<script lang="ts">
	import { page } from "$app/state";

	import { getPreviousEvents, getUpcomingEvents, type Event } from "$lib/api/event";
	import type { StatusType } from "$lib/types";

	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import EventArticle from "$lib/components/EventArticle.svelte";
	import Pagination from "$lib/components/Pagination.svelte";
	import Status from "../Status.svelte";

	type Props = { showPrevious?: boolean };
	const { showPrevious }: Props = $props();

	let currentPage = $state(1);
	let pageCount = $state(1);
	let events = $state<Event[]>([]);

	let showStatus = $state(true);
	let statusMessage = $state("");
	let statusType = $state<StatusType>("loading");

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
		showStatus = true;
		statusMessage = "";
		statusType = "loading";

		getEvents(currentPage)
			.then((response) => {
				if (response.isSuccessful) {
					events = response.data!.results;
					pageCount = response.data!.page_count;

					if (events.length == 0) {
						statusMessage = `There are no ${showPrevious ? "previous" : "upcoming"} events.`;
						statusType = "error";
					} else {
						showStatus = false;
					}
				} else {
					statusMessage = "There are no events on this page. Please go to a previous page.";
					statusType = "error";
				}
			})
			.catch(() => {
				statusMessage = "Could not connect to the server. Try again later.";
				statusType = "error";
			});
	});
</script>

<ArticleGroup layout="thin">
	{#if showStatus}
		<Status message={statusMessage} type={statusType} />
	{:else}
		{#each events as event (event.title)}
			<EventArticle {event} />
		{/each}
	{/if}

	<div class={["pagination-container", "mobile"]}>
		<Pagination {currentPage} {pageCount} buttonCount={3} />
	</div>
	<div class={["pagination-container", "desktop"]}>
		<Pagination {currentPage} {pageCount} buttonCount={5} />
	</div>
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/mixin";

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
