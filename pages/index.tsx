import Head from "next/head";

import { ThemeSwitcher } from "components";
import { Calculator } from "components/calculator";
import { MessageParent } from "components/Message";
import { Parent } from "components/History/Parent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta
          name="description"
          content="Calculator app solution for frontendmentor challenge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="w-full min-h-[inherit] flex justify-center items-center grid xl:grid-cols-3 font-spartan bg-skin-main transition-all duration-200 ease-in-out">
        <div>
          <MessageParent />
        </div>
        <div className="md:pb-3 xl:pb-0 flex flex-col w-12/12 sm:min-w-[350px] sm:w-[65vh] max-w-[550px] xs:mx-3">
          <CalculatorHeader />
          <Calculator />
        </div>
        <div className="my-4 flex justify-center">
          <Parent />
        </div>
      </main>
    </>
  );
}

const CalculatorHeader = () => (
  <div className="flex justify-between items-center w-full mb-8">
    <h1 className="text-3xl text-skin-switcher font-spartan">calc</h1>
    <ThemeSwitcher />
  </div>
);
