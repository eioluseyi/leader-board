import * as React from 'react'
import { twMerge } from 'tailwind-merge'

type ContestantProps = {
    rank: number
    name: string
    id: string
    points: number
    isNew: boolean
}
const Contestant = ({ id, name, points, rank, isNew }: ContestantProps) => (
    <div
        className={twMerge(
            'relative isolate grid grid-cols-[auto_1fr_auto] bg-[#5E0B2A] [background-size:150%] bg-left gap-10 [text-shadow:_0px_2px_#0003] items-center py-5 pr-8 pl-5 border border-[#fff2] rounded-2xl shadow-[0px_5px_0px_0px_#5D0A2A] font-bold text-xl lg:text-3xl',
            rank === 1 && '[background:linear-gradient(to_right,#E0AA3E,#FAD398,#E0AA3E)] text-[#E0AA3E] border-transparent',
            rank === 2 && '[background:linear-gradient(to_right,#ABABAB,#DEDEDE,#ABABAB)] text-[#ABABAB] border-transparent',
            rank === 3 && '[background:linear-gradient(to_right,#652410,#FAC697,#652410)] text-[#652410] border-transparent',
            rank >= 6 && 'lg:hidden'
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
)

const nameFound = (nameValue: string, searchText: string) => {
    if (!searchText) return true
    if (nameValue.toLowerCase().includes(searchText.toLowerCase())) return true
    return false
}

const ContestantList = ({ contestantArray }: { contestantArray: ContestantProps[] }) => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const filteredArray = contestantArray.filter(el => nameFound(el?.name, searchQuery))

    return (
        <div className="gap-5 grid">
            <div className='lg:hidden py-6 text-white text-xs'>
                <h2 className='mb-4 font-black text-2xl'>The Taste Adventure</h2>
                {/* <img src="/assets/The-Taste-Adventure.png" className='lg:hidden mb-4 max-h-10' /> */}
                <span className='text-xs'>Go on a <b>culinary adventure</b> at the GTCO Food and Drink Festival and stand a chance to win one of the 15 amazing Squad boxes filled with authentic flavors, tasty treats, and spices that will blow your taste buds away!</span>
                <br />
                <br />
                <b>Here's how you can join the competition:</b>
                <br />
                <ul className='gap-2 grid'>
                    <li><b>1)</b> Treat yourself to a meal or drink from any of the vendor stalls at Food and Drink.</li>
                    <li><b>2)</b> Simply pay using the vendors' <b className='font-bold uppercase'>Squad virtual accounts</b>.</li>
                    <li><b>3)</b> Keep an eye on the leaderboard to track your progress.</li>
                    <li><b>4)</b> The more vendors you buy from, the better your chances of winning a Squad Box!</li>
                </ul>
                <br />
                <i>Keep up with all the excitement and exclusive updates by following us on <a href='https://instagram.com/officialsquadco' target='_blank'><b className='underline'>Instagram</b></a> and <a href='https://twitter.com/officialsquadco' target='_blank'><b className='underline'>Twitter</b></a> @officialsquadco. You can also visit <a href='https://squadco.com' target='_blank'><b className='underline'>squadco.com</b></a> to learn more about our products and create a free account.</i>
            </div>
            {contestantArray.length ? (<input
                placeholder="Enter name to find your position"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="block border-[#fff2] lg:hidden bg-white/30 px-4 border rounded-2xl w-full min-h-[4rem] text-white placeholder:text-white/60 !outline-none"
            />) : null}

            {!filteredArray.length ? (<div className='border-white opacity-30 mx-auto px-10 py-8 border border-dashed rounded-2xl w-fit font-semibold text-center text-white text-xl'>Start buying to get on the board</div>) : null}
            {filteredArray.map(itm => (
                <Contestant key={itm.rank} {...itm} />
            ))}
        </div>
    )
}

export default ContestantList
