import { PUBLIC_BASE_URL } from "$env/static/public";
import type { LayoutLoadEvent } from "./$types";

// This is needed, since the website is using adapter-static
export const prerender = true;

export function load({ url }: LayoutLoadEvent) {
	return {
		canonicalHref: `${PUBLIC_BASE_URL}${url.pathname}`,
	};
}
