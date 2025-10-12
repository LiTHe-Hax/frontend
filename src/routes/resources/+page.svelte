<script>
	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import CollapsableSection from "$lib/components/CollapsableSection.svelte";
	import Heading from "$lib/components/Heading.svelte";
	import Link from "$lib/components/Link.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title="Hacking Resources"
	description="A page for hacking resources and tools as well as other important information such as laws and news"
/>

<ArticleGroup layout="thin">
	<Article>
		<Heading level={1} content="Hacking Resources" />
		<CollapsableSection title="Legal and policy information">
			<p>
				Swedish criminal code, Chapter 4, paragraphs
				<Link href="https://lagen.nu/1962:700#K4P8S1" rel="noopener noreferrer">8</Link>
				and
				<Link href="https://lagen.nu/1962:700#K4P9cS1" rel="noopener noreferrer">9c</Link>
			</p>
		</CollapsableSection>
		<CollapsableSection title="Hacking basics">
			<p>
				<Link href="https://tryhackme.com/" rel="noopener noreferrer">Tryhackme</Link> is a gamified
				cybersecurity platform with hands-on labs and challenges for learning ethical hacking and SOC
				at any skill level.
			</p>
			<p>
				<Link href="https://www.hackthebox.com/" rel="noopener noreferrer">Hack The Box</Link> is a platform
				that provides a variety of challenges and labs for learning ethical hacking and penetration testing.
			</p>
			<p>
				<Link href="https://play.picoctf.org/practice" rel="noopener noreferrer">picoctf</Link> is a
				free online platform that offers CTF challenges and competitions for students and beginners.
			</p>
		</CollapsableSection>
		<CollapsableSection title="Linux distributions">
			<p>
				<Link href="https://www.kali.org/" rel="noopener noreferrer">Kali Linux</Link> is a Debian-based
				Linux distribution that comes pre-installed with a wide range of security tools for penetration
				testing and ethical hacking.
			</p>
			<p>
				<Link href="https://www.parrotsec.org/" rel="noopener noreferrer">Parrot Security OS</Link> is
				another Debian-based Linux distribution that provides a suite of security tools for ethical hacking
				and penetration testing.
			</p>
		</CollapsableSection>
		<CollapsableSection title="Tools">
			<p>
				<Link href="https://www.nmap.org/" rel="noopener noreferrer">Nmap</Link> is a network scanning
				tool used for scanning ip addresses and ports in a network.
			</p>
			<p>
				<Link href="https://www.wireshark.org/" rel="noopener noreferrer">Wireshark</Link> is a network
				protocol analyzer that allows you to capture and interactively browse the traffic running on
				a network.
			</p>
			<p>
				<Link href="https://www.burpsuite.com/" rel="noopener noreferrer">Burp Suite</Link> is a collection
				of tools used for pentesting web applications.
			</p>
			<p>
				<Link href="https://www.openwall.com/john/" rel="noopener noreferrer">John the ripper</Link>
				John the ripper is a free and open-source password cracking software tool that supports various
				encryption algorithms.
			</p>
		</CollapsableSection>
		<CollapsableSection title="Finding vulnerabilities">
			<p>
				<Link href="https://www.cvedetails.com/" rel="noopener noreferrer">CVE Details</Link> is a database
				of known vulnerabilities and exposures, providing information on security issues in software
				and hardware.
			</p>
		</CollapsableSection>
	</Article>
</ArticleGroup>
