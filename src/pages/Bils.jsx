import React from 'react'
import IsiBils from '../components/IsiBils'

function Bils() {
  return (
    <div>
    <div
      id="menu"
      className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none"
    >
      <div className="">
        <IsiBils />
      </div>
    </div>
  </div>
  )
}

export default Bils