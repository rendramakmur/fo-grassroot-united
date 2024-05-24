export default function Banner() {
  return (
    <div className="h-1/2 bg-black flex place-content-center items-center space-x-2">
      <div>
        <img src="/logo-img.png" width={100} height={100} alt="grassroot united fc logo" priority="true"></img>
      </div>
      <div className="text-xl text-white tracking-widest leading-6">
        <h1><span className="font-black">G</span>RASSROOT</h1>
        <h1><span className="font-black">U</span>NITED</h1>
        <h1><span className="font-black">F</span>OOTBALL</h1>
        <h1><span className="font-black">C</span>LUB</h1>
      </div>
    </div>
  )
}