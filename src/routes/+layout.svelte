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

	type NavEntry = { href: Pathname; label: string; subentries?: NavEntry[] };
	const topLevelNavEntries: NavEntry[] = [
		{ href: "/", label: "Home" },
		{ href: "/new-member", label: "Member" },
		{
			href: "/events",
			label: "Events",
			subentries: [
				{ href: "/events", label: "Upcoming Events" },
				{ href: "/events/previous", label: "Previous Events" },
			],
		},
		{ href: "/resources", label: "Hacking Resources" },
	];
</script>

<svelte:head>
	<link rel="canonical" href={data.canonicalHref} />
	<meta property="og:url" content={data.canonicalHref} />
</svelte:head>

{#snippet logo()}
	<img src={getAssetUrl("images/logos/header_logo.svg")} alt="LiTHe Hax logo" />
{/snippet}

{#snippet navMenu(entries: NavEntry[], isSubMenu?: boolean)}
	<menu>
		{#each entries as entry (entry.label)}
			<li>
				<a href={resolve(entry.href)} onclick={closeNav}>
					{entry.label}
					{#if entry.subentries}
						{@const iconClass = isSubMenu ? "fa-caret-right" : "fa-caret-down"}
						<i class={["fa-solid", "fa-width-auto", iconClass]}></i>
					{/if}
				</a>
				{#if entry.subentries}
					{@render navMenu(entry.subentries, true)}
				{/if}
			</li>
		{/each}
	</menu>
{/snippet}

<header class="mobile">
	<button onclick={toggleNav} aria-label="navigation">
		<i class={["fa-solid", "fa-width-auto", "fa-bars"]}></i>
	</button>
	{@render logo()}

	<div class={["nav-backdrop", shouldShowNav && "open"]} onclick={closeNav} role="none"></div>
	<nav class={[shouldShowNav && "open"]}>{@render navMenu(topLevelNavEntries)}</nav>
</header>

<header class="desktop">
	{@render logo()}
	<nav>{@render navMenu(topLevelNavEntries)}</nav>
</header>

<main>
	{@render children()}
</main>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";
	@use "$lib/styles/size";

	header {
		position: relative;
		z-index: 1; // Needed since some elements in <main> mess with the stacking
		background-color: color.$background;
		color: color.$primary;

		&.mobile {
			$header-height: 4rem;

			display: grid;
			grid-template-columns: $header-height 1fr $header-height;
			position: sticky;
			top: 0;

			@include mixin.on-desktop {
				display: none;
			}

			button {
				@include mixin.unified-transition(100ms, ease, color);

				$padding: 1rem;

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

				> menu {
					> li {
						border-bottom: size.$widget-border solid color.$background-border;

						&:first-child {
							border-top: size.$widget-border solid color.$background-border;
						}
					}

					menu li {
						border-top: size.$widget-border solid color.$background-border;
						border-left: size.$spacing-xs solid color.$background-border;
					}

					a {
						@include mixin.unified-transition(100ms, ease, color);

						display: block;
						padding: size.$spacing-s;
						color: color.$primary;
						font-weight: bold;
						line-height: 1;
						cursor: pointer;

						&:hover {
							color: color.$primary-highlight;
						}

						i {
							display: none;
						}
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

			nav > menu {
				display: flex;
				flex-flow: row wrap;
				justify-content: center;
				gap: size.$spacing-s;
				text-wrap: nowrap;
				list-style: none;

				a {
					@include mixin.unified-transition(100ms, ease, background-color);

					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					gap: calc(0.5 * size.$spacing-s);
					padding: calc(0.5 * size.$spacing-s) size.$spacing-s;
					border-radius: size.$radius-l;
					background-color: color.$primary;
					color: color.$primary-text;
					box-shadow: 0 0 0 size.$spacing-xxs color.$background;
					font-weight: bold;
					line-height: 1;
					cursor: pointer;

					&:hover {
						background-color: color.$primary-highlight;
					}
				}

				li {
					> menu {
						@include mixin.unified-transition(100ms, ease, opacity, visibility);

						display: flex;
						flex-flow: column nowrap;
						gap: size.$spacing-xxs;
						opacity: 0;
						visibility: hidden;
					}

					&:hover,
					&:focus-within {
						> menu {
							opacity: 1;
							visibility: visible;
						}
					}
				}

				> li {
					position: relative;

					> menu {
						position: absolute;
						top: 100%;
						left: 0;
						padding-top: size.$spacing-xxs;

						li {
							position: relative;

							menu {
								position: absolute;
								top: 0;
								left: 100%;
								padding-left: size.$spacing-xxs;
							}
						}
					}
				}
			}
		}
	}

	main {
		@include mixin.on-mobile() {
			padding: calc(0.5 * size.$spacing-s) size.$spacing-s size.$spacing-s;
		}

		@include mixin.on-desktop() {
			padding: 0 size.$spacing-l size.$spacing-l;
		}
	}
</style>
