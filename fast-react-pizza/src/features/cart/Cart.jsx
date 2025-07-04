import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { clearCart, getCart } from "./CartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";

export default function Cart() {
    const username = useSelector((state) => state.user.userName);

    const cart = useSelector(getCart);

    const dispatch = useDispatch();

    if (!cart.length) return <EmptyCart />;

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <h2 className="mt-7 text-xl font-semibold">
                Your Cart, {username}
            </h2>

            <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
                {cart.map((item) => (
                    <CartItem item={item} key={item.pizzaId} />
                ))}
            </ul>
            <div className="mt-6 space-x-2">
                <Button type="primary" to="/order/new">
                    Order pizzas
                </Button>

                <Button type="secondary" onClick={() => dispatch(clearCart())}>
                    Clear cart
                </Button>
            </div>
        </div>
    );
}
