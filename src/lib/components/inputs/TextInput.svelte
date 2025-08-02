<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = HTMLInputAttributes & {
		type?: "text" | "email";
		label?: string;
		error?: string;
	};

	const uid = $props.id();
	let { type, label, error, value = $bindable(), ...restProps }: Props = $props();
</script>

<span class={["text-input", error && "has-error"]}>
	{#if label}
		<label for={uid}>{label}</label>
	{/if}

	<span class="input-container">
		<input id={uid} {type} bind:value {...restProps} />

		{#if error}
			<span class="error-tooltip">{error}</span>
		{/if}
	</span>
</span>

<style lang="scss">
	@use "$lib/styles/color.scss";

	// TODO: this rule and the one in Dropdown is identical, can they be combined in some way?
	.text-input {
		display: inline-flex;
		flex-direction: column;

		.input-container {
			position: relative;

			input {
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
		.input-container input:focus ~ .error-tooltip {
			opacity: 1;
			visibility: visible;
		}

		&.has-error {
			label {
				color: color.$red;
			}

			input {
				border-color: color.$red;
			}
		}
	}
</style>
