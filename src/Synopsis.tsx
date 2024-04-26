import * as React from "react";

const Synopsis = () => (
  <>
    <h2 className="mb-2 font-black text-2xl">The Taste Adventure</h2>
    <span className="text-xs">
      For the Taste Adventurer, the GTCO Food and Drink festival is not just an
      event, it’s a journey of the senses.
      <br />
      <br />
      Here's your opportunity to go on an incredible tasting adventure and stand
      a chance to win one of the 15 amazing Squad boxes filled with authentic
      flavors, tasty treats, and spices that will blow your taste buds away.
    </span>
    <br />
    <br />
    <b className="text-base">Here's how you can join the competition:</b>
    <br />
    {/* <br /> */}
    <ul className="gap-2 grid">
      <li>
        <b>STEP 1</b>
        <br />
        <div className="pl-3">
          Complete the adventure by shopping from at least 5 of the following
          categories:
          <br />
          <ul className="list-disc list-inside">
            <li>Confectioneries & Bakery</li>
            <li>Beverages & Drinks</li>
            <li>Packaged Goods</li>
            <li>Fresh foods</li>
            <li>Ready to Eat</li>
            <li>Restaurants</li>
          </ul>
        </div>
      </li>
      <li>
        <b>STEP 2</b>
        <div className="pl-3">
          Simply pay using the vendors'{" "}
          <b className="font-bold uppercase">Squad virtual accounts</b>.
        </div>
      </li>
      <li>
        <b>STEP 3</b>
        <div className="pl-3">
          Keep an eye on the leaderboard to track your progress.
        </div>
      </li>
      <li>
        <b>STEP 4</b>
        <div className="pl-3">
          The competition ends at 7pm daily. The top 5 adventurers with the most
          points by then should swing by the Experience Center (GTCO cube) to
          pick up their boxes.
        </div>
      </li>
    </ul>
    <br />
    <i>
      Keep up with all the excitement and exclusive updates by following us on{" "}
      <a href="https://instagram.com/officialsquadco" target="_blank">
        <b className="underline">Instagram</b>
      </a>{" "}
      and{" "}
      <a href="https://twitter.com/officialsquadco" target="_blank">
        <b className="underline">Twitter</b>
      </a>{" "}
      @officialsquadco.{" "}
      <a
        href="/docs/Terms and Conditions_The Taste Adventure.pdf"
        download
        target="_blank"
      >
        <b className="underline">Terms and Conditions</b>
      </a>{" "}
      apply.
      <br />
      You can also visit{" "}
      <a href="https://squadco.com" target="_blank">
        <b className="underline">squadco.com</b>
      </a>{" "}
      to learn more about our products and create a free account.
    </i>
  </>
);

export default Synopsis;
