<script lang="ts">
	import { resolve } from "$app/paths";
	import type { Snippet } from "svelte";
	import "$lib/styles/default.scss"; // This stylesheet affects the entire site.
	import logo from "$lib/images/logos/header_logo.svg";

	interface LayoutProps {
		children: Snippet;
		data: {
			canonicalHref: string;
		};
	}

	// In Runes mode, we extract our data using $props()
	let { children, data } = $props() as LayoutProps;

	let navIsOpen = $state(false);

	function toggleNav() {
		navIsOpen = !navIsOpen;
	}
</script>

<svelte:head>
	<link rel="canonical" href={data.canonicalHref} />
	<meta property="og:url" content={data.canonicalHref} />
</svelte:head>

<header class="mobile">
	<button onclick={toggleNav}>
		<i class={["fa-solid", "fa-bars"]}></i>
	</button>
	<img src={logo} alt="logo" />
	<button style="visibility: hidden;">
		<i class={["fa-solid", "fa-bars"]}></i>
	</button>

	<div
		class={"nav-backdrop " + (navIsOpen ? "open" : "closed")}
		onclick={toggleNav}
		role="none"
	></div>
	<nav class={navIsOpen ? "open" : "closed"}>
		<a href={resolve("/")} onclick={toggleNav}>Home</a>
		<a href={resolve("/new-member")} onclick={toggleNav}>Member</a>
		<a href={resolve("/events")} onclick={toggleNav}>Events</a>
	</nav>
</header>

<header class="desktop">
	<img src={logo} alt="logo" />
	<nav>
		<a href={resolve("/")}>Home</a>
		<a href={resolve("/new-member")}>Member</a>
		<a href={resolve("/events")}>Events</a>
	</nav>
</header>

<main>{@render children()}</main>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	header {
		background-color: color.$green-1;
		color: color.$green-2;

		&.mobile {
			$header-height: 4rem;

			display: grid;
			grid-template-columns: max-content 1fr max-content;
			position: sticky;
			top: 0;
			z-index: 1; // Needed since some elements in <main> mess with the stacking

			@include mixin.on-desktop() {
				display: none;
			}

			img {
				padding: 0.5rem 0;
				width: 100%;
				height: $header-height;
				box-sizing: border-box;
			}

			button {
				$padding: 1rem;

				border: 0;
				width: $header-height;
				height: $header-height;
				background-color: transparent;
				color: color.$green-2;
				font-size: calc($header-height - 2 * $padding);
				line-height: 1;
			}

			.nav-backdrop {
				@include mixin.unified-transition(150ms, ease, opacity, visibility);

				position: fixed;
				top: $header-height;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.5);

				&.open {
					opacity: 1;
					visibility: visible;
				}

				&.closed {
					opacity: 0;
					visibility: hidden;
				}
			}

			nav {
				@include mixin.unified-transition(150ms, ease, transform);

				display: flex;
				flex-direction: column;
				position: fixed;
				top: $header-height;
				bottom: 0;
				min-width: 13rem; // To not look ridiculously small
				background-color: color.$black-1;

				&.open {
					transform: translateX(0%);
				}

				&.closed {
					transform: translateX(-100%);
				}

				a {
					border-bottom: 3px solid rgba(0, 0, 0, 0.35);
					padding: 1rem;
					color: color.$green-2;
					line-height: 1;
					font-weight: bold;
					text-decoration: none;
				}
			}
		}

		&.desktop {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 2rem;

			@include mixin.on-mobile() {
				display: none;
			}

			img {
				margin-bottom: 1.5rem;
				width: 100%;
				height: 4rem;
			}

			nav {
				display: flex;
				flex-direction: row;
				gap: 1rem;
				justify-content: center;

				a {
					@include mixin.unified-transition(150ms, ease, background-color, color, transform);

					padding: 0.5rem 1rem;
					border: 0.15rem solid color.$green-2;
					border-radius: 0.5rem;
					background-color: color.$green-2;
					color: color.$green-1;
					line-height: 1;
					font-weight: bold;
					text-decoration: none;

					&:hover {
						background-color: color.$green-1;
						color: color.$green-2;
						transform: scale(1.1);
					}
				}
			}
		}
	}

	main {
		width: 100vw;
	}
</style>
