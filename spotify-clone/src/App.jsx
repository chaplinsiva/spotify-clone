import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"
import { PlayerContext } from "./context/PlayerContext"

function App() {
 const {AudioRef,track} = useContext(PlayerContext)
  return (
   <div className="h-screen bg-black">
    <div className="h-[90%] flex">
    <Sidebar/>
    <Display/>
    </div>
    <Player/>
    <audio ref={AudioRef} src={track.file} preload="auto"></audio>
    
   </div>
  )
}

export default App
