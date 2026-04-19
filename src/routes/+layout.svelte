<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<nav>
	<a href="/">Lookup</a>
	<a href="/music">Listen</a>
	<a href="/comparison-plot">Comparison Plot</a>
	<a href="/webcam">Best Sequences</a>
	<a href="/glossary">Glossary</a>
	<a href="/wiki">Wiki</a>
	<a href="/index">Index</a>
</nav>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
