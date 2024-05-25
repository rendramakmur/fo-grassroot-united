// src/VideoBackground.js
import React from 'react'

export default function VideoBackground ({ videoUrl, children }) {
  return (
    <div className="relative w-full h-3/4 overflow-hidden">
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl} 
        autoPlay 
        muted 
        loop 
      />
      <div className="absolute inset-0"></div>
      <div className="relative flex items-center justify-center h-full text-white">
        {children}
      </div>
    </div>
  )
}
