import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { KeyType } from "types";

interface ICalculatorContext {
  expression: string;
  value: string;
  history: any[];
  game: boolean;
  cards: object;
  score: object;
  handleKeyPress: (_keyValue: KeyType) => void;
}

const CalculatorContext = createContext<ICalculatorContext | undefined>(
  undefined
);

interface ICalculatorProviderProps {
  children: ReactNode;
}

const operators = ["+", "-", "/", "x"];
const suits = ["♠", "♥", "♦", "♣"];

const CalculatorProvider: FC<ICalculatorProviderProps> = ({ children }) => {
  const [expression, setExpression] = useState("");
  const [value, setValue] = useState("0");
  const [operatorWasPressed, setOperatorWasPressed] = useState(false);
  const [numberWasPressed, setNumberWasPressed] = useState(false);

  const [history, setHistory] = useState([]);
  const [game, gameStart] = useState(false);
  const [cards, setCards] = useState({ first: 0, second: 0 });
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const [gameSet, gameIsSet] = useState(false);

  useEffect(() => {
    if (cards.first) {
      setValue(
        "First Card - [" +
          cards.first +
          suits[Math.floor(Math.random() * suits.length)] +
          "]"
      );
    }
  }, [cards]);

  const handleKeysState = (keyValue: KeyType) => {
    switch (keyValue) {
      case ".":
      case "del":
      case "reset":
        setNumberWasPressed(false);
        setOperatorWasPressed(false);
        return;
      case "+":
      case "-":
      case "x":
      case "/":
        setOperatorWasPressed(true);
        return;
      default:
        setOperatorWasPressed(false);
        setNumberWasPressed(true);
    }
  };

  const handleNumericKeyPress = (keyValue: KeyType) => {
    if (operatorWasPressed) {
      setValue(keyValue);
      return;
    }

    const numericValue = value.replace(/,/g, "");
    if (numericValue.length === 15) return;

    setValue(parseFloat(`${numericValue}${keyValue}`).toLocaleString());
  };

  const CalculatorMode = (keyValue: KeyType) => {
    const numberPressed = numberWasPressed;
    setNumberWasPressed(false);

    if (!expression.length) {
      setExpression(`${value}${keyValue}`);
      return;
    }

    if (numberPressed) {
      evaluateExpression();
      setExpression(`${expression}${value}${keyValue}`);
      return;
    }

    setExpression((expression) => `${expression.slice(0, -1)}${keyValue}`);
  };

  const handleOperatorKeyPress = (keyValue: KeyType) => {
    if (!game) {
      return CalculatorMode(keyValue);
    }
    // SECTION Game logic
    handleGame(keyValue);
  };

  const evaluateExpression = () => {
    if (!expression.length) {
      return;
    }
    const fixedExpression = expression.replace(/x/g, "*");

    // NOTE added .replace after computed formula so calculations work past one million
    const formula = numberWasPressed
      ? `${fixedExpression}${value}`.replace(/,/g, "")
      : fixedExpression.slice(0, -1);

    setNumberWasPressed(false);

    const solution = `${eval(formula)}`;
    setValue(`${eval(formula)}`);

    if (solution == "2821") {
      gameStart(true);
      setValue("Lets Play!");
    }

    //NOTE History logic
    addToHistory(formula);

    function addToHistory(formula) {
      const calc = formula + " = " + `${eval(formula)}`;
      const newArr = [calc];

      setHistory((prevHistory) => {
        if (prevHistory.length > 4) {
          prevHistory.splice(0, 1);
        }
        return prevHistory.concat(newArr);
      });
    }
  };

  const handleKeyPress = (keyValue: KeyType) => {
    if (!game) {
      handleKeysState(keyValue);
      switch (keyValue) {
        case "+":
        case "-":
        case "x":
        case "/":
          handleOperatorKeyPress(keyValue);
          return;
        case ".":
          if (value.includes(".")) return;
          setValue((value) => `${value}.`);
          return;
        case "=":
          evaluateExpression();
          setExpression("");
          return;
        case "del":
          if (value.length === 1) {
            setValue("0");
            return;
          }
          setValue((value) => {
            const newValue = value.slice(0, -1);
            if (newValue.at(-1) === ",") {
              return newValue.slice(0, -1);
            }
            return newValue;
          });
          return;
        case "reset":
          setExpression("");
          setValue("0");
          return;
        case "0":
          if (value === "0") {
            return;
          }
        default:
          handleNumericKeyPress(keyValue);
      }
    } else {
      switch (keyValue) {
        case "+":
        case "-":
          if (gameSet) {
            gameIsSet(false);
            handleOperatorKeyPress(keyValue);
            return;
          }
          return;
        case "del":
          setValue("0");
          gameStart(false);
          setScore({ wins: 0, losses: 0, ties: 0 });
          return;
        case "reset":
          gameIsSet(true);
          setCards({
            first: Math.ceil(Math.random() * 10),
            second: Math.ceil(Math.random() * 10),
          });
          return;
      }
    }
  };

  function handleGame(keyValue: string) {
    function loseMessage() {
      setValue("You Lose :(");
      score.losses++;
      return;
    }
    function winMessage() {
      setValue("You Win!!!");
      score.wins++;
      return;
    }
    function drawMessage() {
      setValue("Its a draw :/");
      score.ties++;
      return;
    }

    function setSecondCardValue() {
      setValue(
        "Second Card - [" +
          cards.second +
          suits[Math.floor(Math.random() * suits.length)] +
          "]"
      );
      return;
    }

    if (keyValue == "+" && Number(cards.first) < Number(cards.second)) {
      setSecondCardValue();
      setTimeout(winMessage, 1800);
    } else if (keyValue == "+" && Number(cards.first) > Number(cards.second)) {
      setSecondCardValue();
      setTimeout(loseMessage, 1800);
    } else if (Number(cards.first) == Number(cards.second)) {
      setSecondCardValue();
      setTimeout(drawMessage, 1800);
    } else if (keyValue == "-" && Number(cards.first) < Number(cards.second)) {
      setSecondCardValue();
      setTimeout(loseMessage, 1800);
    } else if (keyValue == "-" && Number(cards.first) > Number(cards.second)) {
      setSecondCardValue();
      setTimeout(winMessage, 1800);
    }
  }

  return (
    <CalculatorContext.Provider
      value={{
        expression,
        value,
        history,
        game,
        cards,
        score,
        handleKeyPress,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

const countOperators = (expression: string) =>
  expression
    .split("")
    .reduce(
      (acc, operator) => (operators.includes(operator) ? acc + 1 : acc),
      0
    );

const useCalculatorContext = () => useContext(CalculatorContext);

export { CalculatorProvider, useCalculatorContext };
