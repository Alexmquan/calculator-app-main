import { useCalculatorContext } from "context";
import icon from "./open_icon.svg";
import OpenIcon from "../icons/open-icon";

const Special = () => {
  const { special, rules } = useCalculatorContext();
  let displayText = ["Calculate the best MOS for a surprise!", "1"];

  if (rules) {
    displayText = rules;
    console.log(displayText);
  }

  return (
    <div className=" px-2 my-3">
      <div className="flex items-center text-skin-switcher flex-column">
        <div className="rounded-full bg-skin-screen  p-2 mb-4">
          <OpenIcon />
        </div>
      </div>
      {displayText.map((d) => (
        <h1 key={d} className="px-2">
          {d}
        </h1>
      ))}

      {/* <img src={special} alt="" /> */}
    </div>
  );
};

export { Special };
