import { useCalculatorContext } from "context";
import icon from "./open_icon.svg";
import OpenIcon from "../icons/open-icon";

const Special = () => {
  const { special } = useCalculatorContext();

  function Message() {
    console.log("test");
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }

  return (
    <div className=" px-2 my-3">
      <div className="flex items-center">
        <div className="rounded-full bg-skin-screen text-skin-switcher p-2">
          <OpenIcon />
        </div>

        <h1 className="px-2">Calculate the best MOS for a surprise!</h1>
      </div>

      <img src={special} alt="" />
    </div>
  );
};

export { Special };
