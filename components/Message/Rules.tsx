import OpenIcon from "../icons/open-icon";

const Rules = () => {
  return (
    <div className=" px-2 my-3">
      <div className="flex items-center text-skin-switcher flex-column">
        <div className="rounded-full bg-skin-screen  p-2 mb-4">
          <OpenIcon />
        </div>
      </div>
      <div className="px-2 text-skin-switcher">
        <h2>Welcome to High Card - Low Card!</h2>
        <h2>--------------------------------</h2>
        <h2>Here are the rules:</h2>
        <h2>
          1. I will show you a card and you choose if the next card drawn will
          be higher (+) or lower (-).
        </h2>
        <h2>2. If you guess correctly you win!</h2>
        <h2>---------------------------------</h2>
        <h2>Game Controls:</h2>
        <h2>"RESET" Starts new game</h2>
        <h2>"+ or -" Guesses if next card is higher or lower than last card</h2>
        <h2>"DELETE" Exits game back to calculator</h2>
        <h2>----------------------------------</h2>
        <h2>Have Fun!</h2>
      </div>
    </div>
  );
};

export { Rules };
