import Typography from "@mui/material/Typography";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useCart, useInvalidateCart, useUpsertCart } from "~/queries/cart";
import { CartItem } from "~/models/CartItem";

type AddProductToCartProps = {
  productId: string;
};

export default function AddProductToCart({ productId }: AddProductToCartProps) {
  const { data, isFetching } = useCart();
  const { mutate: upsertCart } = useUpsertCart();
  const invalidateCart = useInvalidateCart();
  const cartItem = data?.items.find((i) => i.product_id === productId);

  const addProduct = () => {
    if (data) {
      upsertCart(
        {
          product_id: productId,
          count: cartItem ? +cartItem.count + 1 : 1,
          cart_id: data.id,
        },
        { onSuccess: invalidateCart }
      );
    }
  };

  const removeProduct = () => {
    if (cartItem) {
      upsertCart(
        { ...cartItem, count: cartItem.count - 1 },
        { onSuccess: invalidateCart }
      );
    }
  };

  return cartItem ? (
    <>
      <IconButton disabled={isFetching} onClick={removeProduct} size="large">
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{cartItem.count}</Typography>
      <IconButton disabled={isFetching} onClick={addProduct} size="large">
        <Add color={"secondary"} />
      </IconButton>
    </>
  ) : (
    <IconButton disabled={isFetching} onClick={addProduct} size="large">
      <CartIcon color={"secondary"} />
    </IconButton>
  );
}
