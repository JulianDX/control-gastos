import { formatCurrency } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const BudgetTracker = () => {
  const { state, gastado, disponible, dispatch } = useBudget();

  const percentage = (gastado / state.budget) * 100;
  const finalPercentage = parseFloat(percentage.toFixed(2));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center font-bold">
        <CircularProgressbar
          styles={buildStyles({
            textSize: 10,
            textColor: `${percentage === 100 ? "#cf000e" : "#2563eb"}`,
            pathColor: `${percentage === 100 ? "#cf000e" : "#2563eb"}`,
          })}
          value={finalPercentage}
          text={`Gastado: ${finalPercentage}%`}
        />
      </div>
      <div className="flex flex-col justify-center gap-8">
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-700 w-full p-2 text-white font-bold rounded-lg"
          onClick={() => dispatch({ type: "restartApp" })}
        >
          Resetear App
        </button>
        <p className=" text-2xl text-blue-600 font-bold">
          Presupuesto: {""}
          <span className="font-black text-black">
            {formatCurrency(state.budget)}
          </span>
        </p>
        <p className=" text-2xl text-blue-600 font-bold">
          Disponible: {""}
          <span className="font-black text-black">
            {formatCurrency(disponible)}
          </span>
        </p>
        <p className=" text-2xl text-blue-600 font-bold">
          Gastado: {""}
          <span className="font-black text-black">
            {formatCurrency(gastado)}
          </span>
        </p>
      </div>
    </div>
  );
};
