<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
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
			if (json === null) {
				leaderboardRows = undefined;
			} else {
				leaderboardRows = json;
			}
		});
	});
</script>

<PageHead
	title="Christmas 2024"
	description="Leaderboard for the LiTHe Hax Christmas CTF 2024 competition."
/>

<ArticleGroup layout="thin">
	<Article>
		<h1>Christmas CTF 2024 Leaderboard</h1>
		{#if hasError}
			<p>Could not load the leaderboard, reload the page and try again later.</p>
		{:else if leaderboardRows}
			<table>
				<thead>
					<tr>
						<td>#</td>
						<td>Name</td>
						<td>Time Cleared</td>
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
		{:else}
			<p>Loading leaderboard...</p>
		{/if}
	</Article>
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/color.scss";

	// TODO: table could be made into its own reusable component if needed
	table {
		width: 100%;
		border-spacing: 0;

		thead,
		tbody {
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);

			td {
				padding: 0.25rem;
				text-align: center;

				&:not(:last-child) {
					border-right: none;
				}
			}
		}

		thead td {
			border: 1px solid color.$gray-3;
			background: color.$gray-1;

			&:first-child {
				border-top-left-radius: 0.25rem;
				border-bottom-left-radius: 0.25rem;
			}

			&:last-child {
				border-top-right-radius: 0.25rem;
				border-bottom-right-radius: 0.25rem;
			}
		}

		tbody {
			&::before {
				// Needed since padding has no effect on table elements
				content: "-";
				display: block;
				line-height: 0.25rem;
				color: transparent;
			}

			tr {
				&:not(:first-child) td {
					border-top: none;
				}

				&:nth-child(odd) td {
					background-color: color.$gray-2;
				}

				&:nth-child(even) td {
					background-color: color.$gray-3;
				}

				&:first-child {
					td:first-child {
						border-top-left-radius: 0.25rem;
					}

					td:last-child {
						border-top-right-radius: 0.25rem;
					}
				}

				&:last-child {
					td:first-child {
						border-bottom-left-radius: 0.25rem;
					}

					td:last-child {
						border-bottom-right-radius: 0.25rem;
					}
				}
			}

			td {
				border: 1px solid color.$gray-4;
			}
		}
	}
</style>
