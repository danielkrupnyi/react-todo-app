export function loadState<T>(key: string): T[] | [] {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return [];
		}
		return JSON.parse(jsonState) as T[];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function saveState<T>(state: T, key: string): void {
	localStorage.setItem(key, JSON.stringify(state));
}
