<script lang="ts">
	import Markdown from "svelte-exmarkdown";

	import type { Event } from "$lib/api/event";
	import { isSameDay } from "$lib/date";

	import Article from "./Article.svelte";
	import DocumentLink from "./DocumentLink.svelte";
	import Heading from "./Heading.svelte";
	import Separator from "./Separator.svelte";

	type Props = { event: Event };

	const { event }: Props = $props();

	const startDate = $derived(new Date(event.start_date));
	const endDate = $derived(event.end_date ? new Date(event.end_date) : null);

	function formatDate(date: Date) {
		const today = new Date(Date.now());

		let formatter;
		if (date.getFullYear() !== today.getFullYear()) {
			formatter = new Intl.DateTimeFormat("en", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		} else {
			formatter = new Intl.DateTimeFormat("en", {
				month: "short",
				day: "numeric",
			});
		}

		return formatter.format(date);
	}

	function formatTime(date: Date) {
		const formatter = new Intl.DateTimeFormat("en", {
			hour: "numeric",
			minute: "2-digit",
			hour12: false,
		});

		return formatter.format(date);
	}
</script>

<Article>
	<Heading level={1} content={event.title} />
	<div class="info-row" style:margin-top="-1.15rem">
		<span>
			<i class="fa-solid fa-calendar fa-width-auto"></i>
			{#if endDate && event.show_time}
				{#if isSameDay(startDate, endDate)}
					{formatDate(startDate)}, {formatTime(startDate)}
					-
					{formatTime(endDate)}
				{:else}
					{formatDate(startDate)}, {formatTime(startDate)}
					-
					{formatDate(startDate)}, {formatTime(startDate)}
				{/if}
			{:else if endDate && !isSameDay(startDate, endDate)}
				{formatDate(startDate)} - {formatDate(endDate)}
			{:else if event.show_time}
				{formatDate(startDate)}, {formatTime(startDate)}
			{:else}
				{formatDate(startDate)}
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
		<Separator />
		<div class="sponsor-logos">
			{#each event.sponsors as sponsor (sponsor.name)}
				<img src={sponsor.logo_url} alt={`logo of ${sponsor.name}`} />
			{/each}
		</div>
	{/if}
</Article>

<style lang="scss">
	@use "$lib/styles/color";

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
