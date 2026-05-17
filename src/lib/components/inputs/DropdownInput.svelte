<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";

	import InputContainer from "$lib/components/inputs/InputContainer.svelte";

	type Option = {
		label: string;
		value: string;
	};
	type Props = HTMLSelectAttributes & {
		options: Option[];
		label: string;
		error?: string;
	};
	let { options, label, error, value = $bindable(), ...restProps }: Props = $props();

	const uid = $props.id();
</script>

<InputContainer {label} forId={uid} {error}>
	<select id={uid} bind:value {...restProps}>
		{#each options as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</InputContainer>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/size";

	select {
		padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
		width: 100%;
		height: 100%;
		font-size: size.$input-font;

		appearance: auto;
		-moz-appearance: menulist; /* Firefox */

		// Necessary for the dropdown to be dark on Chromium
		border-radius: size.$radius-l;
		background-color: color.$article;
	}
</style>
