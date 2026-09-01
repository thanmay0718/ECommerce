const intialState = {
  isLoading: false,
  errorMessage: null,
  categoryLoader : false,
  categoryError : null,
};

export const errorReducer = (state = intialState, action) => {
  switch (action.type) {
    case "IS_FETCHING_PRODUCTS": {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };
    }
    case "IS_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };
    }
    case "IS_ERROR": {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    case "CATEGORY_SUCCESS": {
      return {
        ...state,
        categoryLoader: false,
        categoryError: null,
      };
    }
    case "CATEGORY_ERROR": {
      return {
        ...state,
        categoryLoader: false,
        categoryError: action.payload,
      };
    }
    case "IS_ERROR": {
      return {
        ...state,
        categoryLoader: true,
        categoryError: null,
      };
    }
    default:
      return state;
  }
};