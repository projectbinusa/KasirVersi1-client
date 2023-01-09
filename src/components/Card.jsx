import React from 'react'

function Card({data}) {
  return (
      <div id="card">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div id="card-image">
              <img className="w-40 h-40 mb-3 rounded-full shadow-lg mx-auto" src={data.image} alt={data.image}/> 
            </div>             
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.name}</div>
            <p className="text-gray-700 text-base">
              {data.harga}
            </p>
          </div>
        </div>
      </div>
  )
}

export default Card