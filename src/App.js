import { Fragment, useRef, useState } from 'react';
import StartPage from './Pages/StartPage';
import WorkPage from "./Pages/WorkPage";
import BreakPage from "./Pages/BreakPage";

function App() {

  const [isPageStatus,setIsPageStatus]=useState({
    isStartPage:true,
    isWorkPage:false,
    isBreakPage:false
  });
  var interval=0;
  var seconds = 0;
  var interval2=0;
  var seconds2 = 0;
  var inputNumber;
  const Ref=useRef(null);
  const Ref2=useRef(null);

  const pomodoro = (secs) => {
    seconds = secs || 0;
    if (Ref.current) clearInterval(Ref.current);
    if (Ref2.current) clearInterval(Ref2.current);

    interval = setInterval(function () {
      seconds--;
      if (!seconds) {
        
    if (Ref.current) clearInterval(Ref.current);
    if (Ref2.current) clearInterval(Ref2.current);

        pomodoroRest(300);
        setIsPageStatus({
          isStartPage: false,
          isWorkPage: false,
          isBreakPage: true
        });
      }
    }, 1000)
    Ref.current = interval;
  }
  const pomodoroRest = (secs) => {
    seconds2 = secs || 0;
    if (Ref.current) clearInterval(Ref.current);
    if (Ref2.current) clearInterval(Ref2.current);
    interval2 = setInterval(function () {
      seconds2--;
      if (!seconds2) {
        
        if (Ref.current) clearInterval(Ref.current);
        if (Ref2.current) clearInterval(Ref2.current);
        if(inputNumber>1)
        {
          pomodoro(1500);
          setIsPageStatus({
            isStartPage: false,
            isWorkPage: true,
            isBreakPage: false
          });
          inputNumber=inputNumber-1;
        }
        else
        {
          setIsPageStatus({
            isStartPage: true,
            isBreakPage: false,
            isWorkPage: false
          });
        }
      }
    }, 1000)
    Ref2.current = interval2;
  }
  const startTimeCycle=(input)=>{
    inputNumber=input;
    pomodoro(1500);
    setIsPageStatus({
      isWorkPage:true,
      isStartPage:false,
      isBreakPage:false
    });
  }

  const stopTimeCycle = (event) => {
    event.preventDefault();
    if (Ref.current) clearInterval(Ref.current);
    if (Ref2.current) clearInterval(Ref2.current);

    setIsPageStatus({
      isStartPage:true,
      isBreakPage:false,
      isWorkPage:false
    });
    // seconds=0;
  }

  return (
    <Fragment>
      {isPageStatus.isStartPage && <StartPage startTimer={startTimeCycle}/>}
      {isPageStatus.isWorkPage && <WorkPage stopTimer={stopTimeCycle}/>}
      {isPageStatus.isBreakPage && <BreakPage stopBreakTimer={stopTimeCycle}/>}
    </Fragment>
  );
}

export default App;
