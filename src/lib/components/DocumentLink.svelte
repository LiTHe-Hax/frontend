<script lang="ts">
	type Props = { href: string };
	let { href }: Props = $props();

	function deriveLabel() {
		let splitHref = href.split("/");
		return splitHref[splitHref.length - 1];
	}

	function deriveIconClass() {
		let splitHref = href.split(".");
		let extension = splitHref[splitHref.length - 1];
		switch (extension) {
			case "pdf":
				return "fa-file-pdf";
			case "pptx":
				return "fa-file-powerpoint";
			case "7z":
			case "zip":
				return "fa-file-zipper";
			default:
				return "fa-file";
		}
	}

	const label = $derived.by(deriveLabel);
	const iconClass = $derived.by(deriveIconClass);
</script>

<a {href}>
	<i class={["fa-solid", iconClass]}></i>
	{label}
</a>

<style lang="scss">
	@use "$lib/styles/color.scss";

	a {
		display: inline-block;
		padding: 0.2em;
		border-radius: 0.2rem;
		background: color.$gray-3;
		color: color.$white;
		word-break: break-all;
		transition: background 150ms ease-out;

		&:hover {
			background: color.$gray-4;
		}
	}
</style>
