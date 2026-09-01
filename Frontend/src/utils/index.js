import banner1 from "../assets/sliders/SmartTV.png";
import banner2 from "../assets/sliders/livingRoom.png";
import banner3 from "../assets/sliders/kidsClothing.png";
import { toast } from "react-hot-toast";

export const bannerList = [
  {
    id: 1,
    image: banner1,
    title: "Home Comfort",
    subtitle: "Living Room",
    description: "Upgrade your space with cozy and stylish sofas",
  },
  {
    id: 2,
    image: banner2,
    title: "Entertainment Hub",
    subtitle: "Smart TV",
    description: "Experience the latest in home entertainment",
  },
  {
    id: 3,
    image: banner3,
    title: "Playful Picks",
    subtitle: "Kids' Clothing",
    description: "Bright and fun styles for kids, up to 20% off",
}]

export const addToCart = (data, qty = 1) =>
  (dispatch) => {
    const productToAdd = {
      ...data,
      id: data?.productId || data?.id,
      quantity: Number(qty) || 1,
    };

    if (!productToAdd.id) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: productToAdd,
    });
};
