import React, { createContext, useContext, useReducer } from "react";
import { Meal } from "../types/Meal";
import { Drink } from "../types/Drink";

export enum ActionType {
  ADD_MEAL = "ADD_MEAL",
  UPDATE_MEAL = "UPDATE_MEAL",
  REMOVE_MEAL = "REMOVE_MEAL",
  EMPTY_CART = "EMPTY_CART",
  SET_CURRENT_MEAL = "SET_CURRENT_MEAL",
  SET_DRINK = "SET_DRINK",
}

interface AddMealAction {
  type: ActionType.ADD_MEAL;
  payload: Meal;
}

interface UpdateMealAction {
  type: ActionType.UPDATE_MEAL;
  payload: Meal;
}

interface RemoveMealAction {
  type: ActionType.REMOVE_MEAL;
  payload: string;
}

interface EmptyCartAction {
  type: ActionType.EMPTY_CART;
}

interface SetCurrentMealAction {
  type: ActionType.SET_CURRENT_MEAL;
  payload: string;
}

interface SetDrink {
  type: ActionType.SET_DRINK;
  payload: Drink | undefined;
}

type CartAction =
  | AddMealAction
  | UpdateMealAction
  | RemoveMealAction
  | EmptyCartAction
  | SetCurrentMealAction
  | SetDrink;

interface CartState {
  meals: Meal[];
  currentMealId?: string;
}

const initialState: CartState = {
  meals: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ActionType.ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case ActionType.UPDATE_MEAL:
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === action.payload.id ? action.payload : meal
        ),
      };
    case ActionType.REMOVE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.payload),
      };
    case ActionType.EMPTY_CART:
      return {
        ...state,
        meals: [],
      };
    case ActionType.SET_CURRENT_MEAL:
      return {
        ...state,
        currentMealId: action.payload,
      };
    case ActionType.SET_DRINK:
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === state.currentMealId
            ? { ...meal, drink: action.payload }
            : meal
        ),
      };
    default:
      return state;
  }
};

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
