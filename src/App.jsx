import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Task from './componets/Task'
import Display from "./componets/Display"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="w-[100vw]  h-[100vh] bg-slate-950 flex justify-center text-center ">
       <div className="py-6  w-[90%] lg:w-[65%] md:w-[65%] h-full  ">
         <h1 className="text-white font-medium text-4xl md:text-5xl lg:text-6xl">Task-Tracker</h1>
         <Task/>
         <hr className="bg-gray-400 mt-10"/>
         <Display/>
       </div>
        
      </section>
    </>
  )
}

export default App
