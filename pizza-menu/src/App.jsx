import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Pizza({ pizza }) {
	return (
		<li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
			<img src={pizza.photoName} alt="" />
			<div>
				<h3>{pizza.name}</h3>
				<p>{pizza.ingredients}</p>
				<span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
			</div>
		</li>
	);
}

function Header() {
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	return (
		<main className="menu">
			<h2>Our Menu</h2>
			<ul className="pizzas">
				{pizzaData.map((pizza, idx) => (
					<Pizza key={idx} pizza={pizza} />
				))}
			</ul>
		</main>
	);
}

function Footer() {
	const hour = new Date().getHours();
	const openHour = 8;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;

	return (
		<footer className="footer">
			{isOpen && (
				<div className="order">
					<p>
						We're open untill {closeHour}:00. Come visit us or order online.
					</p>
					<button className="btn">Order</button>
				</div>
			)}
		</footer>
	);
}
export default App;
