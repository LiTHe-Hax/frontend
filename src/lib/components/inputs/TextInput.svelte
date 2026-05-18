<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	import InputContainer from "$lib/components/inputs/InputContainer.svelte";

	type Props = HTMLInputAttributes & {
		type: "text" | "email" | "number";
		label: string;
		error?: string;
	};
	let { type, label, error, value = $bindable(), ...restProps }: Props = $props();

	const uid = $props.id();
</script>

<InputContainer {label} forId={uid} {error}>
	<input id={uid} bind:value {type} {...restProps} />
</InputContainer>

<style lang="scss">
	@use "$lib/styles/size";

	input {
		padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
		width: 100%;
		height: 100%;
		font-size: size.$input-font;
	}
</style>
