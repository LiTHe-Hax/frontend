<script lang="ts">
	type HeadingProps = {
		content: string;
		level: 1 | 2 | 3 | 4 | 5 | 6;
	};

	const { content, level }: HeadingProps = $props();
</script>

{#if level === 1}
	<h1>{content}</h1>
{:else if level === 2}
	<h2>{content}</h2>
{:else if level === 3}
	<h3>{content}</h3>
{:else if level === 4}
	<h4>{content}</h4>
{:else if level === 5}
	<h5>{content}</h5>
{:else}
	<h6>{content}</h6>
{/if}

<style lang="scss">
	@use "$lib/styles/color";

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: color.$green-2;
	}
</style>
