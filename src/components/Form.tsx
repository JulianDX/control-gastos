import { useMemo, useState, ChangeEvent } from "react";
import { useBudget } from "../hooks/useBudget";

export const Form = () => {
  const [budget, setBudget] = useState(0);

  const { dispatch } = useBudget();

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (budget !== 0) {
      dispatch({ type: "defineBudget", payload: { budget } });
      setBudget(0);
    }
  };

  const validateNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim(); // Trim any leading or trailing whitespace

    // Check if the input value is a valid number
    if (!isNaN(+e.target.value) && !isNaN(parseFloat(inputValue))) {
      setBudget(+inputValue);
    } else {
      setBudget(0);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-500 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="tel"
          className="w-full bg-white border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          min={0}
          onChange={(e) => validateNumber(e)}
        />
      </div>
      <input
        type="submit"
        className="cursor-pointer disabled:cursor-not-allowed bg-blue-600 enabled:hover:bg-blue-700 disabled:opacity-50 w-full p-2 font-black text-white"
        value="Definir Presupuesto"
        disabled={isValid}
      />
    </form>
  );
};
