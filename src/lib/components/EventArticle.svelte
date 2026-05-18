<script lang="ts">
	import Markdown from "svelte-exmarkdown";

	import type { Event } from "$lib/api/event";
	import { isSameDay } from "$lib/date";

	import Article from "./Article.svelte";
	import DocumentLink from "./DocumentLink.svelte";
	import Heading from "./Heading.svelte";
	import Link from "./Link.svelte";
	import Separator from "./Separator.svelte";

	type Props = { event: Event };
	const { event }: Props = $props();

	const startDate = $derived(new Date(event.start_date));
	const endDate = $derived(event.end_date ? new Date(event.end_date) : null);

	function formatDate(date: Date) {
		const today = new Date(Date.now());

		const formatter = new Intl.DateTimeFormat("en", {
			year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
			month: "short",
			day: "numeric",
		});

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
	<Heading level={1} style="margin-bottom: 0">{event.title}</Heading>
	<div class="info-row">
		<span>
			<i class={["fa-solid", "fa-width-auto", "fa-calendar"]}></i>
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
				<i class={["fa-solid", "fa-width-auto", "fa-location-dot"]}></i>
				<Link href={event.location.maps_url}>{event.location.name}</Link>
			</span>
		{/if}
	</div>
	<img class="cover-image" src={event.image_url} alt={`Cover image for '${event.title}'`} />

	<Markdown md={event.content}>
		{#snippet a(props)}
			{@const { children, href, ...restProps } = props}
			{#if !href}
				<span>{@render children?.()}</span>
			{:else if href.match(/^https?:\/\/[^/]+\/.*\.[A-Za-z0-9]+$/)}
				<!-- Matches HTTP(S) URLs with paths that ends with a dot and some alphanumerics -->
				<DocumentLink {href} />
			{:else}
				<Link {href} {...restProps}>{@render children?.()}</Link>
			{/if}
		{/snippet}

		{#snippet img(props)}
			<img {...props} />
		{/snippet}

		{#snippet h2(props)}
			{@const { children, ...restProps } = props}
			<Heading level={2} {...restProps}>{@render children?.()}</Heading>
		{/snippet}
		{#snippet h3(props)}
			{@const { children, ...restProps } = props}
			<Heading level={3} {...restProps}>{@render children?.()}</Heading>
		{/snippet}
		{#snippet h4(props)}
			{@const { children, ...restProps } = props}
			<Heading level={4} {...restProps}>{@render children?.()}</Heading>
		{/snippet}
		{#snippet h5(props)}
			{@const { children, ...restProps } = props}
			<Heading level={5} {...restProps}>{@render children?.()}</Heading>
		{/snippet}
		{#snippet h6(props)}
			{@const { children, ...restProps } = props}
			<Heading level={6} {...restProps}>{@render children?.()}</Heading>
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
	@use "$lib/styles/size";

	.info-row {
		display: flex;
		flex-flow: row wrap;
		gap: calc(0.5 * size.$spacing-xs) size.$spacing-xs;
		margin-bottom: size.$spacing-xs;

		i {
			color: color.$article-text-lowlight;
		}
	}

	img {
		max-width: 100%;
		border-radius: size.$radius-l;
		overflow: clip;

		&.cover-image {
			width: 100%;
		}
	}

	.sponsor-logos {
		display: flex;
		flex-flow: row wrap;
		gap: size.$spacing-s;
		justify-content: center;

		img {
			width: auto;
			height: 2rem;
			border-radius: 0;
		}
	}
</style>
