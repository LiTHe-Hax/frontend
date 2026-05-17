<script lang="ts">
	import { createMember } from "$lib/api/member";
	import type { JsonObject } from "$lib/api/request";

	import type { StatusType } from "$lib/types";

	import TextInput from "../inputs/TextInput.svelte";
	import DropdownInput from "../inputs/DropdownInput.svelte";
	import Button from "../inputs/Button.svelte";
	import Overlayed from "../overlays/Overlayed.svelte";
	import StatusOverlay from "../overlays/StatusOverlay.svelte";

	const STATUS_SHOW_DURATION = 4000;

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let membershipType = $state("");

	let firstNameError = $state("");
	let lastNameError = $state("");
	let emailError = $state("");
	let membershipTypeError = $state("");

	let showStatusOverlay = $state(false);
	let statusMessage = $state("");
	let statusType = $state<StatusType>("loading");

	function requestMembership(e: SubmitEvent) {
		e.preventDefault();

		showStatusOverlay = true;
		statusMessage = "";
		statusType = "loading";

		firstNameError = "";
		lastNameError = "";
		emailError = "";
		membershipTypeError = "";

		const isStudent = membershipType === "student";
		createMember(firstName, lastName, email, isStudent)
			.then((response) => {
				if (response.isSuccessful) {
					statusMessage = "You applied for a membership!";
					statusType = "success";
				} else {
					statusMessage = `${response.status} ${response.statusText}`;
					statusType = "error";

					const data = response.data as JsonObject;
					if ("first_name" in data) {
						firstNameError = (data.first_name as string[])[0];
					}
					if ("last_name" in data) {
						lastNameError = (data.last_name as string[])[0];
					}
					if ("email" in data) {
						// The only server-side error that occurs for emails is that it's already used
						statusMessage = "A member has already applied with that email!";
						emailError = (data.email as string[])[0];
					}
					if ("is_student" in data) {
						membershipTypeError = (data.is_student as string[])[0];
					}
				}
			})
			.catch(() => {
				statusMessage = "Could not connect to the server. Try again later.";
				statusType = "error";
			})
			.finally(() => {
				setTimeout(() => (showStatusOverlay = false), STATUS_SHOW_DURATION);
			});
	}
</script>

<div style:position="relative">
	<Overlayed isDisabled={!showStatusOverlay}>
		<form onsubmit={requestMembership}>
			<TextInput
				type="text"
				required
				bind:value={firstName}
				label="First name"
				error={firstNameError}
			/>
			<TextInput
				type="text"
				required
				bind:value={lastName}
				label="Last name"
				error={lastNameError}
			/>
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
			<Button type="submit" disabled={showStatusOverlay}>Apply for membership</Button>
		</form>
	</Overlayed>
	<StatusOverlay isDisabled={!showStatusOverlay} message={statusMessage} type={statusType} />
</div>

<style lang="scss">
	@use "$lib/styles/size";
	@use "$lib/styles/mixin";

	form {
		gap: size.$spacing-s;

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
