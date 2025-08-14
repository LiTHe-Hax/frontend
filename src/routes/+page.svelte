<script lang="ts">
	import { asset } from "$app/paths";

	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import ContactCard from "$lib/components/ContactCard.svelte";
	import DocumentLink from "$lib/components/DocumentLink.svelte";
	import PageHead from "$lib/components/PageHead.svelte";

	import chairmanImg from "$lib/images/2025-2026/contacts/tyson_h.jpg?enhanced";
	import webmasterImg from "$lib/images/2025-2026/contacts/viktor_h.jpg?enhanced";
	import secretaryImg from "$lib/images/2025-2026/contacts/david_s.png?enhanced";
	import accountantImg from "$lib/images/2025-2026/contacts/adam_b.jpg?enhanced";
	import logisticsImg from "$lib/images/2025-2026/contacts/wilmer_s.jpg?enhanced";
	import eventManagerImg from "$lib/images/2025-2026/contacts/tove_h.jpg?enhanced";
	import relationsImg from "$lib/images/2025-2026/contacts/anton_o.jpg?enhanced";
	import boardMemberImg from "$lib/images/2025-2026/contacts/tom_e.jpg?enhanced";
	import mascotImg from "$lib/images/contacts/torbjorn_h.png?enhanced";
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
		<div class={["social-medias", "fa-width-auto"]}>
			<a class={["fa-brands", "fa-discord"]} href="https://discord.gg/UykWT8W899"></a>
			<a
				class={["fa-brands", "fa-facebook"]}
				href="https://www.facebook.com/profile.php?id=61567434623373"
			></a>
			<a
				class={["fa-brands", "fa-instagram"]}
				href="https://www.instagram.com/lithehax?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
			></a>
		</div>

		<h2>Contact</h2>
		<div class="contact-grid">
			<ContactCard
				fullName="Tyson Horvath"
				hackerTag="tavro"
				position="Chairman"
				email="ordforande@lithehax.se"
				image={chairmanImg}
			/>
			<ContactCard
				fullName="David Smith"
				hackerTag="smittydata"
				position="Secretary"
				email="sekreterare@lithehax.se"
				image={secretaryImg}
			/>
			<ContactCard
				fullName="Tom Englund"
				hackerTag="naturell"
				position="Board member"
				email="tom.englund@lithehax.se"
				image={boardMemberImg}
			/>
			<ContactCard
				fullName="Viktor Holta"
				hackerTag="Parslie"
				position="Webmaster"
				email="webmaster@lithehax.se"
				image={webmasterImg}
			/>
			<ContactCard
				fullName="Adam Bohman"
				hackerTag="Whiibie"
				position="Accountant"
				email="revisor@lithehax.se"
				image={accountantImg}
			/>
			<ContactCard
				fullName="Wilmer Segerstedt"
				hackerTag="airless"
				position="Logistics"
				email="wilmer.segerstedt@lithehax.se"
				image={logisticsImg}
			/>
			<ContactCard
				fullName="Tove Haernfelt"
				hackerTag="thetov"
				position="Event manager"
				email="tove.haernfelt@lithehax.se"
				image={eventManagerImg}
			/>
			<ContactCard
				fullName="Anton Oom"
				hackerTag="oomega"
				position="Relations"
				email="anton.oom@lithehax.se"
				image={relationsImg}
			/>
			<ContactCard
				fullName="William Minidis"
				hackerTag="windis"
				position="Cashier"
				email="kassor@lithehax.se"
			/>
			<ContactCard
				fullName="Torbjörn Hackström"
				hackerTag="hacktor"
				position="Mascot"
				email="maskot@lithehax.se"
				image={mascotImg}
			/>
		</div>

		<h2>Organization details</h2>
		<p><b>Organization Number:</b> 802547-1767</p>
		<p><b>Adress:</b> LiTHe Hax, Kårallen, Universitetet, 581 83 Linköping</p>

		<h3>Documents</h3>
		<div class="document-list">
			<DocumentLink
				link={asset("/documents/2024-2025/events/annual_meeting/kallelse_arsmote.pdf")}
			/>
			<DocumentLink link={asset("/documents/lithe_hax_stadgar_uppdaterad.pdf")} />
			<DocumentLink link={asset("/documents/lithe_hax_konstituerande_protokoll.pdf")} />
		</div>
	</Article>
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/mixin";

	.contact-grid {
		@include mixin.on-mobile() {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		@include mixin.on-desktop() {
			display: grid;
			gap: 1rem;
			grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
		}
	}

	.document-list {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.social-medias {
		display: flex;
		flex-direction: row;
		gap: 0.6rem;
		font-size: 2rem;
		line-height: 1;
	}
</style>
