// Action Types
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// Types
interface Order {
  id: string;
  items: any[]; // You can define a more specific type for items
  total: number;
  status: string;
  createdAt: string;
  // Add other order properties
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  createOrderSuccess: boolean;
}

interface FetchOrdersRequestAction {
  type: typeof FETCH_ORDERS_REQUEST;
}

interface FetchOrdersSuccessAction {
  type: typeof FETCH_ORDERS_SUCCESS;
  payload: Order[];
}

interface FetchOrdersFailureAction {
  type: typeof FETCH_ORDERS_FAILURE;
  payload: string;
}

interface CreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST;
  payload: { items: any[]; total: number };
}

interface CreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: Order;
}

interface CreateOrderFailureAction {
  type: typeof CREATE_ORDER_FAILURE;
  payload: string;
}

type OrdersAction =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction;

// Initial State
const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
  createOrderSuccess: false,
};

// Reducer
export default function ordersReducer(state: OrdersState = initialState, action: OrdersAction): OrdersState {
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
