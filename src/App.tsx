import * as React from "react";
import ContestantList from "./ContestantList";
import { flushSync } from "react-dom";
import { twMerge } from "tailwind-merge";
import Timer from "./Timer";
import Pusher from "pusher-js";

function getRanks(array: any[]) {
  // Updating rank based on points
  const sortedPoints = [...array].sort((a, b) => b.points - a.points);
  const updatedRanks = sortedPoints.map((contestant, index) => ({
    ...contestant,
    rank: index + 1,
  }));

  const finalArray = [...updatedRanks].sort((a, b) => a.rank - b.rank);
  return finalArray;
}

// const contestantArray = [
//   { id: 'SR', name: 'Sophia Ramirez', points: 0, rank: 1 },
//   { id: 'EP', name: 'Ethan Patel', points: 0, rank: 2 },
//   { id: 'IW', name: 'Isabella Wang', points: 0, rank: 3 },
//   { id: 'LN', name: 'Liam Nguyen', points: 0, rank: 4 },
//   { id: 'MG', name: 'Mia Gupta', points: 0, rank: 5 },
// ]

const getProcessedData = (rawData: any[]) => {
  if (!rawData) return [];

  const newData = rawData.map((itm: { name: any; count: number }) => ({
    ...itm,
    id: itm.name,
    name: itm.name,
    points: itm.count * 5,
    rank: 1,
  }));
  const contestantArray = getRanks(newData);
  return contestantArray;
};

const handleTransitionFlush = (cb: () => void) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        cb();
      });
    });
  } else {
    cb();
  }
};

function App() {
  const [processedData, setProcessedData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const LEADERBOARD_URL = import.meta.env.VITE_FETCH_URL;
  const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;
  const PUSHER_CHANNEL = import.meta.env.VITE_PUSHER_CHANNEL;
  const PUSHER_EVENT = import.meta.env.VITE_PUSHER_EVENT;
  const PUSHER_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

  const getData = React.useCallback(async () => {
    try {
      const response = await fetch(LEADERBOARD_URL);
      const res = await response.json();

      const data = getProcessedData(res?.data || []);

      handleTransitionFlush(() => setProcessedData(data));
    } catch (err) {
      console.log({ err });
    } finally {
      setTimeout(() => handleTransitionFlush(() => setIsLoading(false)), 3000);
    }
  }, []);

  React.useEffect(() => {
    // const timer = setInterval(getData, 5000);
    handleTransitionFlush(() => setIsLoading(true));
    getData();
    // return () => clearInterval(timer);
  }, [getData]);

  React.useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true,
    } as any);
    const channel = pusher.subscribe(PUSHER_CHANNEL);
    channel.bind(PUSHER_EVENT, (data: any) => {
      const pusherData = getProcessedData(data || []);
      handleTransitionFlush(() => setProcessedData(pusherData));
    });

    return () => {
      channel.unbind(PUSHER_EVENT);
    };
  }, []);

  return (
    <div className="place-items-center grid app-wrapper h-[100svh] overflow-hidden">
      <div className="top-0 z-50 fixed flex justify-between items-center px-6 py-3 w-screen max-w-full">
        <span>
          <Timer />
        </span>
        <a
          href="https://squadco.com/"
          className="flex items-center gap-0.5 min-h-[2rem]"
        >
          {!isLoading ? (
            <img
              src="/assets/onion.png"
              className="brightness-[5] w-4 translate-y-0.5 contrast-200 grayscale object-contain"
              style={{ viewTransitionName: "logo" }}
            />
          ) : null}
          <span className="font-black text-white text-xl">squad</span>
        </a>
      </div>
      <div className="flex lg:items-center gap-10 p-6 w-screen max-w-5xl max-h-screen overflow-auto">
        <div className="lg:block flex-1 hidden">
          <div className="text-left text-white">
            <h1 className="grid mb-1 font-black text-5xl text-center">
              {/* <img src="/assets/The-Taste-Adventure.png" /> */}
              The Taste Adventure
            </h1>
            <p className="mb-10 text-center">
              Pay with Squad and stand a chance to win a Squad Box of Authentic
              Flavors.
            </p>
            <p className="mb-1 font-bold text-center uppercase">
              Scan code here to view more
            </p>
          </div>
          <div className="relative flex-1 place-items-center border-[#9a2720] border-8 grid bg-white rounded-3xl overflow-hidden aspect-square">
            <img
              className="w-full h-full"
              src="/assets/taste-adventure-qr.png"
            />
            <div className="absolute inset-0 content-none bg-[#9a2720] mix-blend-lighten"></div>
          </div>
        </div>
        <div
          className={twMerge(
            "relative grid gap-16 flex-[2] max-h-full pb-10 overflow-y-auto overflow-x-hidden",
            isLoading && "pb-0 overflow-visible"
          )}
        >
          {isLoading ? (
            <img
              src="/assets/onion.png"
              className="brightness-[5] absolute inset-0 m-auto w-14 animate-pulse contrast-200 grayscale object-contain scale-50"
              style={{ viewTransitionName: "logo" }}
            />
          ) : (
            <ContestantList contestantArray={processedData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
