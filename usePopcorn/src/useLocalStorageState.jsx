import { useEffect, useState } from "react";

export function useLocalStorageState(intitialState, key) {
	const [value, setValue] = useState(() => {
		const storage = localStorage.getItem(key);

		return JSON.parse(storage) || intitialState;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}
