import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ url, fetch }) => {
	const query = url.searchParams.get('q');

	if (query == null) {
		return new Response(String('null'));
	}

	const res = await fetch(`https://oeis.org/search?q=${encodeURIComponent(query)}&fmt=json`);

	return res;
}) satisfies RequestHandler;
