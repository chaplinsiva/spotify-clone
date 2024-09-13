import { createContext, useEffect, useRef, useState } from "react"
import { songsData } from "../assets/assets";



export const PlayerContext = createContext()
const PlayerContextProvider = (props)=>{

    const AudioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const [track,settrack] = useState(songsData[0])
    const [playStatus,setplayStatus] = useState(false)
    const [time,settime] = useState({currenttime:{
        second : 0,
        minute: 0
    },totaltime:{
        second : 0,
        minute: 0
    }})

    const play = ()=>{
        AudioRef.current.play();
        setplayStatus(true)
    }

    const pause = ()=>{
        AudioRef.current.pause();
        setplayStatus(false)
    }

    const playWithId = async (id)=>{
       await settrack(songsData[id]);
       await AudioRef.current.play();
       setplayStatus(true);


    }

    const previous = async () => {
        if(track.id>0) {
            await settrack(songsData[track.id-1]);
            await AudioRef.current.play();
            setplayStatus(true)
        }
    }

    const next = async () => {
        if(track.id< songsData.length-1) {
            await settrack(songsData[track.id+1]);
            await AudioRef.current.play();
            setplayStatus(true)
        }
    }

    const seeksong = async(e)=>{
       AudioRef.current.currentTime = ((e.nativeEvent.offsetX / seekbg.current.offsetWidth  ) * AudioRef.current.duration)
    }

    useEffect(()=>
        {
        
            
                    setTimeout(() => {
                        AudioRef.current.ontimeupdate = () => {
                            seekbar.current.style.width = (Math.floor(AudioRef.current.currentTime/AudioRef.current.duration*100))+"%"
                            settime({currenttime:{
                                second : Math.floor(AudioRef.current.currentTime % 60),
                                minute: Math.floor(AudioRef.current.currentTime / 60)
                            },totaltime:{
                                second : Math.floor(AudioRef.current.duration % 60),
                                minute: Math.floor(AudioRef.current.duration / 60)
                            }})
                        }
                    }, 1000);
            },[AudioRef])
        

    const contextValue = {
       AudioRef,seekbar,seekbg,track,settrack,playStatus,setplayStatus,time,settime,play,pause,playWithId,previous,next,seeksong
    }

   
    return (
        <PlayerContext.Provider value={contextValue}>
             {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider