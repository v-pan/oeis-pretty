<script lang="ts">
	import type { PageProps } from './$types';

	import showdown from 'showdown';
	import Comments from './comments.svelte';
	import { query } from '$app/server';
	const { Converter } = showdown;
	const converter = new Converter();

	let { data }: PageProps = $props();

	$inspect(data);

	const formatData = (rawData: string) => {
		const query: string = data.page.query.replace(/\s+/g, '');
		let formatted = rawData.replace(query, `<strong class="bg-amber-100 p-0.5">${query}</strong>`);
		formatted = formatted.replaceAll(',', ', ');

		return formatted;
	};
</script>

<svelte:head>
	<title>{data.page.query ? `Results for ${data.page.query}` : 'Prettier OEIS'}</title>
</svelte:head>

<main class="m-20 flex flex-col items-center gap-20 text-center font-serif">
	<h1 class="text-3xl font-semibold">Prettier OEIS</h1>

	<form class="flex max-w-3xl flex-col items-center gap-2" action="/" method="GET">
		<h2>Enter a sequence, word, or sequence number:</h2>

		<div class="flex flex-row">
			<input
				class="
				border-b border-slate-300
				p-2
				leading-tight
				text-gray-700
				transition-all
				ease-in-out
				hover:border-slate-500
				focus:border-slate-500
				focus:outline-none
				"
				type="text"
				placeholder="1, 1, 2, 3, 5"
				name="search"
				aria-label="sequence"
			/>
			<button
				class="
				hover:bg-slate-bg-slate-900
				shrink-0
				cursor-pointer
				rounded border-4
				border-slate-700
				bg-slate-700 px-2
				py-1 text-sm
				text-slate-50
				transition-all
				ease-in-out hover:border-slate-900
				hover:bg-slate-900"
				type="submit"
			>
				Search
			</button>
		</div>
	</form>

	{#if data.page.query}
		<section class="max-w-6xl">
			{#await data.result}
				<p>Searching...</p>
			{:then result}
				<ol class="flex flex-col gap-20">
					{#each result ?? [] as json}
						<li class="grid grid-cols-[min-content_auto] gap-5 text-left">
							<aside class="text-right text-lg text-mauve-400">{json.number}</aside>
							<h3 id={json.number} class="text-lg">{json.name}</h3>

							<aside></aside>
							<p class="font-mono font-semibold wrap-break-word font-stretch-110%">
								{@html formatData(json.data)}
							</p>

							<aside class="text-right text-mauve-400">Comments</aside>
							<section class="flex flex-col gap-2">
								<Comments
									elideAfter={5}
									comments={json.comment}
									scrollTarget={json.number}
									step={50}
								/>
							</section>

							<aside class="text-right text-mauve-400">Author</aside>
							<p>{@html converter.makeHtml(json.author)}</p>
						</li>
					{/each}
				</ol>
			{/await}
		</section>
	{/if}

	<p>
		For more information about the Encyclopedia, see the <a
			class="text-blue-500 visited:text-indigo-500 hover:text-blue-600 hover:underline"
			href="https://oeis.org/wiki/Welcome">Welcome</a
		> page.
	</p>
</main>
