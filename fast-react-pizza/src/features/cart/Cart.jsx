import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

const fakeCart = [
    {
        pizzaId: 12,
        name: "Mediterranean",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

export default function Cart() {
    const cart = fakeCart;
    return (
        <div>
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <h2>Your Cart, %Name%</h2>

            <div>
                <Button type="primary" to="/order/new">
                    Order pizzas
                </Button>
                <button>Clear Cart</button>
            </div>
        </div>
    );
}
