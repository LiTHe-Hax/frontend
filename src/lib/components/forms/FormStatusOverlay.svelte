<script lang="ts">
	type Props = {
		isSubmitting: boolean;
		errorMessage: string;
		successMessage: string;
	};
	const { isSubmitting, errorMessage, successMessage }: Props = $props();

	const MILLISECONDS_BEFORE_HIDE = 4000;
	let showOverlay = $state(isSubmitting);

	$effect(() => {
		if (isSubmitting) {
			showOverlay = true;
		} else if (isSubmitting !== showOverlay) {
			setTimeout(() => (showOverlay = false), MILLISECONDS_BEFORE_HIDE);
		}
	});
</script>

<div class={["form-status-overlay", showOverlay && "show"]}>
	{#if isSubmitting}
		<i class={["fa-solid", "fa-spinner", "fa-spin-pulse"]}></i>
	{:else if errorMessage}
		<i class={["fa-solid", "fa-xmark"]}></i>
		<span>{errorMessage}</span>
	{:else}
		<i class={["fa-solid", "fa-check"]}></i>
		<span>{successMessage}</span>
	{/if}
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	.form-status-overlay {
		@include mixin.unified-transition(100ms, ease, opacity, visibility);

		position: absolute;
		top: -0.5em;
		left: 0;
		bottom: -0.5em;
		right: 0;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		gap: size.$spacing-xs;
		background-color: rgba(color.$article, 0.8);
		opacity: 0;
		visibility: hidden;

		&.show {
			opacity: 1;
			visibility: visible;
		}

		i {
			font-size: 2em;

			&.fa-xmark {
				color: color.$error;
			}

			&.fa-check {
				color: color.$success;
			}
		}
	}
</style>
