<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";
	import type { InputProps } from "$lib/types";
	import ErrorTooltip from "$lib/components/inputs/ErrorTooltip.svelte";

	type Option = { label: string; value: string };
	type Props = HTMLSelectAttributes & InputProps & { options: Option[] };

	let { options, label, error, value = $bindable(), ...restProps }: Props = $props();
	const uid = $props.id();
</script>

<div class={["dropdown-input", error && "error"]}>
	{#if label}
		<label for={uid}>{label}</label>
	{/if}

	<div class="tooltip-container">
		<select id={uid} bind:value {...restProps}>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>

		{#if error}
			<ErrorTooltip>{error}</ErrorTooltip>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";

	.dropdown-input {
		display: inline-flex;
		flex-direction: column;

		.tooltip-container {
			position: relative;

			label {
				align-self: flex-start;
			}

			select {
				width: 100%;
				box-sizing: border-box;
			}
		}

		&.error select {
			border-color: color.$red;
		}
	}
</style>
