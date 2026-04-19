<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	let {
		comments = [],
		elideAfter,
		step = comments.length,
		scrollTarget
	}: { comments?: string[]; elideAfter: number; step?: number; scrollTarget?: string } = $props();

	let limit = $state(0);
	let items = $derived(comments.slice(0, elideAfter + limit));

	$inspect(limit);
</script>

{#each items as comment}
	<p>{comment}</p>
{/each}
<button
	class="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline"
	onclick={async () => {
		if (limit + elideAfter >= comments.length) {
			limit = 0;

			if (!scrollTarget) return;
			await tick();
			goto(`#${scrollTarget}`);
		} else {
			limit += step;
		}
	}}
>
	Show {limit + elideAfter >= comments.length
		? 'less'
		: `more (${comments.length - (limit + elideAfter)})`}...
</button>
