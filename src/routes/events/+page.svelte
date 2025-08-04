<script lang="ts">
	import { asset } from "$app/paths";

	import acasImage from "$lib/images/2024-2025/events/annual_meeting/acas.png";
	import cyberRoomImage from "$lib/images/2024-2025/events/liu_ctf/cyber_room.jpg";
	import goto10FoyerImage from "$lib/images/2024-2025/events/foo_cafe/goto_10_foyer.jpg";
	import studenthusetImage from "$lib/images/2024-2025/events/workshop/studenthuset.jpg";

	import fooCafeLogo from "$lib/images/sponsors/foo_cafe_logo.svg";
	import goto10Logo from "$lib/images/sponsors/goto_10_logo.png";
	import sectraLogo from "$lib/images/sponsors/sectra_logo.png";
	import sickLogo from "$lib/images/sponsors/sick_logo.png";
	import sylogLogo from "$lib/images/sponsors/sylog_logo.png";

	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import DocumentLink from "$lib/components/DocumentLink.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title="Events"
	description="LiTHe Hax events including Annual Meeting, CTF competition, workshops, and networking opportunities at Linköping University, GOTO10, Foocafe and more"
/>

<ArticleGroup layout="thin" h1="Upcoming Events">
	<Article>
		<p>There are currently no upcoming events...</p>
	</Article>
</ArticleGroup>

