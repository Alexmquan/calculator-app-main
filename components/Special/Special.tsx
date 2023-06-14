import { useCalculatorContext } from "context";
import OpenIcon from "../icons/open-icon";

const Special = () => {
  const { rules } = useCalculatorContext();

  return (
    <div className=" px-2 my-3">
      <div className="flex items-center text-skin-switcher flex-column">
        <div className="rounded-full bg-skin-screen  p-2 mb-4">
          <OpenIcon />
        </div>
      </div>
      {rules.map((d, i) => (
        <h1 key={i} className="px-2 text-skin-switcher">
          {d}
        </h1>
      ))}

      {/* <img src={special} alt="" /> */}
    </div>
  );
};

export { Special };
