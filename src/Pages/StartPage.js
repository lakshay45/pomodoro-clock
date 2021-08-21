import { Fragment } from "react";
import Background from "./clock.jpg";
import "./StartPage.css";

const StartPage=(props)=>{
    var sectionStyle = {
        height: "100vh",
        backgroundImage: "url(" + Background + ")",
        overflow: "hidden",
    };
    var input=+1;
    const submitHandler=(event)=>{
        var number=+document.getElementById("inputNumber").value;
        if(number)
        {
            input=number;
        }
        props.startTimer(input);
        event.preventDefault();
    };
    return(
        <Fragment>
            <div className="section" style={sectionStyle}>
                <h1>Welcome</h1>
                <p>The <b>Pomodoro Technique</b> is a time management method.
                    The technique uses a timer to break down work into intervals,
                    traditionally 25 minutes in length, separated by short breaks.
                    Each interval is known as a pomodoro</p>
                <div className="input">
                    <h2>Enter number of cycles</h2>
                    <input id="inputNumber" type="number" placeholder="1" min="1" />
                </div>
                <button onClick={submitHandler} className="btn">Start</button>
            </div>
        </Fragment>
    )
}

export default StartPage;