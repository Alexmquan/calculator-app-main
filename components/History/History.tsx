import { useCalculatorContext } from "context";
import classes from "./history.module.css";

const History = () => {
  const { history } = useCalculatorContext();

  return (
    <div className="bg-skin-screen text-skin-switcher p-4 w-80 rounded-xl ">
      <h1 className="mb-3 text-3xl">
        <u>History</u>
      </h1>
      {history.map((s) => <div key={s}>{s}</div>).reverse()}
    </div>
  );
};

export { History };
