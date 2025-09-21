<script lang="ts">
	import Markdown from "svelte-exmarkdown";

	import type { Event } from "$lib/api/event";
	import { isSameDay } from "$lib/date";

	import Article from "./Article.svelte";
	import DocumentLink from "./DocumentLink.svelte";

	type Props = { event: Event };

	const { event }: Props = $props();

	const startDate = $derived(new Date(event.start_date));
	const endDate = $derived(event.end_date ? new Date(event.end_date) : null);

	const dateFormatter = new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
	});

	const timeFormatter = new Intl.DateTimeFormat("en", {
		hour: "numeric",
		minute: "2-digit",
		hour12: false,
	});
</script>

<Article>
	<h1 class="title">{event.title}</h1>
	<div class="info-row">
		<span>
			<i class="fa-solid fa-calendar fa-width-auto"></i>
			{#if endDate && event.show_time}
				{#if isSameDay(startDate, endDate)}
					{dateFormatter.format(startDate)}, {timeFormatter.format(startDate)}
					-
					{timeFormatter.format(endDate)}
				{:else}
					{dateFormatter.format(startDate)}, {timeFormatter.format(startDate)}
					-
					{dateFormatter.format(startDate)}, {timeFormatter.format(startDate)}
				{/if}
			{:else if endDate && !isSameDay(startDate, endDate)}
				{dateFormatter.format(startDate)} - {dateFormatter.format(endDate)}
			{:else if event.show_time}
				{dateFormatter.format(startDate)}, {timeFormatter.format(startDate)}
			{:else}
				{dateFormatter.format(startDate)}
			{/if}
		</span>

		{#if event.location}
			<span>
				<i class="fa-solid fa-location-dot fa-width-auto"></i>
				<a href={event.location.maps_url}>{event.location.name}</a>
			</span>
		{/if}
	</div>
	<img class="cover-image" src={event.image_url} alt={`Cover image for ${event.title}`} />

	<Markdown md={event.content}>
		{#snippet a(props)}
			{@const { children, href, ...restProps } = props}
			{#if !href}
				<span>href</span>
			{:else if href.match(/^http.*\/.*\.[A-Za-z0-9]+$/)}
				<!-- Matches HTTP(S) URLs with paths that ends with a dot and some alphanumerics -->
				<DocumentLink link={href} />
			{:else if children}
				<a {href} {...restProps}>{@render children()}</a>
			{/if}
		{/snippet}
		{#snippet img(props)}
			<img {...props} style:max-width="100%" />
		{/snippet}
	</Markdown>

	{#if event.sponsors.length != 0}
		<hr />
		<div class="sponsor-logos">
			{#each event.sponsors as sponsor (sponsor.name)}
				<img src={sponsor.logo_url} alt={`logo of ${sponsor.name}`} />
			{/each}
		</div>
	{/if}
</Article>

<style lang="scss">
	@use "$lib/styles/color";

	.title {
		margin-bottom: 0.2rem;
	}

	.info-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.2rem 0.5rem;
		margin-bottom: 1rem;

		i {
			color: color.$gray-5;
		}
	}

	.cover-image {
		width: 100%;
	}

	.sponsor-logos {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		margin: 1rem 0;

		img {
			width: auto;
			height: 2rem;
		}
	}
</style>
