import { useEffect, useState } from "react"

export default function Quote() {
  const words = ["Akses sepak bola untuk semua orang.", "Terbuka untuk umum.", "Untuk semua level.", "Semua gender.", "Semua umur."]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [])


  return (
    <div className="h-1/4 flex place-content-center items-center shadow-md bg-[#FF3130] ">
      <div>
        <div className="flex place-content-center -mb-1">
          <img src="/double-quote-white.svg" width={50} height={50} alt="double quote" priority="true"></img>
        </div>
        <p className="text-center font-black text-white text-lg px-5 pb-7 fade-in-out">{words[currentWordIndex]}</p>
      </div>
    </div>
  )
}