<ArticleGroup layout="thin" h1="Previous Events">
	<Article translucent>
		<h2>Annual Meeting</h2>
		<img src={acasImage} alt="ACAS at Linköping University" />
		<p>
			We will be holding our annual meeting soon, which you're very welcome to attend! During the
			meeting we'll talk about the last year of LiTHe Hax and we'll be voting on the next year of
			LiTHe Hax. One thing that'll be voted on is who will be included in the next board, so this is
			your chance to join and affect the future of LiTHe Hax.
		</p>
		<p>Coffee and fika will be provided to everyone who attend the meeting.</p>

		<p>
			<strong>Date and time:</strong> 28 May 2025, 17:15
			<br />
			<strong>Location:</strong>
			<a
				href="https://use.mazemap.com/?utm_medium=longurl#v=1&config=liu&campusid=742&zlevel=2&center=15.576810,58.402255&zoom=18&sharepoitype=poi&sharepoi=1000927810"
			>
				ACAS (Linköping University, Sweden)
			</a>
		</p>

		<p>
			<strong>Agenda:</strong>
			<DocumentLink
				href={asset("/documents/2024-2025/events/annual_meeting/kallelse_arsmote.pdf")}
			/>
		</p>

		<h3>Candidacy</h3>
		<p>
			Anyone can can run for the positions brought up during the meeting. You can oppose any of the
			current nominees, which means that you can nominate yourself or someone else for that position
			(without having been previously nominated). You can also submit an opposition by sending a
			mail to
			<a href="mailto:ordforande@lithehax.se">ordforande@lithehax.se</a>, where you explain which
			position you're interested in and why you are a suitable candidate.
		</p>
		<p>
			If you are running for a position in the board you will have to present yourself during the
			meeting and answer any potential questions. Below are some suggestions of what you may want to
			bring up when presenting yourself:
		</p>
		<ul>
			<li>Who you are</li>
			<li>Why you are running for the position</li>
			<li>Past experiences that may be of relevance</li>
		</ul>
		<p>
			<strong>Current nominees:</strong>
			<DocumentLink href={asset("/documents/2024-2025/events/annual_meeting/nominations.pdf")} />
		</p>

		<h3>Motions</h3>
		<p>
			Anyone can send in motions. The easiest way to do this is by mailing the motion to <a
				href="mailto:ordforande@lithehax.se">ordforande@lithehax.se</a
			>. Motions must be sent in writing to the board no later than seven days before the meeting
			(21 May 2025).
		</p>
		<p>
			<strong>Current motions and propositions:</strong>
			<DocumentLink
				href={asset("/documents/2024-2025/events/annual_meeting/motions_and_propositions.pdf")}
			/>
		</p>
	</Article>
	<Article translucent>
		<h2>Foo Bar at Foo Café</h2>
		<img src={goto10FoyerImage} alt="Foyer at Goto 10" />
		<p>
			Foo Café and LiTHe Hax recently teamed up for a cybersecurity evening focused on Capture the
			Flag challenges. The event featured a brief introduction, a problem-solving lecture, and a
			chance to network over food and drinks with others passionate about cybersecurity.
		</p>

		<p>
			<strong>Date and time:</strong> 24 Apr 2025, 17:00-20:00
			<br />
			<strong>Location:</strong>
			<a href="https://maps.app.goo.gl/LNrr7CWQWwaH3deJ9">
				Goto 10 Linköping (Teknikringen 7, 583 30 Linköping)
			</a>
		</p>

		<p>
			<strong>Presentation:</strong>
			<DocumentLink
				href={asset("/documents/2024-2025/events/foo_cafe/goto_10_presentation.pptx")}
			/>
		</p>

		<hr />
		<div class="sponsor-logos">
			<img src={goto10Logo} alt="Goto 10 logo" />
			<img src={fooCafeLogo} alt="Foo Café logo" />
		</div>
	</Article>
	<Article translucent>
		<h2>LiU CTF</h2>
		<img src={cyberRoomImage} alt="Cybersecurity Room" />
		<p>
			The LiTHe Hax LiU CTF was an exciting Capture the Flag competition held on March 8. We hosted
			this event to promote cybersecurity awareness within the student community, combining both
			relevance and fun.
		</p>
		<p>
			A total of 18 teams competed, each consisting of 2–5 participants. Free food was provided to
			all participants.
		</p>

		<p>
			<strong>Date and time:</strong> 8 Mar 2025, 17:15-23:00
			<br />
			<strong>Location:</strong>
			<a
				href="https://use.mazemap.com/?utm_medium=longurl#v=1&config=liu&campusid=742&zlevel=2&center=15.576432,58.398370&zoom=18&sharepoitype=poi&sharepoi=1002771474"
			>
				Brandväggen, Bakdörren and ISYtan (Linköping University, Sweden)
			</a>
		</p>

		<p>
			<strong>CTF platform:</strong>
			<a href="https://ctf.lithehax.se"> ctf.lithehax.se </a>
			<br />
			<strong>CTF rules:</strong>
			<DocumentLink href={asset("/documents/2024-2025/events/liu_ctf/liu_ctf_rules.pdf")} />
		</p>

		<hr />
		<div class="sponsor-logos">
			<img src={sickLogo} alt="SICK logo" />
			<img src={sectraLogo} alt="Sectra logo" />
			<img src={sylogLogo} alt="Sylog logo" />
		</div>
	</Article>
	<Article translucent>
		<h2>Workshop</h2>
		<img src={studenthusetImage} alt="Studenthuset" />
		<p>
			We held a workshop in preparation for our CTF. During the workshop, we explained and showcased
			example challenges that resembled the actual CTF challenges.
		</p>
		<p>
			There were 80 available seats, and those who registered were provided free food, sponsored by
			the companies below.
		</p>

		<p>
			<strong>Date and time:</strong> 27 Feb 2025, 17:15-20:00
			<br />
			<strong>Location:</strong>
			<a
				href="https://use.mazemap.com/#v=1&config=liu&campusid=742&zlevel=6&center=15.577904,58.397057&zoom=18.9&sharepoitype=poi&sharepoi=1000927265"
			>
				SH62 and SH63 (Linköping University, Sweden)
			</a>
		</p>

		<p>
			<strong>Challenges:</strong>
			<DocumentLink href={asset("/documents/2024-2025/events/workshop/workshop_challenges.zip")} />
			<br />
			<strong>Presentation:</strong>
			<DocumentLink
				href={asset("/documents/2024-2025/events/workshop/workshop_presentation.pptx")}
			/>
		</p>

		<hr />
		<div class="sponsor-logos">
			<img src={sickLogo} alt="SICK logo" />
			<img src={sectraLogo} alt="Sectra logo" />
		</div>
	</Article>
</ArticleGroup>

<style lang="scss">
	.sponsor-logos {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin: 1rem 0;

		img {
			width: auto;
			height: 2rem;
		}
	}
</style>
