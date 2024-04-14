import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { categories } from "../data/categories";
import { ExpenseTypeWithoutID, ExpenseType } from "../types";
import { useBudget } from "../hooks/useBudget";
import { v4 } from "uuid";
import { Alerta } from "./Alerta";

export const FormModal = () => {
  const { state, disponible } = useBudget();

  const [cantidadPrevia, setCantidadPrevia] = useState(0);

  const [expense, setExpense] = useState<ExpenseTypeWithoutID>({
    name: "",
    quantity: 0,
    category: 1,
    date: "",
  });

  const validateNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim(); // Trim any leading or trailing whitespace

    // Check if the input value is a valid number
    if (!isNaN(+e.target.value) && !isNaN(parseFloat(inputValue))) {
      setExpense({ ...expense, quantity: +inputValue });
    } else {
      setExpense({ ...expense, quantity: 0 });
    }
  };

  useEffect(() => {
    if (state.activeId !== "") {
      state.expenses.filter((expense) => {
        if (expense.id === state.activeId) {
          setExpense(expense);
          setCantidadPrevia(expense.quantity);
        }
      });
    }
  }, [state.activeId]);

  const [alerta, setAlerta] = useState<string>("");

  const { dispatch } = useBudget();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setAlerta("Hay campos vacíos");
      return;
    }

    setAlerta("");

    if (state.activeId !== "") {
      if (disponible + cantidadPrevia - expense.quantity < 0) {
        setAlerta("No tienes suficiente presupuesto");
        return;
      }
      dispatch({
        type: "updateExpense",
        payload: { expense: { ...expense, id: state.activeId } },
      });
    } else {
      if (disponible - expense.quantity < 0) {
        setAlerta("No tienes suficiente presupuesto");
        return;
      }
      const newExpense: ExpenseType = {
        ...expense,
        id: v4(),
      };
      dispatch({ type: "addExpense", payload: { expense: newExpense } });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="text-center text-2xl font-black border-b-4 py-2 border-blue-500">
      {`${state.activeId !== "" ? "Actualizar Gasto" : "Nuevo Gasto"}`}
      </legend>
      {alerta !== "" && <Alerta alerta={alerta} />}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade un Gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.name}
          onChange={(e) => setExpense({ ...expense, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseQuantity" className="text-xl">
          Costo
        </label>
        <input
          type="tel"
          id="expenseQuantity"
          placeholder="100, 200, 300..."
          className="bg-slate-100 p-2"
          name="expenseQuantity"
          min={0}
          value={expense.quantity}
          onChange={(e) => validateNumber(e)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseQuantity" className="text-xl">
          Categoría
        </label>
        <select
          name="expenseCategory"
          id="expenseCategory"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={(e) =>
            setExpense({ ...expense, category: +e.target.value })
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseDate" className="text-xl">
          Fecha
        </label>
        <input
          id="expenseDate"
          type="date"
          className="bg-slate-100 p-2"
          name="expenseDate"
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        />
      </div>
      <input
        type="submit"
        className="w-full bg-blue-500 p-2 text-white font-bold text-center rounded-lg cursor-pointer"
        value={`${state.activeId !== "" ? "Guardar Cambios" : "Crear Gasto"}`}
      />
    </form>
  );
};
