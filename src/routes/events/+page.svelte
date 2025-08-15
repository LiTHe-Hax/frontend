<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import cyberRoom from "$lib/images/2024-2025/events/liu_ctf/cyber_room.jpg?enhanced";
	import sickLogo from "$lib/images/sponsors/sick_logo.png?enhanced";
	import sectraLogo from "$lib/images/sponsors/sectra_logo.png?enhanced";
	import sylogLogo from "$lib/images/sponsors/sylog_logo.png?enhanced";
	import DocumentLink from "$lib/components/DocumentLink.svelte";
	import { asset } from "$app/paths";
	import studenthuset from "$lib/images/2024-2025/events/workshop/studenthuset.jpg?enhanced";
	import foobar from "$lib/images/2024-2025/events/foo_cafe/goto_10_foyer.jpg?enhanced";
	import goto10Logo from "$lib/images/sponsors/goto_10_logo.png?enhanced";
	import fooCafeLogo from "$lib/images/sponsors/foo_cafe_logo.svg";
	import acas from "$lib/images/2024-2025/events/annual_meeting/acas.png?enhanced";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title="Events"
	description="LiTHe Hax events including Annual Meeting, CTF competition, workshops, and networking opportunities at Linköping University, GOTO10, Foocafe and more"
/>

<ArticleGroup layout="thin" h1="Upcoming Events">
	<Article>
		<h2>CTF Committee Recruitment</h2>
		<!-- TODO: add image -->
		<p>
			We're looking for eight new members to join our CTF committee! As part of the team you'll help
			design challenges, organize events and contribute to the local cybersecurity community.
		</p>
		<p>Keep an eye out for more information on our social media accounts.</p>
		<p>
			<strong>Date & time:</strong> August 25 - September 7
		</p>
	</Article>
	<Article>
		<h2>MiniCTF with Foo Café</h2>
		<!-- TODO: add image -->
		<p>
			Join us for some laid back CTF hacking, networking and free food & drinks! Bring your laptop
			and solve beginner-friendly challenges from PicoCTF with us, at your own pace. We'll also give
			a short intro to LiTHe Hax and what's going on within the organization, currently.
		</p>
		<p>
			<strong>Date & time:</strong> August 26
			<br />
			<strong>Location:</strong>
			<a href="https://maps.app.goo.gl/LNrr7CWQWwaH3deJ9">
				Goto 10 Linköping (Teknikringen 7, 583 30 Linköping)
			</a>
		</p>
	</Article>
	<Article>
		<h2>Live Hack with Cyberly</h2>
		<!-- TODO: add image -->
		<p>
			Together with Norrköping Municipality and EnlightSec, we're doing a live demonstration of real
			world penetration testing, showing how hackers could break into Goto 10. Fika provided on
			site.
		</p>
		<p>
			<strong>Date & time:</strong> September 4
			<br />
			<strong>Location:</strong>
			<a href="https://maps.app.goo.gl/LNrr7CWQWwaH3deJ9">
				Goto 10 Linköping (Teknikringen 7, 583 30 Linköping)
			</a>
		</p>
	</Article>
	<Article>
		<h2>IEEE CTF</h2>
		<!-- TODO: add image -->
		<p>
			We're proud to present a brand new CTF event in collaboration with IEEE, especially designed
			for newcomers! Whether it's your first time or you just want a more casual experience, this is
			the perfect entry point. We're providing free food, snacks and drinks.
		</p>
		<p>
			<strong>Date & time:</strong> November 1
			<br />
			<strong>Location:</strong>
			<a
				href="https://use.mazemap.com/?utm_medium=longurl#v=1&config=liu&campusid=742&zlevel=2&center=15.577523,58.398407&zoom=17.9&sharepoitype=identifier&sharepoi=E0007002%3A227A"
			>
				B-huset (Campus Valla, Linköping University)
			</a>
		</p>
	</Article>
	<Article>
		<h2>LiU CTF</h2>
		<!-- TODO: add image -->
		<p>
			Our flagship Capture the Flag competition returns! LiU CTF will take place in the university's
			cybersecurity lab, featuring challenges across categories like reverse engineering, web,
			crypto and forensics. Open to all skill levels. Free food and snacks throughout the day.
		</p>
		<p>
			<strong>Date & time:</strong> March 7
		</p>
	</Article>
</ArticleGroup>

