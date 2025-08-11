<script lang="ts">
	import type { Snippet } from "svelte";

	type InputType = "text" | "email" | "select" | "submit";
	type Props = {
		name: string;
		label: string;
		type: InputType;
		required?: boolean;
		error?: string;
		children?: Snippet;
	};
	let { name, label, type, required = false, error, children }: Props = $props();
</script>

<div class={`field${error !== undefined ? " error" : ""}`}>
	<label for={name}>{label}</label>

	<div class="input-container">
		{#if type === "text"}
			<input id={name} {name} type="text" {required} />
		{:else if type === "email"}
			<input id={name} {name} type="email" {required} />
		{:else if type === "select"}
			<select id={name} {name} {required}>
				{#if children !== undefined}
					{@render children()}
				{/if}
			</select>
		{:else}
			<span>UNSUPPORTED INPUT FIELD</span>
		{/if}

		{#if error !== undefined}
			<div class="error-tooltip">
				<span>{error}</span>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	.field {
		display: inline-flex;
		flex-direction: column;

		label {
			align-self: flex-start;
		}

		.input-container {
			position: relative;

			input,
			select {
				width: 100%;
				box-sizing: border-box;
			}

			.error-tooltip {
				position: absolute;
				bottom: calc(100% + 8px);
				right: 0;
				padding: 0.2rem 0.4rem;
				border: 1px solid color.$red;
				border-radius: 0.25rem;
				background-color: color.$black-2;
				color: color.$white;
				opacity: 0;
				visibility: hidden;
				transition: all 100ms ease-out;

				&::after {
					content: "";
					position: absolute;
					top: 100%;
					left: 25%;
					border: 8px solid color.$black-2;
					border-right-color: transparent;
					border-bottom-color: transparent;
					border-left-color: transparent;
				}

				&::before {
					content: "";
					position: absolute;
					top: calc(100% + 1px);
					left: 25%;
					border: 8px solid color.$red;
					border-right-color: transparent;
					border-bottom-color: transparent;
					border-left-color: transparent;
				}
			}

			&:hover .error-tooltip,
			input:focus ~ .error-tooltip,
			select:focus ~ .error-tooltip {
				opacity: 1;
				visibility: visible;
			}
		}

		&.error {
			input,
			select {
				border-color: color.$red;
			}
		}
	}
</style>
