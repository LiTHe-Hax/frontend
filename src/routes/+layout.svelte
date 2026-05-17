<script lang="ts">
	import { resolve } from "$app/paths";
	import type { Pathname } from "$app/types";
	import type { LayoutProps } from "./$types";

	import "$lib/styles/default.scss";
	import getAssetUrl from "$lib/api/asset";

	const { children, data }: LayoutProps = $props();

	let shouldShowNav = $state(false);
	const closeNav = () => (shouldShowNav = !shouldShowNav);
	const toggleNav = () => (shouldShowNav = !shouldShowNav);

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

{#snippet logo()}
	<img src={getAssetUrl("images/logos/header_logo.svg")} alt="LiTHe Hax logo" />
{/snippet}

{#snippet navMenu()}
	{#each navEntries as navEntry (navEntry.href)}
		<a href={resolve(navEntry.href)} onclick={closeNav}>{navEntry.label}</a>
	{/each}
{/snippet}

<header class="mobile">
	<button onclick={toggleNav} aria-label="navigation">
		<i class={["fa-solid", "fa-width-auto", "fa-bars"]}></i>
	</button>
	{@render logo()}

	<div class={["nav-backdrop", shouldShowNav && "open"]} onclick={closeNav} role="none"></div>
	<nav class={[shouldShowNav && "open"]}>{@render navMenu()}</nav>
</header>

<header class="desktop">
	{@render logo()}
	<nav>{@render navMenu()}</nav>
</header>

<main>
	{@render children()}
</main>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	header {
		background-color: color.$background;
		color: color.$primary;

		&.mobile {
			$header-height: 4rem;

			display: flex;
			flex-flow: row nowrap;
			position: sticky;
			top: 0;
			z-index: 1; // Needed since some elements in <main> mess with the stacking

			@include mixin.on-desktop {
				display: none;
			}

			button {
				@include mixin.unified-transition(100ms, ease, color);

				$padding: 1rem;

				flex-shrink: 0;
				z-index: 1;
				width: $header-height;
				height: $header-height;
				font-size: calc($header-height - 2 * $padding);
				text-align: center;
				line-height: 1;
				cursor: pointer;

				&:hover {
					color: color.$primary-highlight;
				}
			}

			img {
				margin-right: $header-height;
				padding: calc(0.5 * size.$spacing-s) 0;
				width: 100%;
				height: $header-height;
			}

			.nav-backdrop {
				@include mixin.unified-transition(100ms, ease, opacity, visibility);

				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.8);
				opacity: 0;
				visibility: hidden;

				&.open {
					opacity: 1;
					visibility: visible;
				}
			}

			nav {
				@include mixin.unified-transition(100ms, ease, transform);

				position: fixed;
				top: 0;
				bottom: 0;
				padding-top: $header-height;
				min-width: 13rem; // To not look ridiculously small
				background-color: color.$background;
				transform: translateX(-100%);

				&.open {
					transform: translateX(0%);
				}

				a {
					@include mixin.unified-transition(100ms, ease, color);

					display: block;
					border-bottom: 1px solid color.$background-border;
					padding: size.$spacing-s;
					color: color.$primary;
					font-weight: bold;
					line-height: 1;
					cursor: pointer;

					&:first-child {
						border-top: 1px solid color.$background-border;
					}

					&:hover {
						color: color.$primary-highlight;
					}
				}
			}
		}

		&.desktop {
			padding: size.$spacing-l;

			@include mixin.on-mobile {
				display: none;
			}

			img {
				display: block;
				margin-bottom: size.$spacing-s;
				width: 100%;
				height: 4rem;
			}

			nav {
				display: flex;
				flex-flow: row wrap;
				justify-content: center;
				gap: size.$spacing-s;

				a {
					@include mixin.unified-transition(100ms, ease, background-color);

					padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
					border-radius: size.$radius-l;
					background-color: color.$primary;
					color: color.$primary-text;
					font-weight: bold;
					line-height: 1;
					cursor: pointer;

					&:hover {
						background-color: color.$primary-highlight;
					}
				}
			}
		}
	}

	main {
		@include mixin.on-mobile() {
			padding: 0 size.$spacing-s size.$spacing-s;
		}

		@include mixin.on-desktop() {
			padding: 0 size.$spacing-l size.$spacing-l;
		}
	}
</style>
