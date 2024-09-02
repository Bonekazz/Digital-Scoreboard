import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';
import InstallPWA from './components/InstallPWA';
import Sheet from './components/Sheet';

// import './App.css'

function App() {

  const [teams, setTeams] = useState({
    redSide: {
      score: 0,
      bgColor: "rgba(238, 0, 0, 0.8)",
    },
    blueSide: {
      score: 0,
      bgColor: "rgba(0, 27, 238, 0.8)",
    }
  });

  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
  const [isMobile, setIsMobile] = useState(false);
  const [hasSeenInstallModal, setHasSeenInstallModal] = useState(false);

  useEffect(() => {
    function handleOrientationChange(e: any) {
      setIsPortrait(e.matches);
    }

    const portraitMediaQuery = window.matchMedia("(orientation: portrait)");
    portraitMediaQuery.addEventListener('change', handleOrientationChange);

    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    if (localStorage.getItem("hasSeenInstallModal")) 
      setHasSeenInstallModal(JSON.parse(localStorage.getItem("hasSeenInstallModal") as string))

    return () => {
      portraitMediaQuery.removeEventListener('change', handleOrientationChange);
    }

  }, []);

  function restartScore() {
    setTeams({
      redSide: {...teams.redSide, score: 0},
      blueSide: {...teams.blueSide, score: 0},
    });
  }

  return (
    <div className={`flex ${(isPortrait) ? "flex-col" : ""} justify-center items-center w-[100dvw] h-[100dvh] overflow-hidden`}>
      
      {isMobile && !hasSeenInstallModal && (
        <Sheet open={true}>
          <InstallPWA />
        </Sheet>
      )}

      <div 
        id="redSide" 
        className="flex justify-center items-center w-full h-full"
        style={{backgroundColor: teams.redSide.bgColor}}
      >
        <div className="w-full h-full">
          <div 
            className="z-[10] w-full h-[50%] bg-[rgba(0,0,0,0.24)] flex items-end pl-3 pb-3 transition-all ease-out duration-300 active:bg-white/15"
            onClick={() => {
              setTeams({blueSide: {...teams.blueSide}, redSide: {...teams.redSide, score: teams.redSide.score + 1}})}
            }
          >
            <ArrowUp strokeWidth={3} size={40} color="white" style={{opacity: 0.5}}/>
          </div> 
          <div 
            className="z-[10] w-full h-[50%] bg-[rgba(0,0,0,0.12)] flex items-start pl-3 pt-3 transition-all ease-out duration-300 active:bg-white/15"
            onClick={() => {
              setTeams({blueSide: {...teams.blueSide}, redSide: {...teams.redSide, score: (teams.redSide.score === 0) ? 0 : teams.redSide.score - 1}})}
            }
          >
            <ArrowDown strokeWidth={3} size={40} color="white" style={{opacity: 0.5}}/>
          </div>
        </div>

        <span className="absolute text-[12rem] text-white font-bold">{teams.redSide.score}</span>
      </div>

      <div 
        id="blueSide" 
        className="flex justify-center items-center w-full h-full"
        style={{backgroundColor: teams.blueSide.bgColor}}
      >
        <div className="w-full h-full">
          <div 
            className="z-[10] w-full h-[50%] bg-[rgba(0,0,0,0.24)] flex items-end justify-end pr-3 pb-3 transition-all ease-out duration-300 active:bg-white/15"
            onClick={() => {
              setTeams({redSide: {...teams.redSide}, blueSide: {...teams.blueSide, score: teams.blueSide.score + 1}})}
            }
          >
            <ArrowUp strokeWidth={3} size={40} color="white" style={{opacity: 0.5}}/>
          </div> 
          <div 
            className="z-[10] w-full h-[50%] bg-[rgba(0,0,0,0.12)] flex items-start justify-end pr-3 pt-3 transition-all ease-out duration-300 active:bg-white/15"
            onClick={() => {
              setTeams({redSide: {...teams.redSide}, blueSide: {...teams.blueSide, score: (teams.blueSide.score === 0) ? 0 : teams.blueSide.score - 1}})}
            }
          >
            <ArrowDown strokeWidth={3} size={40} color="white" style={{opacity: 0.5}}/>
          </div>
        </div>

        <span className="absolute text-[12rem] text-white font-bold">{teams.blueSide.score}</span>
      </div>

      <div 
        id="restart-btn-div" 
        className="
          absolute z-[20] flex justify-center items-center bg-[rgba(0,0,0,0.21)] p-[12px] rounded-full border border-white/5 
          transition-all ease-in-out duration-300 active:scale-90 active:bg-white/15
        "
        onClick={() => {restartScore()}}
      >
        <RefreshCw strokeWidth={3} size={60} color="white" style={{opacity: 0.5}}/>
      </div>

    </div>
  )
}

export default App
