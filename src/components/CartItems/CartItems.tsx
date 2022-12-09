import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CartItem } from "~/models/CartItem";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { ContactSupportOutlined } from "@mui/icons-material";

type CartItemsProps = {
  items: CartItem[];
  isEditable: boolean;
};

export default function CartItems({ items, isEditable }: CartItemsProps) {
  const { data: products = [] } = useAvailableProducts();

  const getProduct = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const totalPrice: number = items.reduce(
    (total, item) =>
      item.count * (getProduct(item.product_id)?.price || 0) + total,
    0
  );

  return (
    <>
      <List disablePadding>
        {items.map((cartItem: CartItem) => {
          const productInfo = getProduct(cartItem.product_id);

          return (
            <ListItem
              sx={{ padding: (theme) => theme.spacing(1, 0) }}
              key={cartItem.product_id}
            >
              {isEditable && (
                <AddProductToCart productId={cartItem.product_id} />
              )}
              <ListItemText
                primary={productInfo?.title}
                secondary={productInfo?.description}
              />
              <Typography variant="body2">
                {formatAsPrice(productInfo?.price || 0)} x {cartItem.count} ={" "}
                {formatAsPrice(productInfo?.price || 0 * cartItem.count)}
                {productInfo?.price || 0 * cartItem.count}
              </Typography>
            </ListItem>
          );
        })}
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">Free</Typography>
        </ListItem>
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {formatAsPrice(totalPrice)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
