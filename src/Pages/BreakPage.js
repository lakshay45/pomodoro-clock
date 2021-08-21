import "./BreakPage.css";
import breakBackground from "./break.png";
import { useEffect, useRef, useState } from "react";

const BreakPage=(props)=>{

    var breakSectionStyle = {
        height: "100vh",
        backgroundImage: " linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url(" + breakBackground + ")",
        overflow: "hidden",
    };
    const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/been_tree.mp3`;
    const notificationSound = new Audio(soundUrl);

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

        setTimer('00:05:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 300);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
        notificationSound.play();
    }, []);

    return(
        <div className="breakSection" style={breakSectionStyle}>
            <h1>Break Time! </h1>
            <span id='ct'>{timer}</span>
            <button className="breakBtn" onClick={props.stopBreakTimer}>Restart</button>
        </div>
    );
}

export default BreakPage;