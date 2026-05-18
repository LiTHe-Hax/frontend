<script lang="ts">
	import type { StatusType } from "$lib/types";
	import Status from "../Status.svelte";

	import Overlay from "./Overlay.svelte";

	type Props = {
		isDisabled?: boolean;
		message?: string;
		type?: StatusType;
	};
	const { isDisabled, message, type = "loading" }: Props = $props();
</script>

<Overlay {isDisabled}>
	<Status {message} {type} />
</Overlay>
