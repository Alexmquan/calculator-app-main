import { useCalculatorContext } from "context";

const History = () => {
  const { history } = useCalculatorContext();
  // const newCalc = formula + "=" + `${eval(formula)}`;
  // const newFormula = formula;
  // const result = eval(newFormula);

  const states = [history];

  const AddToHistory = (formula, result) => {};

  return (
    <div>
      <div>
        <h1>{states}</h1>
      </div>
      <div></div>
    </div>
  );
};

export { History };
