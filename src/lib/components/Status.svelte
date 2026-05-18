<script lang="ts">
	import type { StatusType } from "$lib/types";

	type Props = {
		message?: string;
		type?: StatusType;
	};
	const { message, type = "loading" }: Props = $props();

	const iconClasses = $derived.by(() => {
		switch (type) {
			case "loading":
				return ["fa-spinner", "fa-spin-pulse"];
			case "error":
				return ["fa-xmark"];
			case "success":
				return ["fa-check"];
			default:
				return ["fa-question"];
		}
	});
</script>

<div class={["status", type]}>
	<i class={["fa-solid", ...iconClasses]}></i>
	{#if message}
		<div class="messsage">{message}</div>
	{/if}
</div>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/size";

	.status {
		display: flex;
		flex-flow: column nowrap;
		gap: size.$spacing-xs;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		text-align: center;

		i {
			font-size: 2em;
		}

		&.error i {
			color: color.$error;
		}

		&.success i {
			color: color.$success;
		}
	}
</style>
