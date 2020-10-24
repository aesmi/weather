import React from "react";
import './clock.styles.css';

export default class Clock extends React.Component{
    
    constructor(props){
        super();
        this.state={
            date: new Date()
        };
    }

    //updates component time every 1 second
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
     }
    //clears timeid after each 1s lifecycle
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //method to set new state to current time at each interval
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render(){
        //consts for element selector
        // const hourHand = document.querySelector('.hour-hand');
        // const minuteHand = document.querySelector('.min-hand');
        // const secondHand = document.querySelector('.second-hand');
        //consts for degrees for div transform
        const hoursDegrees = this.state.date.getHours() * 30 + this.state.date.getMinutes() /2;
        const minutesDegrees = this.state.date.getMinutes() * 6 + this.state.date.getSeconds() /10;
        const secondsDegrees = this.state.date.getSeconds() * 6;
        //transform divs depending on time
        /*secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;*/
    
        const divStyleHours = {
          transform: "rotateZ(" + hoursDegrees + "deg)",
        };

        const divStyleMinutes = {
          transform: "rotateZ(" + minutesDegrees + "deg)",
        };

        const divStyleSeconds = {
          transform: "rotateZ(" + secondsDegrees + "deg)",
        };
        //returns html on each update
        return(
            <div className="clock">
                <div className="clock-face">
                    <div className="hand hour-hand" style={divStyleHours}></div>
                    <div className="hand min-hand" style={divStyleMinutes}></div>
                    <div className="hand second-hand" style={divStyleSeconds}></div>
                </div>
            </div>
        );
    }
};