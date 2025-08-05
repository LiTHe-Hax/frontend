<script lang="ts">
	import placeholderImage from "$lib/images/contacts/placeholder.png";

	type Props = {
		fullName: string;
		hackerTag: string;
		role: string;
		email?: string;
		image?: string;
	};
	let { fullName, hackerTag, role, email, image }: Props = $props();
</script>

<article>
	<img src={image ? image : placeholderImage} alt={fullName} />
	<div class="info">
		<span class="name">{fullName}</span>
		<span class="hacker-tag">@{hackerTag}</span>
		<span class="role">{role}</span>
		{#if email}
			<a class="email" href={`mailto:${email}`}>{email}</a>
		{:else}
			<span class="email">(email coming soon)</span>
		{/if}
	</div>
</article>

<style lang="scss">
	@use "$lib/styles/color.scss";

	article {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		img {
			$size: 8rem;

			width: $size;
			height: $size;
			border-radius: 50%;
		}

		.info {
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.name,
			.hacker-tag,
			.role,
			.email {
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.name {
				color: color.$green-2;
				font-size: 1.175em;
				font-weight: bold;
			}

			.hacker-tag {
				margin-bottom: 1rem;
				color: color.$gray-5;
			}

			.email {
				align-self: start; // Clamps clickable area of link
				text-wrap: nowrap; // Wrapping looks weird if no email is provided
			}
		}
	}
</style>
