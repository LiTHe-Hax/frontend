<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { disabled?: boolean; children?: Snippet };
	let { disabled = false, children }: Props = $props();
</script>

<button type="submit" {disabled}>
	{#if children !== undefined}
		{@render children()}
	{/if}
</button>
