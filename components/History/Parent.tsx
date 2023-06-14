import { useCalculatorContext } from "context";
import { History } from "./History";
import { Scoreboard } from "./Scoreboard";

const Parent = () => {
  const { game } = useCalculatorContext();

  return <div>{game ? <Scoreboard /> : <History />}</div>;
};

export { Parent };