<ArticleGroup layout="thin" h1="Previous Events">
	<Article translucent>
		<h2>Annual Meeting</h2>
		<enhanced:img src={acas} alt="ACAS at Linköping University" />
		<p>
			We will be holding our annual meeting soon, which you're very welcome to attend! During the
			meeting we'll talk about the last year of LiTHe Hax and we'll be voting on the next year of
			LiTHe Hax. One thing that'll be voted on is who will be included in the next board, so this is
			your chance to join and affect the future of LiTHe Hax.
		</p>
		<p>Coffee and fika will be provided to everyone who attend the meeting.</p>
		<p><strong>Date & Time:</strong> 28 May 2025, 17:15</p>
		<p>
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
				link={asset("/documents/2024-2025/events/annual_meeting/kallelse_arsmote.pdf")}
			/>
		</p>

		<h3>Candidacy</h3>
		<p>
			Anyone can can run for the positions brought up during the meeting. You can oppose any of the
			current nominees, which means that you can nominate yourself or someone else for that position
			(without having been previously nominated). You can also submit an opposition by sending a
			mail to <a href="mailto:ordforande@lithehax.se">ordforande@lithehax.se</a>, where you explain
			which position you're interested in and why you are a suitable candidate.
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
			<DocumentLink link={asset("/documents/2024-2025/events/annual_meeting/nominations.pdf")} />
		</p>

		<h3>Motions</h3>

		<p>
			Anyone can send in motions. The easiest way to do this is by mailing the motion to
			<a href="mailto:ordforande@lithehax.se">ordforande@lithehax.se</a>. Motions must be sent in
			writing to the board no later than seven days before the meeting (21 May 2025).
		</p>
		<p>
			<strong>Current motions and propositions:</strong>
			<DocumentLink
				link={asset("/documents/2024-2025/events/annual_meeting/motions_and_propositions.pdf")}
			/>
		</p>
	</Article>

	<Article translucent>
		<h2>Foo Bar at Foo Café</h2>

		<enhanced:img src={foobar} alt="Foo Bar at Foo Café" />
		<p>
			Foo Café and LiTHe Hax recently teamed up for a cybersecurity evening focused on Capture the
			Flag challenges. The event featured a brief introduction, a problem-solving lecture, and a
			chance to network over food and drinks with others passionate about cybersecurity.
		</p>
		<p><strong>Date & Time:</strong> 24 Apr 2025, 17:00-20:00</p>
		<p>
			<strong>Location:</strong>
			<a href="https://maps.app.goo.gl/LNrr7CWQWwaH3deJ9">
				Goto 10 Linköping (Teknikringen 7, 583 30 Linköping)
			</a>
		</p>
		<p>
			<strong>Presentation:</strong>
			<DocumentLink
				link={asset("/documents/2024-2025/events/foo_cafe/goto_10_presentation.pptx")}
			/>
		</p>

		<hr />
		<div class="sponsor-logos">
			<enhanced:img src={goto10Logo} alt="Goto 10 logo" />
			<img src={fooCafeLogo} alt="Foo Café logo" />
		</div>
	</Article>

	<Article translucent>
		<h2>LiU CTF</h2>

		<enhanced:img src={cyberRoom} alt="Cybersecurity Room" />
		<p>
			The LiTHe Hax LiU CTF was an exciting Capture the Flag competition held on March 8. We hosted
			this event to promote cybersecurity awareness within the student community, combining both
			relevance and fun.
		</p>
		<p>
			A total of 18 teams competed, each consisting of 2–5 participants. Free food was provided to
			all participants.
		</p>
		<p><strong>Date & Time:</strong> 8 Mar 2025, 17:15-23:00</p>
		<p>
			<strong>Location:</strong>
			<a
				href="https://use.mazemap.com/?utm_medium=longurl#v=1&config=liu&campusid=742&zlevel=2&center=15.576432,58.398370&zoom=18&sharepoitype=poi&sharepoi=1002771474"
			>
				Brandväggen, Bakdörren and ISYtan (Linköping University, Sweden)
			</a>
		</p>
		<p>
			<strong>CTF Platform:</strong>
			<a href="https://ctf.lithehax.se"> ctf.lithehax.se </a>
		</p>
		<p>
			<strong>CTF rules:</strong>
			<DocumentLink link={asset("/documents/2024-2025/events/liu_ctf/liu_ctf_rules.pdf")} />
		</p>

		<hr />
		<div class="sponsor-logos">
			<enhanced:img src={sickLogo} alt="sick logo" />
			<enhanced:img src={sectraLogo} alt="sectra logo" />
			<enhanced:img src={sylogLogo} alt="sylog logo" />
		</div>
	</Article>

	<Article translucent>
		<h2>Workshop</h2>
		<enhanced:img src={studenthuset} alt="Studenthuset" />
		<p>
			We held a workshop in preparation for our CTF. During the workshop, we explained and showcased
			example challenges that resembled the actual CTF challenges.
		</p>
		<p>
			There were 80 available seats, and those who registered were provided free food, sponsored by
			the companies below.
		</p>
		<p><strong>Date & Time:</strong> 27 Feb 2025, 17:15-20:00</p>
		<p>
			<strong>Location:</strong>
			<a
				href="https://use.mazemap.com/#v=1&config=liu&campusid=742&zlevel=6&center=15.577904,58.397057&zoom=18.9&sharepoitype=poi&sharepoi=1000927265"
			>
				SH62 and SH63 (Linköping University, Sweden)
			</a>
		</p>
		<p>
			<strong>Workshop tasks:</strong>
			<DocumentLink link={asset("/documents/2024-2025/events/workshop/workshop_challenges.zip")} />
		</p>
		<p>
			<strong>Workshop presentation:</strong>
			<DocumentLink
				link={asset("/documents/2024-2025/events/workshop/workshop_presentation.pptx")}
			/>
		</p>

		<hr />
		<div class="sponsor-logos">
			<enhanced:img src={sickLogo} alt="sick logo" />
			<enhanced:img src={sectraLogo} alt="sectra logo" />
		</div>
	</Article>
</ArticleGroup>

<style lang="scss">
	@use "$lib/styles/color";
	@use "$lib/styles/mixin";

	img {
		max-width: 100%;
	}

	.sponsor-logos {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		margin: 1rem 0;

		img {
			height: 2rem;
		}
	}
</style>
