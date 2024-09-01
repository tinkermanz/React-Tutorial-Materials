import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiResturent";
import MenuItem from "./MenuItem";

export default function Menu() {
	const menu = useLoaderData();
	console.log(menu);

	return (
		<ul>
			{menu.map((pizza) => (
				<MenuItem pizza={pizza} key={pizza.id} />
			))}
		</ul>
	);
}

export async function loader() {
	const menu = await getMenu();
	return menu;
}
