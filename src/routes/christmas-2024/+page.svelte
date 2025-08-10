<script lang="ts">
	import Section from "$lib/components/Section.svelte";
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

<Section isThin>
	<h1>Christmas CTF 2024 Leaderboard</h1>
	{#if hasError}
		<p>Could not load leaderboard, try again later.</p>
	{:else if leaderboardRows === undefined}
		<p>Loading leaderboard...</p>
	{:else}
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
	{/if}
</Section>

<style lang="scss">
	@use "$lib/styles/color";

	table {
		width: 100%;
		border-spacing: 0;

		thead,
		tbody {
			box-shadow: 0 2px 4px 0 #00000044;

			td {
				padding: 0.25rem;
				text-align: center;

				&:not(:last-child) {
					border-right: none;
				}
			}

			tr {
				&:not(:first-child) td {
					border-top: none;
				}

				&:first-child td {
					&:first-child {
						border-top-left-radius: 0.25rem;
					}

					&:last-child {
						border-top-right-radius: 0.25rem;
					}
				}

				&:last-child td {
					&:first-child {
						border-bottom-left-radius: 0.25rem;
					}

					&:last-child {
						border-bottom-right-radius: 0.25rem;
					}
				}
			}
		}

		thead {
			td {
				border: 1px solid #333333;
				background-color: #232323;
			}
		}

		tbody {
			&:before {
				// Adds space between <thead> and <tbody>
				content: "-";
				display: block;
				color: transparent;
				line-height: 0.25rem;
			}

			td {
				border: 1px solid #444444;
			}

			tr {
				&:nth-child(odd) td {
					background-color: #2a2a2a;
				}

				&:nth-child(even) td {
					background-color: #333333;
				}
			}
		}
	}
</style>
