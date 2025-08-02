<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";

	type Option = {
		value: string;
		label: string;
	};

	type Props = HTMLSelectAttributes & {
		options: Option[] | { [label: string]: Option[] };
		label?: string;
		error?: string;
	};

	const uid = $props.id();
	let { options, label, error, value = $bindable(), ...restProps }: Props = $props();
</script>

{#snippet optionElements(options: Option[])}
	{#each options as option (option.label)}
		<option value={option.value}>{option.label}</option>
	{/each}
{/snippet}

<span class={["dropdown-input", error && "has-error"]}>
	{#if label}
		<label for={uid}>{label}</label>
	{/if}

	<span class="input-container">
		<select bind:value id={uid} {...restProps}>
			{#if Array.isArray(options)}
				{@render optionElements(options)}
			{:else}
				{#each Object.entries(options) as [label, innerOptions] (label)}
					<optgroup {label}>
						{@render optionElements(innerOptions)}
					</optgroup>
				{/each}
			{/if}
		</select>

		{#if error}
			<span class="error-tooltip">{error}</span>
		{/if}
	</span>
</span>

<style lang="scss">
	@use "$lib/styles/color.scss";

	// TODO: this rule and the one in TextInput is identical, can they be combined in some way?
	.dropdown-input {
		display: inline-flex;
		flex-direction: column;

		.input-container {
			position: relative;

			select {
				width: 100%;
			}

			.error-tooltip {
				$arrow-size: 0.5rem;

				position: absolute;
				bottom: calc(100% + $arrow-size);
				right: 0;
				padding: 0.2rem 0.4rem;
				border: 1px solid color.$red;
				border-radius: 0.25rem;
				background: color.$black-2;
				color: color.$white;
				opacity: 0;
				visibility: hidden;
				transition:
					opacity 100ms ease-out,
					visibility 100ms ease-out;

				&::after {
					content: "";
					position: absolute;
					top: 100%;
					left: 25%;
					border: $arrow-size solid color.$black-2;
					border-right-color: transparent;
					border-bottom-color: transparent;
					border-left-color: transparent;
				}

				&::before {
					content: "";
					position: absolute;
					top: calc(100% + 1px);
					left: 25%;
					border: $arrow-size solid color.$red;
					border-right-color: transparent;
					border-bottom-color: transparent;
					border-left-color: transparent;
				}
			}
		}

		&:hover .error-tooltip,
		.input-container select:focus ~ .error-tooltip {
			opacity: 1;
			visibility: visible;
		}

		&.has-error {
			label {
				color: color.$red;
			}

			select {
				border-color: color.$red;
			}
		}
	}
</style>
