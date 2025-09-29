<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";

	type LabelProps = HTMLLabelAttributes;

	const { children, ...restProps }: LabelProps = $props();
</script>

<label {...restProps}>{@render children?.()}</label>

<style lang="scss">
	@use "$lib/styles/color";

	label {
		color: color.$green-2;
	}
</style>
