<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { InputProps } from "$lib/types";
	import ErrorTooltip from "$lib/components/inputs/ErrorTooltip.svelte";
	import Label from "./Label.svelte";

	type AllowedType = "text" | "email" | "number";
	type Props = HTMLInputAttributes & InputProps & { type: AllowedType };

	let { type, label, error, value = $bindable(), ...restProps }: Props = $props();
	const uid = $props.id();
</script>

<div class={["text-input", error && "error"]}>
	{#if label}
		<Label for={uid}>{label}</Label>
	{/if}

	<div class="tooltip-container">
		<input id={uid} bind:value {type} {...restProps} />

		{#if error}
			<ErrorTooltip>{error}</ErrorTooltip>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";

	.text-input {
		display: inline-flex;
		flex-direction: column;

		label {
			align-self: flex-start;
		}

		.tooltip-container {
			position: relative;

			input {
				width: 100%;
				box-sizing: border-box;
			}
		}

		&.error input {
			border-color: color.$red;
		}
	}
</style>
