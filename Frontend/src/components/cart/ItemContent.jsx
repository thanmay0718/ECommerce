import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import toast from "react-hot-toast";

import {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
} from "../../store/actions";

import {
    formatPrice,
    formatPriceCalculation,
} from "../../utils/formatPrice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
    productName,
    specialPrice,
    productId,
    quantity,
    discount,
    cartId,
    description,
    image,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(
        Number(quantity) || 1
    );

    const dispatch = useDispatch();

    const cartItem = {
        productId: Number(productId),
        productName,
        specialPrice,
        quantity: currentQuantity,
        discount,
        cartId,
        description,
        image,
    };

    // Increase quantity
    const handleQtyIncrease = () => {
        dispatch(
            increaseCartQuantity(
                cartItem,
                toast,
                currentQuantity,
                setCurrentQuantity
            )
        );
    };

    // Decrease quantity
    const handleQtyDecrease = () => {
        if (currentQuantity <= 1) {
            return;
        }

        const newQuantity = currentQuantity - 1;

        setCurrentQuantity(newQuantity);

        dispatch(
            decreaseCartQuantity(
                {
                    ...cartItem,
                    quantity: newQuantity,
                },
                newQuantity
            )
        );
    };

    // Remove item
    const handleRemove = () => {
        dispatch(
            removeFromCart(
                cartItem,
                toast
            )
        );
    };

    return (
        <div className="grid md:grid-cols-5 grid-cols-4 gap-6 items-center border-b border-premium-border/60 bg-premium-card px-6 py-6 transition-colors hover:bg-premium-bg/30">

            {/* Product */}
            <div className="md:col-span-2 justify-self-start flex items-center gap-5">
                {/* Product Image - Sleek Square Layout */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-premium-border bg-premium-bg">
                    <img
                        src={
                            image=
                                // ? `${import.meta.env.VITE_BACK_END_URL}/images/${image}` :
                                 "https://placehold.co/600x400?text=No+Image"
                        }
                        alt={productName}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-start gap-1">
                    <h3 className="text-sm font-semibold tracking-wide text-premium-charcoal">
                        {truncateText(productName, 30)}
                    </h3>
                    
                    {/* Remove */}
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="
                            flex
                            items-center
                            gap-1.5
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-red-500
                            transition-colors
                            hover:text-red-700
                            mt-1.5
                        "
                    >
                        <HiOutlineTrash size={13} />
                        Remove
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="justify-self-center text-sm font-semibold text-premium-charcoal tracking-wide">
                {formatPrice(Number(specialPrice) || 0)}
            </div>

            {/* Quantity */}
            <div className="justify-self-center">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}
                />
            </div>

            {/* Total */}
            <div className="justify-self-center text-sm font-bold text-premium-charcoal tracking-wide">
                {formatPriceCalculation(
                    currentQuantity,
                    specialPrice
                )}
            </div>

        </div>
    );
};

export default ItemContent;