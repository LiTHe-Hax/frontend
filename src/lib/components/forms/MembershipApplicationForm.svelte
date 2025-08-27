<script lang="ts">
	import type { AxiosError } from "axios";

	import { createMember } from "$lib/api/member";

	import TextInput from "../inputs/TextInput.svelte";
	import DropdownInput from "../inputs/DropdownInput.svelte";

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let membershipType = $state("");

	let firstNameError = $state("");
	let lastNameError = $state("");
	let emailError = $state("");
	let membershipTypeError = $state("");

	let isSubmitting = $state(false);
	let isSuccessful = $state(false);
	let errorMessage = $state("");

	function requestMembership(e: SubmitEvent) {
		e.preventDefault();
		const isStudent = membershipType === "student";

		isSubmitting = true;
		isSuccessful = false;
		errorMessage = "";
		firstNameError = "";
		lastNameError = "";
		emailError = "";
		membershipTypeError = "";

		createMember(firstName, lastName, email, isStudent)
			.then(() => {
				isSuccessful = true;
			})
			.catch((err: AxiosError) => {
				if (err.response !== undefined) {
					errorMessage = err.response.status.toString() + " " + err.response.statusText;
					let data = err.response.data as object;
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
			})
			.finally(() => {
				isSubmitting = false;
			});
	}
</script>

<form onsubmit={requestMembership}>
	<TextInput
		type="text"
		required
		bind:value={firstName}
		label="First name"
		error={firstNameError}
	/>
	<TextInput type="text" required bind:value={lastName} label="Last name" error={lastNameError} />
	<TextInput type="email" required bind:value={email} label="Email" error={emailError} />
	<DropdownInput
		options={[
			{ value: "", label: "--Please select a membership type--" },
			{ value: "student", label: "Student" },
			{ value: "non-student", label: "Non-student" },
		]}
		required
		bind:value={membershipType}
		label="Membership Type"
		error={membershipTypeError}
	/>
	<button type="submit" disabled={isSubmitting}>Apply for membership</button>
</form>

{#if isSuccessful}
	<p class="success-msg">Successfully applied for a membership!</p>
{:else if errorMessage !== ""}
	<p class="error-msg">{errorMessage}</p>
{/if}

<style lang="scss">
	@use "$lib/styles/color";

	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		gap: 0.8rem;

		> :global(:nth-child(3)),
		> :global(:nth-child(4)) {
			grid-column: 1 / span 2;
		}

		> :global(:nth-child(5)) {
			grid-column: 1 / span 2;
			align-self: flex-end;
		}
	}

	.success-msg {
		color: color.$green-2;
		text-align: center;
	}

	.error-msg {
		color: color.$red;
		text-align: center;
	}
</style>
