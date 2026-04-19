import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	let response: any = {
		page: {
			title: `Sequences matching ${url.searchParams.get('q')}`
		}
	};

	const query = url.searchParams.get('search');

	if (query == null) {
		return response;
	}

	const json = fetch(`/api/search?q=${query}`).then((res) => res.json());

	response = {
		page: {
			query: query,
			...response.page
		},
		result: json
	};

	return response;
};
