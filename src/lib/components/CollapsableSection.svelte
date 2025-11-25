<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = { children: Snippet; title: string };

	const { children, title }: Props = $props();
	let isCollapsed = $state(true);
	function toggleCollapsed() {
		isCollapsed = !isCollapsed;
	}
</script>

<div class="collapsable-section">
	<button onclick={toggleCollapsed}>
		<i class={["fa-solid", "fa-caret-right", !isCollapsed && "expanded"]}></i>
		{title}
	</button>
	<div class={["content", !isCollapsed && "expanded"]}>
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use "$lib/styles/color";

	button {
		display: block;
		border: 0;
		padding: 0.5rem 1rem;
		width: 100%;
		border-radius: 0.5rem;
		background-color: color.$gray-2;
		color: color.$green-2;
		font-family: "Fira Sans";
		font-size: 1em;
		text-align: left;
		cursor: pointer;
		transition: background-color ease 100ms;

		&:hover {
			background-color: color.$gray-3;
		}

		i {
			transition: transform ease 100ms;

			&.expanded {
				transform: rotate(90deg);
			}
		}
	}

	div.content {
		padding-left: 0.5rem;
		height: 0;
		overflow: hidden;
		transition: height ease 100ms;

		&.expanded {
			height: auto;
		}
	}

	div.collapsable-section {
		margin: 1rem 0;
	}
</style>
