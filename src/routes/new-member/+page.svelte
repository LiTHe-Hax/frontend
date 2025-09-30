<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import ArticleGroup from "$lib/components/ArticleGroup.svelte";
	import MembershipApplicationForm from "$lib/components/forms/MembershipApplicationForm.svelte";
	import Heading from "$lib/components/Heading.svelte";
	import PageHead from "$lib/components/PageHead.svelte";
</script>

<PageHead
	title="Member"
	description="Join LiTHe Hax and gain access to exclusive events, resources, and updates - become a member today!"
/>

<ArticleGroup layout="thin">
	<Article>
		<Heading level={1} content="Become a Member" />
		<p>
			Join LiTHe Hax and become a member! As a member, you'll gain access to exclusive events,
			resources, and updates about our organization's activities. Once your membership is approved
			by our board, we will contact you with further details.
		</p>
		<MembershipApplicationForm />
	</Article>
</ArticleGroup>
