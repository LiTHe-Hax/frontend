<script lang="ts">
	import type { Snippet } from "svelte";
	import Heading from "./Heading.svelte";
	import Button from "./inputs/Button.svelte";

	type Layout = "normal" | "thin";
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
		color: color.$green-2;
		background-color: color.$gray-2;
		border: 0;
		font-family: "Fira Sans";
		font-size: 1em;
		display: block;
		width: 100%;
		text-align: left;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		&:hover {
			background-color: color.$gray-3;
		}
		i.expanded {
			transform: rotate(90deg);
		}
		i {
			transition: transform ease 100ms;
		}
		transition: background-color ease 100ms;
	}
	div.content {
		padding-left: 0.5rem;
		height: 0;
		&.expanded {
			height: auto;
		}
		transition: height ease 100ms;
		overflow: hidden;
	}
	div.collapsable-section {
		margin: 1rem 0;
	}
</style>
