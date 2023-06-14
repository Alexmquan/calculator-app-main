import Head from "next/head";

import { ThemeSwitcher } from "components";
import { Calculator } from "components/calculator";
import { History } from "components/History";
import { Special } from "components/Special";
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
          <Special />
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

/* NOTE Leaving all my notes Here

1. First check im doing after installing dependencies is checking which calculations actually work.
2. Multiplication on lower number works but seems to be giving trouble when multiplying higher numbers.
3. When multiplying 1*1000 receive error **Octal literals are not allowed on strict mode. coming from context\calculatorProvider.tsx under setValue(`${eval(formula)}`).  may be interpolated wrong?
4. Continued testing of calculator. 500*500 & 999*999 gives correct outcome so it seems to have a problem when one value is higher than 1000.
5. Continued testing calculator. Can string together calculations up until you try to string 1000.
6. other operators are not working above 1000 either
7. Created bug report.
8. Calculator is removing any input after 3 numbers. 4200 is calculating as if it was 200 so 4200 + 4 = 204.
9. May be a regex error with formatting input past 3rd digit.
10. Ran a console.log on formula before value is set. Discovered Formula still has comma in it.
11. Added second regex .replace on fixed expression to replace comma with "".
12. Issue was that a comma is NaN and was being inserted into calculations causing failure.
13. Discovered bug is still an issue at numbers higher than 1 million.
14. Added another regex expression on formula so entire output is checked for commas.
15. Refactored bug fix. Only needed one of the regex expressions.

Adding History
1. Created History Component/file.
2. Added history state in calculator provider
3. Created setter function that concats last formula onto history.
4. added conditionals so max history is 5
5. Added styling and made mobile friendly
*/
