import workBackground from "./work.jpg";
import { Fragment, useEffect, useRef, useState } from "react";
import "./WorkPage.css";

const WorkPage=(props)=>{

    var workSectionStyle = {
        height: "100vh",
        backgroundImage: " linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url(" + workBackground + ")",
        overflow: "hidden",
    };

    const soundUrl = 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3';
    const notificationSound=new Audio(soundUrl);
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {

        setTimer('00:01:10');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 70);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
        notificationSound.play();
    }, []);

    return (
        <Fragment>
            <div className="workSection" style={workSectionStyle}>
                <h1>Timer Set! </h1>
                <span id='ct'>{timer}</span>
                <button className="workBtn" onClick={props.stopTimer}>Restart</button>
            </div>
        </Fragment>
    );
}

export default WorkPage;
