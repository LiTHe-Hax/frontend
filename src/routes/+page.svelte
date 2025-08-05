<script lang="ts">
	import { asset } from "$app/paths";

	import tysonImage from "$lib/images/2024-2025/contacts/tyson_h.jpg";
	import viktorImage from "$lib/images/2024-2025/contacts/viktor_h.jpg";
	import davidImage from "$lib/images/2025-2026/contacts/david_s.png";
	import adamImage from "$lib/images/2024-2025/contacts/adam_b.jpg";
	import wilmerImage from "$lib/images/2024-2025/contacts/wilmer_s.jpg";
	import toveImage from "$lib/images/2024-2025/contacts/tove_h.jpg";
	import antonImage from "$lib/images/2024-2025/contacts/anton_o.jpg";
	import williamImage from "$lib/images/2024-2025/contacts/william_m.jpg";
	import tomImage from "$lib/images/2025-2026/contacts/tom_e.jpg";
	import torbjornImage from "$lib/images/contacts/torbjorn_h.png";

	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import ContactCard from "$lib/components/ContactCard.svelte";
	import DocumentLink from "$lib/components/DocumentLink.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title=""
	description="LiTHe Hax is an independent student association at Linköping University focused on ethical hacking and cybersecurity."
/>

<ArticleGroup>
	<Article>
		<h1>About us</h1>
		<p>
			LiTHe Hax is an independent student association at Linköping University whose purpose is to
			promote and strengthen knowledge in ethical hacking and cybersecurity. The association is
			intended to participate in and organize hacking competitions. Anyone can be a member and
			participate in LiTHe Hax's activities. The association was founded on March 29, 2024.
		</p>
		<div class="social-media-links">
			<a href="https://discord.gg/UykWT8W899" aria-label="discord">
				<i class="fa-brands fa-discord"></i>
			</a>
			<a href="https://www.facebook.com/profile.php?id=61567434623373" aria-label="facebook">
				<i class="fa-brands fa-facebook"></i>
			</a>
			<a href="https://www.instagram.com/lithehax" aria-label="instagram">
				<i class="fa-brands fa-instagram"></i>
			</a>
		</div>

		<h2>Contact</h2>
		<div class="contact-cards">
			<ContactCard
				fullName="Tyson Horvath"
				hackerTag="tavro"
				role="Chairman"
				email="ordforande@lithehax.se"
				image={tysonImage}
			/>
			<ContactCard
				fullName="David Smith"
				hackerTag="smittydata"
				role="Secretary"
				email="sekreterare@lithehax.se"
				image={davidImage}
			/>
			<ContactCard
				fullName="Tom Englund"
				hackerTag="naturell"
				role="Board member"
				email="tom.englund@lithehax.se"
				image={tomImage}
			/>
			<ContactCard
				fullName="Viktor Holta"
				hackerTag="parslie"
				role="Webmaster"
				email="webmaster@lithehax.se"
				image={viktorImage}
			/>
			<ContactCard
				fullName="Adam Bohman"
				hackerTag="Whiibie"
				role="Accountant"
				email="revisor@lithehax.se"
				image={adamImage}
			/>
			<ContactCard
				fullName="Wilmer Segerstedt"
				hackerTag="airless"
				role="Logistics"
				email="wilmer.segerstedt@lithehax.se"
				image={wilmerImage}
			/>
			<ContactCard
				fullName="Tove Haernfelt"
				hackerTag="thetov"
				role="Event manager"
				email="tove.haernfelt@lithehax.se"
				image={toveImage}
			/>
			<ContactCard
				fullName="Anton Oom"
				hackerTag="oomega"
				role="Relations"
				email="anton.oom@lithehax.se"
				image={antonImage}
			/>
			<ContactCard
				fullName="William Minidis"
				hackerTag="windis"
				role="Cashier"
				email="kassor@lithehax.se"
				image={williamImage}
			/>
			<ContactCard
				fullName="Torbjörn Hackström"
				hackerTag="hacktor"
				role="Mascot"
				email="maskot@lithehax.se"
				image={torbjornImage}
			/>
		</div>

		<h2>Organization details</h2>
		<p>
			<b>Organization Number:</b> 802547-1767
			<br />
			<b>Adress:</b> LiTHe Hax, Kårallen, Universitetet, 581 83 Linköping
		</p>

		<h3>Documents</h3>
		<div class="document-links">
			<DocumentLink
				href={asset("/documents/2024-2025/events/annual_meeting/kallelse_arsmote.pdf")}
			/>
			<DocumentLink href={asset("/documents/lithe_hax_stadgar_uppdaterad.pdf")} />
			<DocumentLink href={asset("/documents/lithe_hax_konstituerande_protokoll.pdf")} />
		</div>
	</Article>
</ArticleGroup>

<style lang="scss">
	.social-media-links {
		font-size: 2rem;
	}

	.contact-cards {
		// Using min allows the cards to shrink past 26rem the screen is smaller
		$min-card-width: min(26rem, 100%);

		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax($min-card-width, 1fr));
	}

	.document-links {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.2rem;
	}
</style>
