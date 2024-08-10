import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { Navigate } from "react-router-dom";

const BASE_URL = `http://localhost:8000`;

export default function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
				console.log(data);
			} catch (err) {
				alert("there was some error loading data");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	// console.log(cities, isLoading, setCities, setIsLoading);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<Navigate replace to="cities" />} />
					<Route
						path="cities"
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="cities/:id" element={<City />} />
					<Route
						path="countries"
						element={<CountriesList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
