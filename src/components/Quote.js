import { useEffect, useState } from "react"

export default function Quote() {
  const words = ["Akses sepak bola untuk semua orang.", "Terbuka untuk umum.", "Untuk semua level.", "Semua gender.", "Semua umur."]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length])


  return (
    <div className="h-3/4 flex place-content-center items-center bg-black">
      <div>
        <div className="mb-5">
          <p className="text-white mx-16 text-justify"><i className=" font-black">Grassroot United Football Club</i> merupakan sebuah klub sepak bola yang terbuka untuk umum. Tujuan Grassroot United adalah memberikan akses untuk siapapun kepada sepak bola, lebih tepatnya kesenangan bermain sepak bola. Tidak peduli level skill-mu, gender-mu, dan umur-mu, semua diterima dan dapat bermain sepak bola bersama di Grassroot United FC. Sampai jumpa di lapangan.</p>
        </div>
        <hr className=" w-48 h-0.5 mx-auto bg-gray-100 border-0 rounded"></hr>
        <div className="flex place-content-center -mb-1">
          <img src="/double-quote-white.svg" width={50} height={50} alt="double quote" priority="true"></img>
        </div>
        <p className="text-center font-black text-white text-lg max-h-5 mx-16 fade-in-out">{words[currentWordIndex]}</p>
      </div>
    </div>
  )
}