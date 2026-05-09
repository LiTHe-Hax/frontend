<script lang="ts">
	import { resolve } from "$app/paths";
	import type { Pathname } from "$app/types";
	import type { LayoutProps } from "./$types";

	import "$lib/styles/default.scss";
	import getAssetUrl from "$lib/api/asset";

	const { children, data }: LayoutProps = $props();

	let shouldShowNav = $state(false);
	const toggleNav = () => (shouldShowNav = !shouldShowNav);
	const closeNav = () => (shouldShowNav = !shouldShowNav);

	type NavEntry = { href: Pathname; label: string };
	const navEntries: NavEntry[] = [
		{ href: "/", label: "Home" },
		{ href: "/new-member", label: "Member" },
		{ href: "/events", label: "Upcoming Events" },
		{ href: "/events/previous", label: "Previous Events" },
		{ href: "/resources", label: "Hacking Resources" },
		// TODO(72): Redesign nav links to include dropdowns
	];
</script>

<svelte:head>
	<link rel="canonical" href={data.canonicalHref} />
	<meta property="og:url" content={data.canonicalHref} />
</svelte:head>

<header class="mobile">
	<button onclick={toggleNav} aria-label="navigation">
		<i class={["fa-solid", "fa-bars"]}></i>
	</button>
	<img src={getAssetUrl("images/logos/header_logo.svg")} alt="LiTHe Hax logo" />
	<button style:visibility="hidden" aria-label="navigation">
		<i class={["fa-solid", "fa-bars"]}></i>
	</button>

	<div class={["nav-backdrop", shouldShowNav && "open"]} onclick={closeNav} role="none"></div>
	<nav class={[shouldShowNav && "open"]}>
		{#each navEntries as navEntry (navEntry.href)}
			<a href={resolve(navEntry.href)} onclick={closeNav}>{navEntry.label}</a>
		{/each}
	</nav>
</header>

<header class="desktop">
	<img src={getAssetUrl("images/logos/header_logo.svg")} alt="LiTHe Hax logo" />
	<nav>
		{#each navEntries as navEntry (navEntry.href)}
			<a href={resolve(navEntry.href)}>{navEntry.label}</a>
		{/each}
	</nav>
</header>

<main>
	{@render children()}
</main>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	header {
		background-color: color.$black-1;
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
				box-shadow: unset;
				font-size: calc($header-height - 2 * $padding);
				line-height: 1;
				transform: unset;
				transition: unset;
			}

			.nav-backdrop {
				@include mixin.unified-transition(150ms, ease, opacity, visibility);

				position: fixed;
				top: $header-height;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.5);
				opacity: 0;
				visibility: hidden;

				&.open {
					opacity: 1;
					visibility: visible;
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
				transform: translateX(-100%);

				&.open {
					transform: translateX(0%);
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
			padding: 3rem;

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
				justify-content: center;
				gap: 1rem;

				a {
					@include mixin.unified-transition(150ms, ease, background-color, color, transform);

					border: 0.15rem solid color.$green-2;
					padding: 0.5rem 1rem;
					border-radius: 0.5rem;
					background-color: color.$green-2;
					color: color.$black-1;
					line-height: 1;
					font-weight: bold;
					text-decoration: none;

					&:hover {
						background-color: color.$black-1;
						color: color.$green-2;
						transform: scale(1.1);
					}
				}
			}
		}
	}

	main {
		@include mixin.on-mobile() {
			padding: 0 1rem 1rem;
		}

		@include mixin.on-desktop() {
			padding: 0 3rem 3rem;
		}
	}
</style>
