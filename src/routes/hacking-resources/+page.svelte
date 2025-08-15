<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title="Member"
	description="Join LiTHe Hax and gain access to exclusive events, resources, and updates - become a member today!"
/>

<ArticleGroup layout="thin">
	<Article>
		<h1>Hacking resources</h1>
		<p>
			Here are some hacking resources to get you started. The resources are intended for educational
			purposes only. Always ensure you have permission before testing or hacking any system.
		</p>
		<div class="card">
			<h3>Legal and policy information</h3>
			<p>
				Swedish criminal code, Chapter 4, paragraphs <a
					href="https://lagen.nu/1962:700#K4P8S1"
					rel="noopener noreferrer">8</a
				>
				and <a href="https://lagen.nu/1962:700#K4P9cS1" rel="noopener noreferrer">9c</a>
			</p>
		</div>
		<div class="card">
			<h3>Hacking basics</h3>
			<p>
				<a href="https://tryhackme.com/" rel="noopener noreferrer">Tryhackme</a> is a gamified cybersecurity
				platform with hands-on labs and challenges for learning ethical hacking and SOC at any skill
				level.
			</p>
			<p>
				<a href="https://www.hackthebox.com/" rel="noopener noreferrer">Hack The Box</a> is a platform
				that provides a variety of challenges and labs for learning ethical hacking and penetration testing.
			</p>
			<p>
				<a href="https://play.picoctf.org/practice" rel="noopener noreferrer">picoctf</a> is a free online
				platform that offers CTF challenges and competitions for students and beginners.
			</p>
		</div>

		<div class="card">
			<h3>Linux distributions</h3>
			<p>
				<a href="https://www.kali.org/" rel="noopener noreferrer">Kali Linux</a> is a Debian-based Linux
				distribution that comes pre-installed with a wide range of security tools for penetration testing
				and ethical hacking.
			</p>
			<p>
				<a href="https://www.parrotsec.org/" rel="noopener noreferrer">Parrot Security OS</a> is another
				Debian-based Linux distribution that provides a suite of security tools for ethical hacking and
				penetration testing.
			</p>
		</div>

		<div class="card">
			<h3>Tools</h3>
			<p>
				<a href="https://www.nmap.org/" rel="noopener noreferrer">Nmap</a> is a network scanning tool
				used for scanning ip addresses and ports in a network.
			</p>
			<p>
				<a href="https://www.wireshark.org/" rel="noopener noreferrer">Wireshark</a> is a network protocol
				analyzer that allows you to capture and interactively browse the traffic running on a network.
			</p>
			<p>
				<a href="https://www.burpsuite.com/" rel="noopener noreferrer">Burp Suite</a> is a collection
				of tools used for pentesting web applications.
			</p>
			<p>
				<a href="https://www.openwall.com/john/" rel="noopener noreferrer">John the ripper</a> John the
				ripper is a free and open-source password cracking software tool that supports various encryption
				algorithms.
			</p>
		</div>

		<div class="card">
			<h3>Finding vulnerabilities</h3>
			<p>
				<a href="https://www.cvedetails.com/" rel="noopener noreferrer">CVE Details</a> is a database
				of known vulnerabilities and exposures, providing information on security issues in software
				and hardware.
			</p>
			<p>
				<a href="https://www.exploit-db.com/" rel="noopener noreferrer">Exploit Database</a> is a public
				and open source database for exploits and vulnerabilities, providing a searchable database of
				known security issues and their corresponding exploits.
			</p>
			<p>
				<a href="https://owasp.org/www-project-top-ten/" rel="noopener noreferrer">OWASP top ten</a>
				is a list of the top ten most critical web application security risks.
			</p>
		</div>
	</Article>
</ArticleGroup>

<style lang="scss">
	.card {
		background: #1e1e1e;
		color: #ddd;
		padding: 1rem;
	}
	.card:hover {
		background: #2e2e2e;
	}
</style>
