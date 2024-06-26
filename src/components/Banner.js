import Quote from "./Quote";
import VideoBackground from "./VideoBackground";

export default function Banner() {
  return (
    <>
      <VideoBackground videoUrl={'./bg-vid.mp4'}>
        <div>
          <img className="animate-spin-slow" src="/grassroot-logo.svg" width={125} height={125} alt="grassroot united fc logo" priority="true"></img>
        </div>
        <div className="text-xl tracking-widest leading-6">
          <h1><span className="font-black">G</span>RASSROOT</h1>
          <h1><span className="font-black">U</span>NITED</h1>
          <h1><span className="font-black">F</span>OOTBALL</h1>
          <h1><span className="font-black">C</span>LUB</h1>
        </div>
      </VideoBackground>
    </>
  )
}