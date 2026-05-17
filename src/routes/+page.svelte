<script lang="ts">
	import getAssetUrl from "$lib/api/asset";

	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import ContactCard from "$lib/components/ContactCard.svelte";
	import DocumentLink from "$lib/components/DocumentLink.svelte";
	import Heading from "$lib/components/Heading.svelte";
	import Link from "$lib/components/Link.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title=""
	description="LiTHe Hax is an independent student association at Linköping University focused on ethical hacking and cybersecurity."
/>

<ArticleGroup layout="wide">
	<Article>
		<Heading level={1}>About Us</Heading>
		<p>
			LiTHe Hax is an independent student association at Linköping University whose purpose is to
			promote and strengthen knowledge in ethical hacking and cybersecurity. The association is
			intended to participate in and organize hacking competitions. Anyone can be a member and
			participate in LiTHe Hax's activities. The association was founded on March 29, 2024.
		</p>
		<div class="social-medias">
			<Link href="https://discord.gg/UykWT8W899" aria-label="Discord">
				<i class={["fa-brands", "fa-width-auto", "fa-discord"]}></i>
			</Link>
			<Link href="https://www.facebook.com/profile.php?id=61567434623373" aria-label="Facebook">
				<i class={["fa-brands", "fa-width-auto", "fa-facebook"]}></i>
			</Link>
			<Link href="https://www.instagram.com/lithehax" aria-label="Instagram">
				<i class={["fa-brands", "fa-width-auto", "fa-instagram"]}></i>
			</Link>
		</div>

		<Heading level={2}>The Board</Heading>
		<p>
			The board is responsible for communicating with partners and sponsors, arranging and marketing
			events, as well as handling other administrative tasks.
		</p>
		<div class="contact-cards">
			<ContactCard
				fullName="Tyson Horvath"
				hackerTag="tavro"
				position="Chairman"
				email="chairman@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/tyson_h.jpg")}
			/>
			<ContactCard
				fullName="Adam Bohman"
				hackerTag="Whiibie"
				position="Accountant"
				email="accountant@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/adam_b.jpg")}
			/>
			<ContactCard
				fullName="Anton Oom"
				hackerTag="oomega"
				position="Relations"
				email="relations@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/anton_o.jpg")}
			/>
			<ContactCard
				fullName="David Rindsjö Smith"
				hackerTag="smittydata"
				position="Secretary"
				email="secretary@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/david_s.jpg")}
			/>
			<ContactCard
				fullName="Tom Englund"
				hackerTag="naturell"
				position="Board member"
				email="info@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/tom_e.jpg")}
			/>
			<ContactCard
				fullName="Tove Haernfelt"
				hackerTag="thetov"
				position="Event manager"
				email="event@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/tove_h.jpg")}
			/>
			<ContactCard
				fullName="Viktor Holta"
				hackerTag="Parslie"
				position="Webmaster"
				email="webmaster@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/viktor_h.jpg")}
			/>
			<ContactCard
				fullName="William Minidis"
				hackerTag="windis"
				position="Treasurer"
				email="treasurer@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/william_m.jpg")}
			/>
			<ContactCard
				fullName="Wilmer Segerstedt"
				hackerTag="wlmr"
				position="Logistics"
				email="logistics@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/board/wilmer_s.jpg")}
			/>
			<ContactCard
				fullName="Torbjörn Hackström"
				hackerTag="hacktor"
				position="Mascot"
				email="mascot@lithehax.se"
				imageHref={getAssetUrl("images/contacts/torbjorn_h.png")}
			/>
		</div>

		<Heading level={2}>The CTF Committee</Heading>
		<p>
			The CTF committee is responsible for helping the board with arranging CTF events, as well as
			designing exciting and challenging exercises for participants.
		</p>
		<div class="contact-cards">
			<ContactCard
				fullName="Tyson Horvath"
				hackerTag="tavro"
				position="Chairman"
				email="chairman.ctf@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/committee/tyson_h.jpg")}
			/>
			<ContactCard
				fullName="Alve Källberg"
				hackerTag="seftie"
				position="Committee member"
				email="alve.kallberg@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/committee/alve_k.jpg")}
			/>
			<ContactCard
				fullName="Harald Thorsson"
				hackerTag="Anguis"
				position="Committee member"
				email="harald.thorsson@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/committee/harald_t.jpg")}
			/>
			<ContactCard
				fullName="Rasmus Dahlström"
				hackerTag="dars-png"
				position="Committee member"
				email="rasmus.dahlstrom@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/committee/rasmus_d.jpg")}
			/>
			<ContactCard
				fullName="Saman Mahmoodi"
				hackerTag="SabKhawrazmi"
				position="Committee member"
				email="saman.mahmoodi@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/committee/saman_m.jpg")}
			/>
			<ContactCard
				fullName="Tobias Dahlmark"
				position="Committee member"
				email="tobias.dahlmark@lithehax.se"
				imageHref={getAssetUrl("images/2025-2026/contacts/committee/tobias_d.jpg")}
			/>
		</div>

		<Heading level={2}>Organization Details</Heading>
		<p>
			<b>Organization Number:</b> 802547-1767
			<br />
			<b>Adress:</b> LiTHe Hax, Kårallen, Universitetet, 581 83 Linköping
		</p>

		<Heading level={3}>Documents</Heading>
		<div class="document-links">
			<DocumentLink href={getAssetUrl("documents/lithe_hax_stadgar_uppdaterad.pdf")} />
			<DocumentLink href={getAssetUrl("documents/lithe_hax_konstituerande_protokoll.pdf")} />
			<DocumentLink href={getAssetUrl("documents/lithe_hax_arsmote_2024.pdf")} />
			<DocumentLink href={getAssetUrl("documents/lithe_hax_extrainsatt_arsmote_2024.pdf")} />
			<DocumentLink href={getAssetUrl("documents/lithe_hax_arsmote_2025.pdf")} />
		</div>
	</Article>
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/size";

	.social-medias {
		display: flex;
		flex-flow: row wrap;
		gap: size.$spacing-xs;
		line-height: 1;
		font-size: 2rem;
	}

	.contact-cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(22rem, 100%), 1fr));
		gap: size.$spacing-s;
	}

	.document-links {
		display: flex;
		flex-flow: column nowrap;
		gap: size.$spacing-xxs;
		align-items: start;
	}
</style>
