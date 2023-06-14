import { useCalculatorContext } from "context";
import { Clue } from "./Clue";
import { Rules } from "./Rules";

const MessageParent = () => {
  const { game } = useCalculatorContext();

  return <div>{game ? <Rules /> : <Clue />}</div>;
};

export { MessageParent };
