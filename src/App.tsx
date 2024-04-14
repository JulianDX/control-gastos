import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Form } from "./components/Form";
import { useBudget } from "./hooks/useBudget";
import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { categories } from "./data/categories";
import { ExpenseType } from "./types";

function App() {
  const { state } = useBudget();
  const [filter, setFilter] = useState<ExpenseType[]>(state.expenses);

  const saveLocalStorage = () => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    localStorage.setItem("budget", JSON.stringify(state.budget));
  };

  const isValidBudget = useMemo(() => {
    return state.budget === 0;
  }, [state.budget]);

  useEffect(() => {
    saveLocalStorage();
    setFilter(state.expenses)
  }, [state.expenses, state.budget]);

  const filtrar = (e: ChangeEvent<HTMLSelectElement>) => {
    let filteredArray: ExpenseType[] = [];
    if (e.target.value === "all") {
      filteredArray = state.expenses;
    } else {
      filteredArray = state.expenses.filter((expense) => {
        return expense.category === +e.target.value;
      });
    }
    setFilter(filteredArray);
  };

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase font-black text-3xl text-white text-center">
          Planificador de Gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? (
          <Form />
        ) : (
          <>
            <BudgetTracker />
            <ExpenseModal />
          </>
        )}
      </div>
      {state.expenses.length !== 0 ? (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10 mb-10">
          <h2 className="text-3xl text-gray-600 font-semibold">Resumen</h2>
          <p className="mb-3">
            Deslice hacia la derecha para actualizar o a la izquierda para
            eliminar.
          </p>
          <select
            name="filter"
            id="filter"
            className="bg-slate-100 p-2 mb-4"
            onChange={(e) => filtrar(e)}
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {filter.length > 0 ? (
            <>
              <ExpenseList filter={filter} />
            </>
          ) : <p>No se encontraron Gastos en esta Categoría</p>}
        </div>
      ) : (
        <>
          {state.budget !== 0 && (
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10 mb-10">
              <p>Aún no hay Gastos agregados</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
