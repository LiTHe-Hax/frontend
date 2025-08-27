<script lang="ts">
	type Props = { link: string };

	const { link }: Props = $props();

	const label = $derived.by(() => {
		const splitLink = link.split("/");
		return splitLink[splitLink.length - 1];
	});
	const icon = "📄"; // TODO: switch to SVG?
</script>

<span>
	<a href={link}>
		<span class="icon">{icon}</span>
		<span class="label">{label}</span>
	</a>
</span>

<style lang="scss">
	@use "$lib/styles/color";

	a {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		gap: 0.2ch;
		color: color.$white;
		text-decoration: none;

		.label {
			padding: 0.2em;
			border-radius: 0.2rem;
			background-color: color.$gray-3;
		}
	}
</style>
