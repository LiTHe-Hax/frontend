import { dev } from "$app/environment";

const DEVELOPMENT_URL = "http://localhost:8000/";
const PRODUCTION_URL = "https://lithehax-medlem-9abc9f434ec7.herokuapp.com/";
const BASE_URL = dev ? DEVELOPMENT_URL : PRODUCTION_URL;

type Method =
	| "GET"
	| "HEAD"
	| "POST"
	| "PUT"
	| "DELETE"
	| "CONNECT"
	| "OPTIONS"
	| "TRACE"
	| "PATCH";

type JsonArray = unknown[];
type JsonObject = { [key: string]: unknown };
type Json = JsonArray | JsonObject;

type ApiResponse = {
	fetchResponse: Response;
	data?: Json;
	status: number;
	statusText: string;
	isSuccessful: boolean;
};

async function requestApi(path: string, method: Method, data?: Json) {
	const url = `${BASE_URL}${path}`;
	const response = await fetch(url, {
		method: method,
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			"Content-Type": "application/json",
		},
	});

	let responseData;
	try {
		responseData = await response.json();
	} catch {
		responseData = undefined;
	}

	return {
		fetchResponse: response,
		data: responseData,
		status: response.status,
		statusText: response.statusText,
		isSuccessful: response.ok,
	} as ApiResponse;
}

export default requestApi;
export type { Method, Json, JsonArray, JsonObject };
