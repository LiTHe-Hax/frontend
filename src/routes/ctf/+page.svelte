<script lang="ts">
	import { resolve } from "$app/paths";
	$effect(() => {
		window.location.href = resolve("/events");
	});
</script>
