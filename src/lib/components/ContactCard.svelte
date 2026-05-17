<script lang="ts">
	import getAssetUrl from "$lib/api/asset";
	import Link from "$lib/components/Link.svelte";

	type Props = {
		fullName: string;
		hackerTag?: string;
		position: string;
		email?: string;
		imageHref?: string;
	};
	const { fullName, hackerTag, position, email, imageHref }: Props = $props();

	const effectiveimageHref = $derived(
		imageHref ? imageHref : getAssetUrl("images/contacts/placeholder.png"),
	);
</script>

<div>
	<img src={effectiveimageHref} alt={fullName} />
	<span class="name">{fullName}</span>
	<span class="position">{position}</span>
	{#if hackerTag}
		<span class="hacker-tag">@{hackerTag}</span>
	{/if}
	{#if email}
		<span class="email">
			<Link href={`mailto:${email}`}>{email}</Link>
		</span>
	{/if}
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/size";

	div {
		display: grid;
		grid-template-columns: 8rem 1fr;
		grid-template-rows: max-content max-content max-content 1fr max-content;
		column-gap: size.$spacing-xs;

		img {
			grid-column: 1;
			grid-row: 1 / -1;
			width: 100%;
			aspect-ratio: 1 / 1;
			border-radius: size.$radius-l;
			overflow: hidden;
		}

		span {
			overflow: hidden;
			text-overflow: ellipsis;

			&:first-of-type {
				margin-top: size.$radius-l;
			}

			&:last-of-type {
				margin-bottom: size.$radius-l;
			}
		}

		.name {
			color: color.$primary;
			font-size: 1.175em;
			font-weight: bold;
		}

		.hacker-tag {
			color: color.$article-text-lowlight;
		}

		.email {
			grid-row: 5;
			color: color.$primary;
		}
	}
</style>
