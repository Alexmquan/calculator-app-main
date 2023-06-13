import { createContext, FC, ReactNode, useContext, useState } from "react";

import { KeyType } from "types";

interface ICalculatorContext {
  expression: string;
  value: string;
  history: any[];
  special: string;
  game: boolean;
  rules: any[];
  handleKeyPress: (_keyValue: KeyType) => void;
}

const CalculatorContext = createContext<ICalculatorContext | undefined>(
  undefined
);

interface ICalculatorProviderProps {
  children: ReactNode;
}

const operators = ["+", "-", "/", "x"];

const CalculatorProvider: FC<ICalculatorProviderProps> = ({ children }) => {
  const [expression, setExpression] = useState("");
  const [value, setValue] = useState("0");
  const [operatorWasPressed, setOperatorWasPressed] = useState(false);
  const [numberWasPressed, setNumberWasPressed] = useState(false);

  const [history, setHistory] = useState([]);
  const [special, setSpecial] = useState("");
  const [game, gameStart] = useState(false);
  const [rules, setRules] = useState([
    "Calculate the best MOS for a surprise!",
  ]);
  // const [gameReset, setGameWasReset] = useState(false);
  // const [gameChoice, setGameChoice] = useState("");
  // const [gameDisplay, setGameDisplay] = useState("");
  const [firstCard, setFirstCard] = useState("8");
  const [secondCard, setSecondCard] = useState("4");

  const handleKeysState = (keyValue: KeyType) => {
    // if (game) {
    //   switch (keyValue) {
    //     case "reset":
    //       // NOTE start game here
    //       setGameWasReset(true);
    //       setGameChoice("");
    //       return;
    //     case "+":
    //       setGameChoice("+");
    //       return;
    //     case "-":
    //       setGameChoice("-");
    //       return;
    //     case "del":
    //       gameStart(false);
    //       return;
    //   }
    // }

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

  const handleOperatorKeyPress = (keyValue: KeyType) => {
    const suits = ["♠", " ♥", "♦", "♣"];

    if (!game) {
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
    }

    // SECTION Game logic

    function resetCards() {
      // setFirstCard("");
      // setSecondCard("");
      return;
    }

    function loseMessage() {
      setValue("You Lose :(");
      resetCards();
      return;
    }
    function winMessage() {
      setValue("You Win!!!");
      resetCards();
      return;
    }
    function drawMessage() {
      setValue("You Lose :(");
      resetCards();
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

    console.log("first card", firstCard);
    console.log("second card", secondCard);
    console.log("key value", keyValue);

    // FIXME must figure out what to do in off cases.
    if (keyValue == "+" && Number(firstCard) < Number(secondCard)) {
      setSecondCardValue();
      setTimeout(winMessage, 1800);
    } else if (keyValue == "+" && Number(firstCard) > Number(secondCard)) {
      setSecondCardValue();
      setTimeout(loseMessage, 1800);
      // FIXME can probably remove one draw function and remove keyValue of remaining one
    } else if (keyValue == "+" && Number(firstCard) == Number(secondCard)) {
      setSecondCardValue();
      setTimeout(drawMessage, 1800);
    } else if (keyValue == "-" && Number(firstCard) < Number(secondCard)) {
      setSecondCardValue();
      setTimeout(loseMessage, 1800);
    } else if (keyValue == "-" && Number(firstCard) > Number(secondCard)) {
      setSecondCardValue();
      setTimeout(winMessage, 1800);
      resetCards();
    } else if (keyValue == "-" && Number(firstCard) == Number(secondCard)) {
      setSecondCardValue();
      setTimeout(drawMessage, 1800);
    }
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

    setValue(`${eval(formula)}`);

    if (`${eval(formula)}` == "2821") {
      setSpecial(
        "https://www.hardchargertrainingcenter.com/wp-content/uploads/2018/10/United_States_Marine_Corps_Flag1.gif"
      );
      gameStart(true);
      setValue("Let Play!");
      // NOTE may change to object with key value pairs title: "welcome to..." for easier manipulation.
      setRules([
        "Welcome to High Card - Low Card!",
        "--------------------------------",
        "Here are the rules:",
        "1. I will show you a card and you choose if the next card will be higher or lower.",
        "2. If you guess correctly you win",
        "---------------------------------",
        "Game Controls:",
        '"reset" Starts new game',
        '"+ or -" Chooses high card or low card',
        '"Delete" Exits game back to calculator',
        "----------------------------------",
        "Have Fun!",
      ]);
    }
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

    // NOTE game logic
    if (game) {
      const suits = ["♠", "♥", "♦", "♣"];
      switch (keyValue) {
        case "+":
        case "-":
          console.log("[handleKeyPress - + or -/first card]", firstCard);
          console.log("[handleKeyPress - + or -/second card]", secondCard);
          handleOperatorKeyPress(keyValue);
          break;
        case "del":
          setRules(["Calculate the best MOS for a surprise!"]);
          setValue("0");
          gameStart(false);
          break;
        case "reset":
          // FIXME change suit, maybe remove suit
          console.log("[reset test]");
          console.log("[keyValue]", keyValue, firstCard, secondCard);
          setFirstCard(() => Math.ceil(Math.random() * 10).toString());
          setSecondCard(() => Math.ceil(Math.random() * 10).toString());
          if (Number(firstCard) > 0) console.log("number was set", firstCard);
          if (Number(secondCard) > 0) console.log("number was set", secondCard);
          // setValue("0");
          setValue(
            "First Card - [" +
              firstCard +
              suits[Math.floor(Math.random() * suits.length)] +
              "]"
          );
          console.log("[handleKeyPress - reset/first card]", firstCard);
          console.log("[handleKeyPress - reset/second card]", secondCard);
          break;
      }
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        expression,
        value,
        history,
        special,
        game,
        rules,
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
