// Action Types
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// Initial State
const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  createOrderSuccess: false,
};

// Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        createOrderSuccess: false,
      };
    
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
        error: null,
      };
    
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [action.payload, ...state.orders],
        createOrderSuccess: true,
        error: null,
      };
    
    case FETCH_ORDERS_FAILURE:
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        createOrderSuccess: false,
      };
    
    default:
      return state;
  }
}
