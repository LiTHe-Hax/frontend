<script lang="ts">
	import { createMember } from "$lib/api/member";
	import type { JsonObject } from "$lib/api/request";

	import TextInput from "../inputs/TextInput.svelte";
	import DropdownInput from "../inputs/DropdownInput.svelte";
	import FormStatusOverlay from "./FormStatusOverlay.svelte";
	import Button from "../inputs/Button.svelte";

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let membershipType = $state("");

	let firstNameError = $state("");
	let lastNameError = $state("");
	let emailError = $state("");
	let membershipTypeError = $state("");

	let isSubmitting = $state(false);
	let errorMessage = $state("");

	function requestMembership(e: SubmitEvent) {
		e.preventDefault();
		const isStudent = membershipType === "student";

		isSubmitting = true;
		errorMessage = "";
		firstNameError = "";
		lastNameError = "";
		emailError = "";
		membershipTypeError = "";

		createMember(firstName, lastName, email, isStudent)
			.then((response) => {
				if (!response.isSuccessful) {
					errorMessage = `${response.status} ${response.statusText}`;

					const data = response.data as JsonObject;
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
						// The only server-side error that occurs for emails is that it's already used
						errorMessage = "A member has already applied with that email!";
					}
					if ("is_student" in data) {
						let mainError = (data.is_student as string[])[0];
						membershipTypeError = mainError;
					}
				}
			})
			.catch(() => {
				errorMessage = "Couldn't connect to the server...";
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
	<Button type="submit" disabled={isSubmitting}>Apply for membership</Button>
	<FormStatusOverlay {isSubmitting} {errorMessage} successMessage="Applied for a membership" />
</form>

<style lang="scss">
	@use "$lib/styles/size";
	@use "$lib/styles/mixin";

	form {
		gap: size.$spacing-s;
		position: relative; // Need to position overlay correctly

		@include mixin.on-mobile {
			display: flex;
			flex-flow: column nowrap;
		}

		@include mixin.on-desktop {
			display: grid;
			grid-template-columns: 1fr 1fr;

			> :global(:nth-child(3)),
			> :global(:nth-child(4)),
			> :global(:nth-child(5)) {
				grid-column: 1 / span 2;
			}
		}
	}
</style>
