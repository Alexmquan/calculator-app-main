import { useCalculatorContext } from "context";

const History = () => {
  const { history } = useCalculatorContext();

  return (
    <div className="bg-skin-screen text-skin-switcher p-4 w-80 rounded-xl ">
      <h1 className="mb-3 text-3xl">
        <u>History</u>
      </h1>
      <div>{history.map((s, i) => <div key={i}>{s}</div>).reverse()}</div>
    </div>
  );
};

export { History };
