<hr />

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/size";

	hr {
		margin: size.$spacing-s 0;
		height: size.$widget-border;
		border-radius: calc(0.5 * size.$widget-border);
		background-color: color.$widget;
	}
</style>
