import requestApi, { type ApiResponse } from "./request";

type Location = {
	name: string;
	maps_url: string;
};

type Sponsor = {
	name: string;
	logo_url: string;
};

type Event = {
	title: string;
	image_url: string;
	content: string;
	start_date: string;
	end_date: string | null;
	show_time: boolean;
	location: Location | null;
	sponsors: Sponsor[];
};

type EventPage = {
	next: string | null;
	previous: string | null;
	count: number;
	page_count: number;
	results: Event[];
};

async function getPreviousEvents(page: number) {
	const response = await requestApi(`events/previous/?page=${page}`, "GET");
	return response as ApiResponse<EventPage>;
}

async function getUpcomingEvents(page: number) {
	const response = await requestApi(`events/upcoming/?page=${page}`, "GET");
	return response as ApiResponse<EventPage>;
}

export { getPreviousEvents, getUpcomingEvents };
export type { EventPage, Event, Sponsor, Location };
