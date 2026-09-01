const storedUser = localStorage.getItem("auth");
const storedAddress = localStorage.getItem("CHECKOUT_ADDRESS");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  address: [],
  selectedUserCheckoutAddress: storedAddress ? JSON.parse(storedAddress) : null,
  paymentMethod: "Stripe",
  clientSecret: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "USER_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    case "SELECT_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress: action.payload,
      };

    case "REMOVE_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress: null,
      };

    case "ADD_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };

    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return {
        ...state,
        clientSecret: null,
        selectedUserCheckoutAddress: null,
      };
    
    case "LOG_OUT":
      return {
        user: null,
        address: [],
        selectedUserCheckoutAddress: null,
        paymentMethod: "Stripe",
        clientSecret: null,
      };
      
    default:
      return state;
  }
};