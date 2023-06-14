import { useCalculatorContext } from "context";

const Scoreboard = () => {
  const { score } = useCalculatorContext();

  return (
    <div className="bg-skin-screen text-skin-switcher p-4 w-80 rounded-xl ">
      <h1 className="mb-3 text-3xl">
        <u>Score</u>
      </h1>
      <div>Wins: {score["wins"]}</div>
      <div>Losses: {score["losses"]}</div>
      <div>Ties: {score["ties"]}</div>
    </div>
  );
};

export { Scoreboard };
