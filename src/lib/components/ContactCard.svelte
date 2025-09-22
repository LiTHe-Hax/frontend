<script lang="ts">
	import getAssetUrl from "$lib/api/asset";

	type Props = {
		fullName: string;
		hackerTag?: string;
		position: string;
		email?: string;
		image?: string;
	};

	const { fullName, hackerTag, position, email, image }: Props = $props();
	const effectiveImage = $derived(image ? image : getAssetUrl("images/contacts/placeholder.png"));
</script>

<div class="contact-card">
	<img src={effectiveImage} alt={fullName} />
	<div class="info">
		<span class="name">
			{fullName}
			{#if hackerTag}@{hackerTag}{/if}
		</span>
		<span class="position">{position}</span>
		{#if email !== undefined}
			<a class="email" href={`mailto:${email}`}>{email}</a>
		{:else}
			<span class="email">(mail coming soon)</span>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";

	.contact-card {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;

		img {
			width: 8rem;
			height: 8rem;
			border-radius: 50%;
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			min-width: 0; // Makes info box take only remaining space when small

			.name {
				color: color.$green-2;
				font-size: 1.175em;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.position {
				margin-bottom: 1em;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.email {
				width: 100%; // Clamps the boundaries of the link
				align-self: flex-start;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
