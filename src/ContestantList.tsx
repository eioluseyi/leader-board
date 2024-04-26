import * as React from "react";
import { twMerge } from "tailwind-merge";
import Synopsis from "./Synopsis";

type ContestantProps = {
  rank: number;
  name: string;
  id: string;
  points: number;
  isNew: boolean;
};
const Contestant = ({ id, name, points, rank, isNew }: ContestantProps) => (
  <div
    className={twMerge(
      "relative isolate grid grid-cols-[auto_1fr_auto] bg-[#5E0B2A] [background-size:150%] bg-left gap-10 [text-shadow:_0px_2px_#0003] items-center py-5 pr-8 pl-5 border border-[#fff2] rounded-2xl shadow-[0px_5px_0px_0px_#5D0A2A] font-bold text-xl lg:text-3xl",
      rank === 1 &&
        "[background:linear-gradient(to_right,#E0AA3E,#FAD398,#E0AA3E)] text-[#E0AA3E] border-transparent",
      rank === 2 &&
        "[background:linear-gradient(to_right,#ABABAB,#DEDEDE,#ABABAB)] text-[#ABABAB] border-transparent",
      rank === 3 &&
        "[background:linear-gradient(to_right,#652410,#FAC697,#652410)] text-[#652410] border-transparent",
      rank >= 6 && "lg:hidden",
      rank >= 11 && "hidden"
    )}
    style={{ viewTransitionName: `contestant-${id}` }}
  >
    <div className="place-items-center grid bg-white [text-shadow:_0px_0px_#0000] rounded-full h-full text-xl aspect-square">
      {rank}
    </div>
    <div className="flex-1 text-white truncate">{name}</div>
    <div className="mr-0 ml-auto text-white">{points}</div>
    {/* {isNew ? (
      <div
        className="top-0 right-0 !z-20 absolute bg-orange-600 px-3 py-1 rounded-full text-white text-xs translate-x-[50%] translate-y-[-50%]"
        style={{ viewTransitionName: `new` }}
      >
        new
      </div>
    ) : null} */}
  </div>
);

const ContestantList = ({
  contestantArray,
}: {
  contestantArray: ContestantProps[];
}) => {
  return (
    <div className="gap-5 grid max-lg:pt-14">
      {!contestantArray.length ? (
        <div className="border-white opacity-30 mx-auto px-10 py-8 border border-dashed rounded-2xl w-fit font-semibold text-center text-white text-xl">
          Start buying to get on the board
        </div>
      ) : null}
      {contestantArray.map((itm) => (
        <Contestant key={itm.rank} {...itm} />
      ))}
      <div className="lg:hidden py-6 text-white text-xs">
        <Synopsis />
      </div>
    </div>
  );
};

export default ContestantList;
