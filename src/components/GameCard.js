import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CountdownTimer from "./CowndownTimer"

export default function GameCard({ data }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [mapUrl, setMapUrl] = useState('')
  const [duration, setDuration] = useState(0)
  const [outfieldQuota, setoutFieldQuota] = useState(0)
  const [goalkeeperQuota, setGoalkeeperQuota] = useState(0)
  const [filledOutfield, setFilledOutfield] = useState(0)
  const [filledGoalkeeper, setFilledGoalkeeper] = useState(0)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (data) {
      const [datePart, timePart] = data?.gameDate?.split(" ")
      const formattedTime = timePart.slice(0, 5)
  
      const rawDate = new Date(datePart);
  
      const formattedDate = rawDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
  
      setDate(formattedDate)
      setTime(formattedTime)

      setMapUrl(data?.mapUrl)
      setDuration(data?.duration)
      setoutFieldQuota(data?.outfieldQuota)
      setGoalkeeperQuota(data?.goalkeeperQuota)
      setFilledOutfield(data?.filledOutfield)
      setFilledGoalkeeper(data?.filledGoalkeeper)
      setStatus(data?.gameStatus?.name)
    }
  }, [data])

  return (
    <div className="border shadow-md p-5 rounded-lg text-xsm my-5">
      <div className="flex items-start">
      </div>
      <div className="pb-4 w-full">
        <div className="flex items-center justify-between">
          <p className="text-lg text-center font-black overflow-x-auto">{data?.venueName}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-1">
        <div className="block w-full">
          <p className="font-semibold">Date</p>
          <p>{date}</p>
        </div>
        <div className="block w-full">
          <p className="font-semibold">Time</p>
          <p>{time}</p>
        </div>
        <div className="block w-full">
          <p className="font-semibold">Duration</p>
          <p>{duration} Minutes</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-1">
        <div className="block w-full">
          <p className="font-semibold">Players</p>
          <p>{filledOutfield}/{outfieldQuota}</p>
        </div>
        <div className="block w-full">
          <p className="font-semibold">Goalkeepers</p>
          <p>{filledGoalkeeper}/{goalkeeperQuota}</p>
        </div>
        <div className="block w-full">
          <p className="font-semibold">Status</p>
          <p>{status}</p>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button className="text-white font-semibold tracking-wider rounded-lg text-sm py-2.5 w-full text-center animated-background bg-gradient-to-r from-black to-[#FF3130]">Join</button>
        <Link to={mapUrl} target="_blank" className="text-center text-white text-xs">
          <img src="/gmap.svg" className="shadow-md" width={48} height={48} alt="grassroot united fc logo" priority="true"></img>
        </Link>
      </div>
    </div>
  )
}