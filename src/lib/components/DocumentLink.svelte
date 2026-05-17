<script lang="ts">
	type Props = { href: string };
	const { href }: Props = $props();

	const label = $derived.by(() => {
		const splitHref = href.split("/");
		return splitHref[splitHref.length - 1];
	});

	const iconClass = $derived.by(() => {
		const splitHref = href.split(".");
		const fileExtension = splitHref[splitHref.length - 1];
		switch (fileExtension) {
			case "pdf":
				return "fa-file-pdf";
			case "pptx":
				return "fa-file-powerpoint";
			case "jpg":
			case "png":
			case "webp":
			case "gif":
				return "fa-file-image";
			case "mp4":
			case "webm":
				return "fa-file-video";
			case "mp3":
				return "fa-file-audio";
			case "zip":
			case "gz":
			case "7z":
			case "rar":
				return "fa-file-zipper";
			default:
				return "fa-file";
		}
	});
</script>

<a {href}>
	<i class={["fa-solid", "fa-width-auto", iconClass]}></i>
	{label}
</a>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	a {
		@include mixin.unified-transition(100ms, ease, background-color);

		display: inline-block;
		padding: size.$spacing-xxs;
		max-width: 100%;
		border-radius: size.$radius-s;
		background-color: color.$widget;
		color: color.$widget-text;
		overflow: clip;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		line-height: 0;
		cursor: pointer;

		&:hover {
			background-color: color.$widget-highlight;
		}
	}
</style>
