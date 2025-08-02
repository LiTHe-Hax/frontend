<script lang="ts">
	import { applyForMembership } from "$lib/api/member";
	import DropdownInput from "$lib/components/inputs/DropdownInput.svelte";
	import TextInput from "$lib/components/inputs/TextInput.svelte";
	import type { AxiosError, AxiosResponse } from "axios";

	const RESPONSE_DISPLAY_DURATION = 1000;

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let membershipType = $state("");

	let firstNameError = $state("");
	let lastNameError = $state("");
	let emailError = $state("");
	let membershipTypeError = $state("");

	let successMessage = $state("");
	let errorMessage = $state("");
	let showOverlay = $state(false);

	function onSuccess(res: AxiosResponse) {
		successMessage = `${res.status} ${res.statusText}`;
	}

	function onError(err: AxiosError) {
		if (err.response) {
			errorMessage = `${err.response.status} ${err.response.statusText}`;

			let data = err.response.data as { [key: string]: string[] };
			if ("first_name" in data) {
				let mainError = (data.first_name as string[])[0];
				firstNameError = mainError;
			}
			if ("last_name" in data) {
				let mainError = (data.last_name as string[])[0];
				lastNameError = mainError;
			}
			if ("email" in data) {
				let mainError = (data.email as string[])[0];
				emailError = mainError;
			}
			if ("is_student" in data) {
				let mainError = (data.is_student as string[])[0];
				membershipTypeError = mainError;
			}
		} else {
			errorMessage = "The server didn't respond...";
		}
	}

	function onFinally() {
		setTimeout(() => {
			showOverlay = false;
		}, RESPONSE_DISPLAY_DURATION);
	}

	function onSubmit(e: SubmitEvent) {
		e.preventDefault();

		showOverlay = true;
		successMessage = "";
		errorMessage = "";
		firstNameError = "";
		lastNameError = "";
		emailError = "";
		membershipTypeError = "";

		applyForMembership(firstName, lastName, email, membershipType === "student")
			.then(onSuccess)
			.catch(onError)
			.finally(onFinally);
	}
</script>

<form onsubmit={onSubmit}>
	<div class={["fields", showOverlay && "translucent"]}>
		<TextInput bind:value={firstName} error={firstNameError} label="First name" required />
		<TextInput bind:value={lastName} error={lastNameError} label="Last name" required />
		<TextInput bind:value={email} error={emailError} type="email" label="Email" required />
		<DropdownInput
			bind:value={membershipType}
			error={membershipTypeError}
			label="Membership type"
			required
			options={[
				{ label: "--Please select a membership type--", value: "" },
				{ label: "Student", value: "student" },
				{ label: "Non-student", value: "non-student" },
			]}
		/>
		<button type="submit" disabled={showOverlay}>Apply for membership</button>
	</div>

	<div class={["overlay", showOverlay && "show"]}>
		{#if successMessage}
			<i class="success fa-solid fa-check"></i>
			<!-- TODO: add success message here? -->
		{:else if errorMessage}
			<i class="error fa-solid fa-xmark"></i>
			<!-- TODO: add error message here? -->
		{:else}
			<i class="fa-solid fa-spinner fa-spin-pulse"></i>
		{/if}
	</div>
</form>

<style lang="scss">
	@use "$lib/styles/color.scss";

	form {
		position: relative;

		.fields {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr 1fr;
			gap: 0.8rem;
			opacity: 1;
			transition: opacity 150ms ease-out;

			> :global(:nth-child(3)),
			> :global(:nth-child(4)) {
				grid-column: 1 / span 2;
			}

			> :global(:nth-child(5)) {
				grid-column: 1 / span 2;
				align-self: flex-end;
			}

			&.translucent {
				opacity: 0.25;
			}
		}

		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 2rem;
			opacity: 0;
			visibility: hidden;
			transition:
				opacity 150ms ease-out,
				visibility 150ms ease-out;

			&.show {
				opacity: 1;
				visibility: visible;
			}

			i {
				color: color.$white;

				&.success {
					color: color.$green-2;
				}

				&.error {
					color: color.$red;
				}
			}
		}
	}
</style>
