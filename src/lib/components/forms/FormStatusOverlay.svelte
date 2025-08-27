<script lang="ts">
	type Props = { isSubmitting: boolean; errorMessage: string; successMessage: string };

	const { isSubmitting, errorMessage, successMessage }: Props = $props();

	const MILLISECONDS_BEFORE_HIDE = 2000;
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
		<i class="fa-solid fa-spinner fa-spin-pulse"></i>
	{:else if errorMessage}
		<i class="fa-solid fa-xmark"></i>
		<span>{errorMessage}</span>
	{:else}
		<i class="fa-solid fa-check"></i>
		<span>{successMessage}</span>
	{/if}
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	.form-status-overlay {
		@include mixin.unified-transition(150ms, ease, opacity, visibility);

		position: absolute;
		top: -0.25rem;
		left: -0.25rem;
		bottom: -0.25rem;
		right: -0.25rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(color.$black-2, 0.7);
		opacity: 0;
		visibility: hidden;

		&.show {
			opacity: 1;
			visibility: visible;
		}

		i {
			font-size: 2em;

			&.fa-xmark {
				color: color.$red;
			}

			&.fa-check {
				color: color.$green-2;
			}
		}
	}
</style>
