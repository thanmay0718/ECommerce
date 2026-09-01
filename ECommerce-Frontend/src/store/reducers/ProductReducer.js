const intialState = {
  products: null,
  categories: null,
  pagination: {},
};

export const ProductReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,  
          last: action.last,
        },
      };

      case 'FETCH_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,  
          last: action.last,
        },
      };
      default:
        return state;
  }
};