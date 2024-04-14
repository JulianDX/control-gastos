import { formatCurrency } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { ExpenseType } from "../types";

type ExpenseListProps = {
  filter: ExpenseType[];
};

export const ExpenseList = ({ filter }: ExpenseListProps) => {
  const { dispatch } = useBudget();
  const displayCategory = (id: number) => {
    switch (id) {
      case 1:
        return "ahorro";
      case 2:
        return "comida";
      case 3:
        return "casa";
      case 4:
        return "gastos";
      case 5:
        return "ocio";
      case 6:
        return "salud";
      default:
        return "suscripciones";
    }
  };

  const leadingActions = (id: ExpenseType["id"]) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: "setActiveID", payload: { id } });
        }}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: ExpenseType["id"]) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({ type: "deleteExpense", payload: { id } })}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <ul className="space-y-4">
      {filter.map((expense) => {
        return (
          <div key={expense.id}>
            <SwipeableList>
              <SwipeableListItem
                leadingActions={leadingActions(expense.id)}
                trailingActions={trailingActions(expense.id)}
              >
                <li className="p-6 md:flex justify-between items-center bg-slate-100 rounded-lg w-full">
                  <div className="flex items-center gap-4">
                    <img
                      src={`img/icono_${displayCategory(expense.category)}.svg`}
                      alt="icono gasto"
                      className="w-24"
                    />
                    <div>
                      <p className="capitalize font-bold text-lg text-gray-700">
                        {displayCategory(expense.category)}
                      </p>
                      <p className="text-lg font-semibold">{expense.name}</p>
                      <p>{expense.date}</p>
                    </div>
                  </div>
                  <p className="font-black text-right text-2xl">
                    {formatCurrency(expense.quantity)}
                  </p>
                </li>
              </SwipeableListItem>
            </SwipeableList>
          </div>
        );
      })}
    </ul>
  );
};
