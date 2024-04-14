import { ExpenseType } from "../types";

export type BudgetActions =
  | { type: "defineBudget"; payload: { budget: number } }
  | { type: "modalVisible" }
  | { type: "hideModal" }
  | { type: "addExpense"; payload: { expense: ExpenseType } }
  | { type: "updateExpense"; payload: { expense: ExpenseType } }
  | { type: "deleteExpense"; payload: { id: ExpenseType["id"] } }
  | { type: "setActiveID"; payload: { id: ExpenseType["id"] } }
  | { type: "restartApp" };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: ExpenseType[];
  activeId: ExpenseType["id"];
};

const getStorageBudget = () => {
  return Number(JSON.parse(localStorage.getItem("budget")!));
};

const getStorageExpenses = () => {
  return JSON.parse(localStorage.getItem("expenses")!);
};

export const initialState: BudgetState = {
  budget: getStorageBudget() || 0,
  modal: false,
  expenses: getStorageExpenses() || [],
  activeId: "",
};

export const budgetReducer = (
  state: typeof initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "defineBudget":
      return {
        ...state,
        budget: action.payload.budget,
      };
    case "modalVisible":
      return {
        ...state,
        modal: !state.modal,
      };
    case "hideModal":
      return {
        ...state,
        modal: false,
        activeId: "",
      };
    case "addExpense":
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
        modal: false,
      };
    case "updateExpense":
      return {
        ...state,
        modal: false,
        activeId: "",
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
      };
    case "setActiveID":
      return {
        ...state,
        modal: true,
        activeId: action.payload.id,
      };
    case "deleteExpense":
      return {
        ...state,
        activeId: "",
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "restartApp":
      return {
        ...state,
        budget: 0,
        modal: false,
        expenses: [],
        activeId: "",
      };
    default:
      return state;
  }
};
