import { Fragment, useEffect, useRef, useState } from 'react';
import StartPage from './Pages/StartPage';
import WorkPage from "./Pages/WorkPage";
import BreakPage from "./Pages/BreakPage";

function App() {

  const [isPageStatus,setIsPageStatus]=useState({
    isStartPage:true,
    isWorkPage:false,
    isBreakPage:false
  });
  var inputNumber;
  const Ref=useRef(null);
  const Ref2=useRef(null);

 
  const startTimeCycle=(input)=>{
    inputNumber=input;
    clearTimer(getDeadTime());
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

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    return {
      total
    };
  }


  const startTimer = (e) => {
    let { total }
      = getTimeRemaining(e);
    if (total <= 1) {
      // console.log(total+" is here");
      if (Ref.current) clearInterval(Ref.current);
      clearTimer2(getDeadTime2());
      setIsPageStatus({
        isStartPage: false,
        isWorkPage: false,
        isBreakPage: true
      });
    }
  }
  const clearTimer = (e) => {

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1500);
    return deadline;
  }

  const clearTimer2 = (e) => {

    if (Ref2.current) clearInterval(Ref2.current);
    const id = setInterval(() => {
      startTimer2(e);
    }, 1000)
    Ref2.current = id;
  }
  const getDeadTime2 = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  }
  const startTimer2 = (e) => {
    let { total }
      = getTimeRemaining(e);
    // console.log(inputNumber+" "+total);
    if (total <= 0) {
      // console.log(inputNumber);
      if (inputNumber > 1) {
        if (Ref2.current) clearInterval(Ref2.current);
        clearTimer(getDeadTime());
        setIsPageStatus({
          isStartPage: false,
          isWorkPage: true,
          isBreakPage: false
        });
        inputNumber = inputNumber - 1;
    }
      else {
        if (Ref.current) clearInterval(Ref.current);
        if (Ref2.current) clearInterval(Ref2.current);

        setIsPageStatus({
          isStartPage: true,
          isWorkPage: false,
          isBreakPage: false
        });
    }
  }
}
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <Fragment>
      {isPageStatus.isStartPage && <StartPage startTimer={startTimeCycle}/>}
      {isPageStatus.isWorkPage && <WorkPage stopTimer={stopTimeCycle}/>}
      {isPageStatus.isBreakPage && <BreakPage stopBreakTimer={stopTimeCycle}/>}
    </Fragment>
  );
}

export default App;
