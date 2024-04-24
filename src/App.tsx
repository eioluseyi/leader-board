import * as React from 'react'
import ContestantList from './ContestantList'
import { flushSync } from 'react-dom'
import { twMerge } from 'tailwind-merge'

function getRanks(array: any[]) {
    // Updating rank based on points
    const sortedPoints = [...array].sort((a, b) => b.points - a.points)
    const updatedRanks = sortedPoints.map((contestant, index) => ({
        ...contestant,
        rank: index + 1,
    }))

    const finalArray = [...updatedRanks].sort((a, b) => a.rank - b.rank)
    return finalArray
}

// const contestantArray = [
//   { id: 'SR', name: 'Sophia Ramirez', points: 0, rank: 1 },
//   { id: 'EP', name: 'Ethan Patel', points: 0, rank: 2 },
//   { id: 'IW', name: 'Isabella Wang', points: 0, rank: 3 },
//   { id: 'LN', name: 'Liam Nguyen', points: 0, rank: 4 },
//   { id: 'MG', name: 'Mia Gupta', points: 0, rank: 5 },
// ]

const getProcessedData = (rawData: any[]) => {
    if (!rawData) return []

    const newData = rawData.map((itm: { name: any; count: number }) => ({ ...itm, id: itm.name, name: itm.name, points: itm.count * 5, rank: 1 }))
    const contestantArray = getRanks(newData)
    return contestantArray
}

const handleTransitionFlush = (cb: () => void) => {
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            flushSync(() => {
                cb()
            })
        })
    } else {
        cb()
    }
}

function App() {
    const [processedData, setProcessedData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const getData = React.useCallback(async () => {
        try {
            const response = await fetch('https://qa-api.squadinc.co/virtual-account/v1/leader_board')
            const res = await response.json()

            const data = getProcessedData(res?.data || [])

            handleTransitionFlush(() => setProcessedData(data))
        } catch (err) {
            console.log({ err })
        } finally {
            setTimeout(() => handleTransitionFlush(() => setIsLoading(false)), 3000)
        }
    }, [])

    React.useEffect(() => {
        const timer = setInterval(getData, 5000)
        handleTransitionFlush(() => setIsLoading(true))
        getData()
        return () => clearInterval(timer)
    }, [getData])

    return (
        <div className="place-items-center grid app-wrapper h-[100svh] overflow-hidden">
            <div className='top-0 fixed flex justify-end px-6 py-2 w-screen max-w-full'>
                <a href='https://squadco.com/' className='flex items-center gap-0.5 min-h-[2rem]'>
                    {!isLoading ? (<img src="/assets/onion.png" className="brightness-[5] w-4 translate-y-0.5 contrast-200 grayscale object-contain"
                        style={{ viewTransitionName: "logo" }} />) : null}
                    <span className='font-black text-white text-xl'>squad</span>
                </a>
            </div>
            <div className="flex md:items-center gap-10 p-6 w-screen max-w-5xl max-h-screen overflow-auto">
                <div className="lg:block flex-1 hidden">
                    <div className="text-left text-white">
                        <h1 className="grid mb-1 font-normal text-5xl">
                            <img src="/assets/The-Taste-Adventure.png" />
                        </h1>
                        <p className="mb-10">
                            Stand a chance to win one of the Squad Box of Authentic Flavors at GTCO Food and Drink when you pay with
                            Squad
                        </p>
                        <p className="mb-1 uppercase">Scan code here to view more</p>
                    </div>
                    <div className="relative flex-1 place-items-center border-[#9a2720] border-8 grid bg-white rounded-3xl overflow-hidden aspect-square">
                        <img
                            className="w-full h-full"
                            src="/assets/taste-adventure-qr.png"
                        />
                        <div className="absolute inset-0 content-none bg-[#9a2720] mix-blend-lighten"></div>
                    </div>
                </div>
                <div className={twMerge("relative grid gap-16 flex-[2] max-h-full pb-10 overflow-y-auto overflow-x-hidden",
                    isLoading && "pb-0 overflow-visible")}>
                    {isLoading ? (
                        <img src="/assets/onion.png" className="brightness-[5] absolute inset-0 m-auto w-14 animate-pulse contrast-200 grayscale object-contain scale-50"
                            style={{ viewTransitionName: "logo" }} />
                    ) : (
                        <ContestantList contestantArray={processedData} />
                    )}
                </div>
            </div>
        </div >
    )
}

export default App
