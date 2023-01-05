import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <div>
          <img src={reactLogo} alt="React logo" />
        </div>
    </div>
    </div>
  )
}

export default App
