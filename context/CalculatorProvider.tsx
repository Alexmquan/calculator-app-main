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
  rules: any[];
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
  const [rules, setRules] = useState([
    "Calculate the best MOS for a surprise!",
  ]);
  const [cards, setCards] = useState({ first: 0, second: 0 });
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  useEffect(() => {
    console.log("the cards", cards);
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

  const NormalMode = (keyValue: KeyType) => {
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
      return NormalMode(keyValue);
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

    console.log("[Checking formula]", formula);
    const solution = `${eval(formula)}`;
    setValue(`${eval(formula)}`);

    CheckForGame(solution, gameStart, setValue, setRules);
    // NOTE History logic
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
    }

    if (game) {
      switch (keyValue) {
        case "+":
        case "-":
          console.log("[handleKeyPress - + or -/first card]", cards.first);
          console.log("[handleKeyPress - + or -/second card]", cards.second);
          handleOperatorKeyPress(keyValue);
          return;
        case "del":
          setRules(["Calculate the best MOS for a surprise!"]);
          setValue("0");
          gameStart(false);
          setScore({ wins: 0, losses: 0, ties: 0 });
          return;
        case "reset":
          setCards({
            first: Math.ceil(Math.random() * 10),
            second: Math.ceil(Math.random() * 10),
          });
          return;
      }
    }
  };

  function handleGame(keyValue: string) {
    let firstCard = cards.first;
    let secondCard = cards.second;

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
          secondCard +
          suits[Math.floor(Math.random() * suits.length)] +
          "]"
      );
      return;
    }

    if (keyValue == "+" && Number(firstCard) < Number(secondCard)) {
      setSecondCardValue();
      setTimeout(winMessage, 1800);
    } else if (keyValue == "+" && Number(firstCard) > Number(secondCard)) {
      setSecondCardValue();
      setTimeout(loseMessage, 1800);
    } else if (Number(firstCard) == Number(secondCard)) {
      setSecondCardValue();
      setTimeout(drawMessage, 1800);
    } else if (keyValue == "-" && Number(firstCard) < Number(secondCard)) {
      setSecondCardValue();
      setTimeout(loseMessage, 1800);
    } else if (keyValue == "-" && Number(firstCard) > Number(secondCard)) {
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
        rules,
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

function CheckForGame(solution: any, gameStart, setValue, setRules) {
  if (solution == "2821") {
    gameStart(true);
    setValue("Let Play!");
    // NOTE may change to object with key value pairs title: "welcome to..." for easier manipulation.
    setRules([
      "Welcome to High Card - Low Card!",
      "--------------------------------",
      "Here are the rules:",
      "1. I will show you a card and you choose if the next card drawn will be higher (+) or lower (-).",
      "2. If you guess correctly you win!",
      "---------------------------------",
      "Game Controls:",
      '"RESET" Starts new game',
      '"+ or -" Guesses if next card is higher or lower than last card',
      '"DELETE" Exits game back to calculator',
      "----------------------------------",
      "Have Fun!",
    ]);
  }
}

export { CalculatorProvider, useCalculatorContext };
