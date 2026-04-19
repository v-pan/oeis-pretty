import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q');
	let json = null;

	console.log(`query=${query}`);

	if (query !== null) {
		const res = await fetch(`https://oeis.org/search?q=${encodeURIComponent(query)}&fmt=json`);
		json = await res.json();
	}

	return {
		post: {
			title: `Sequences matching ${url.searchParams.get('q')}`
		},
		result: {
			json: json
		}
	};
};
