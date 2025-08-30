import React, { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Home from "./pages/Home"
import Customiser from "./pages/Customiser"
import LoadingScreen from "./components/LoadingScreen"
import { useSnapshot } from "valtio"
import state from "./store"

function App() {
  const snap = useSnapshot(state)

  // Handle URL design sharing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const designData = urlParams.get('design')
    
    if (designData) {
      try {
        const colors = JSON.parse(atob(designData))
        Object.keys(colors).forEach(key => {
          if (state.items[key] !== undefined) {
            state.items[key] = colors[key]
          }
        })
        state.intro = false
      } catch (error) {
        console.log('Invalid design data in URL')
      }
    }
  }, [])

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Home />
        <Customiser />
        <LoadingScreen />
      </AnimatePresence>
    </div>
  )
}

export default App
