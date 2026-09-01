const initialState = {
    cart: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalPrice: 0,
    cartId: null,
};

export const cartReducer = (
    state = initialState,
    action
) => {

    switch (action.type) {

        /* =====================================================
           ADD TO CART
        ===================================================== */
        case "ADD_TO_CART": {

            const productToAdd = action.payload;

            const existingProduct = state.cart.find(
                (item) =>
                    Number(item.productId) ===
                    Number(productToAdd.productId)
            );

            if (existingProduct) {

                const updatedCart = state.cart.map(
                    (item) => {

                        if (
                            Number(item.productId) ===
                            Number(productToAdd.productId)
                        ) {
                            return {
                                ...item,
                                ...productToAdd,
                                quantity:
                                    Number(item.quantity || 0) +
                                    Number(productToAdd.quantity || 1),
                            };
                        }

                        return item;
                    }
                );

                return {
                    ...state,
                    cart: updatedCart,
                };
            }

            return {
                ...state,
                cart: [
                    ...state.cart,
                    productToAdd,
                ],
            };
        }


        /* =====================================================
           UPDATE CART QUANTITY
        ===================================================== */
        case "UPDATE_CART_QUANTITY": {

            const updatedCart = state.cart.map(
                (item) => {

                    if (
                        Number(item.productId) ===
                        Number(action.payload.productId)
                    ) {
                        return {
                            ...item,
                            quantity:
                                Number(action.payload.quantity),
                        };
                    }

                    return item;
                }
            );

            return {
                ...state,
                cart: updatedCart,
            };
        }


        /* =====================================================
           REMOVE FROM CART
        ===================================================== */
        case "REMOVE_FROM_CART": {

            const updatedCart = state.cart.filter(
                (item) =>
                    Number(item.productId) !==
                    Number(action.payload.productId)
            );

            return {
                ...state,
                cart: updatedCart,
            };
        }


        /* =====================================================
           CLEAR CART
        ===================================================== */
        case "CLEAR_CART": {
            return {
                ...state,
                cart: [],
                totalPrice: 0,
            };
        }


        /* =====================================================
           DEFAULT
        ===================================================== */
        default:
            return state;
    }
};