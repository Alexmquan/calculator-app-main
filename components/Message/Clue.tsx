import OpenIcon from "../icons/open-icon";

const Clue = () => {
  return (
    <div className=" px-2 my-3">
      <div className="flex items-center text-skin-switcher">
        <div className="rounded-full bg-skin-screen  p-2 mb-4">
          <OpenIcon />
        </div>
        <div className=" p-2 mb-4">
          <h1>Calculate the best MOS for a surprise!</h1>
        </div>
      </div>
    </div>
  );
};

export { Clue };
