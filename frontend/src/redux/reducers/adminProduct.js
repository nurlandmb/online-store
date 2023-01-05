import {
  PRODUCT_EDIT,
  PRODUCT_EDIT_CLOSE,
  PRODUCT_EDIT_START,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
} from '../actionTypes';

const initialState = {
  product: {
    category: '',
    description: '',
    image: '',
    isPopular: false,
    isVisible: true,
    name: '',
    price: '',
    priceWithDiscount: null,
  },
  popularProducts: [],
  popupActive: false,
  error: false,
  isLoading: false,
};

const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_EDIT:
      return { ...state, popupActive: true, product: action.payload };
    case PRODUCT_EDIT_CLOSE:
      return {
        ...state,
        popupActive: false,
        product: {
          category: '',
          description: '',
          image: '',
          isPopular: false,
          discount: false,
          isVisible: true,
          name: '',
          price: '',
          priceWithDiscount: '',
          type: 'create'
        },
      };
    case PRODUCT_EDIT_START:
      return { ...state, isLoading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { ...state, isLoading: false, popupActive: false };
    case PRODUCT_EDIT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default adminProductReducer;
