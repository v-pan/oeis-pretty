import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q');

	console.log(`query=${query}`);

	const res = await fetch(`/api/search?q=${query}`);

	const json = await res.json();

	return {
		post: {
			title: `Sequences matching ${url.searchParams.get('q')}`
		},
		result: {
			json: json
		}
	};
};
