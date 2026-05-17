<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import Heading from "$lib/components/Heading.svelte";
	import PageHead from "$lib/components/PageHead.svelte";

	type LeaderboardRow = [string, string];
	let leaderboardRows = $state<LeaderboardRow[] | undefined>(undefined);
	let hasError = $state(false);

	const SHEET_URL =
		"https://docs.google.com/spreadsheets/d/14h0sFurutGcILR8XnIPeVq3mBKpCXTCFUmIeAFZCvQg/edit?usp=sharing";

	async function scrapeGoogleSheet(url: string) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch the sheet: ${response.statusText}`);
			}
			const html = await response.text();

			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			const table = doc.querySelector("table");
			if (!table) {
				throw new Error("No table found in the sheet.");
			}

			const rows = Array.from(table.querySelectorAll("tr"));
			const data = rows.map((row) =>
				Array.from(row.querySelectorAll("td")).map((cell) => cell.innerText.trim()),
			);

			let result: LeaderboardRow[] = [];
			for (let i = 2; i < data.length; i++) {
				const [timestamp, nickname] = data[i];
				if (nickname && timestamp) {
					result.push([nickname, timestamp]);
				}
			}

			return result;
		} catch (error) {
			console.error("Error:", error);
			hasError = true;
			return null;
		}
	}

	$effect(() => {
		scrapeGoogleSheet(SHEET_URL).then((json) => {
			if (json === null) leaderboardRows = undefined;
			else leaderboardRows = json;
		});
	});
</script>

<PageHead
	title="Christmas 2024"
	description="Leaderboard for the LiTHe Hax Christmas CTF 2024 competition."
/>

<ArticleGroup layout="thin">
	<Article>
		<Heading level={1}>Christmas CTF 2024 Leaderboard</Heading>
		{#if hasError}
			<p>Could not load leaderboard, try again later.</p>
		{:else if leaderboardRows === undefined}
			<p>Loading leaderboard...</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Time Cleared</th>
					</tr>
				</thead>
				<tbody>
					{#each leaderboardRows as row, i (i)}
						<tr>
							<td>{i + 1}</td>
							<td>{row[0]}</td>
							<td>{row[1]}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</Article>
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/size";

	table {
		border: size.$widget-border solid color.$widget;
		width: 100%;
		border-radius: size.$radius-l;
		text-align: center;
		overflow: clip;

		th,
		td {
			padding: calc(0.5 * size.$spacing-xs) size.$spacing-xs;
		}

		th {
			background-color: color.$widget;
			font-weight: bold;
		}
	}
</style>
