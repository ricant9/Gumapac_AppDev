// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // Add other properties as needed
}

interface CartState {
  items: CartItem[];
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: { id: string };
}

interface UpdateCartItemAction {
  type: typeof UPDATE_CART_ITEM;
  payload: CartItem;
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

type CartAction =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemAction
  | ClearCartAction;

// Initial State
const initialState: CartState = {
  items: [],
};

// Reducer
export default function cartReducer(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    
    case UPDATE_CART_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    
    default:
      return state;
  }
}
