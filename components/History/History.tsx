import { useCalculatorContext } from "context";
import classes from "./history.module.css";

const History = () => {
  const { history } = useCalculatorContext();
  // const newCalc = formula + "=" + `${eval(formula)}`;
  // const newFormula = formula;
  // const result = eval(newFormula);

  const states = history;

  const updatedHistory = states.map((m) => {
    <div>{m}</div>;
  });
  console.log("[states]", states);

  // const AddToHistory = (formula, result) => {};

  return (
    <div className="bg-skin-screen text-skin-switcher p-4 w-60 rounded-xl ">
      <h1 className="mb-3 text-3xl">History</h1>
      {states.map((s) => (
        <div className="" key={s}>
          {s}
        </div>
      ))}
    </div>
  );
};

export { History };
