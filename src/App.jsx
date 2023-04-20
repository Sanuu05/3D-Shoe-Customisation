import React from "react"
import Home from "./pages/Home"
import Customiser from "./pages/Customiser"
import { useSnapshot } from "valtio"
import state from "./store"
import Model from './canvas'
function App() {
const snap = useSnapshot(state)
console.log(snap)

  return (
    <div className="App">
      <Home />
      {/* <Model/> */}
      <Customiser/>
    </div>
  )
}

export default App
