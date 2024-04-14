import { useReducer, createContext, Dispatch, useMemo } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  gastado: number;
  disponible: number;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

type BudgetProviedProps = {
  children: React.ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviedProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const gastado = useMemo(() => {
    return state.expenses.reduce(
      (total, expense) => total + expense.quantity,
      0
    );
  }, [state.expenses]);

  const disponible = state.budget - gastado;

  return (
    <BudgetContext.Provider value={{ state, dispatch, gastado, disponible }}>
      {children}
    </BudgetContext.Provider>
  );
};
