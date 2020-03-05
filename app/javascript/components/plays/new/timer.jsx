import React from 'react'

export default class Timer extends React.Component {


    constructor(props) {
        super(props);
        this.state = props.startTime;
    }

    componentDidMount() {
        console.log("Mounted..")
        this.timer = setInterval(this.minusOneSec, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    minusOneSec = () => {
        const { min, sec } = this.state;
        if (min != 0) {
            if (sec == 0)
                this.setState({ min: min - 1, sec: 59 })
            else
                this.setState({ sec: sec - 1 })

        } else {
            if (sec == 0) {
                this.setState({ min: 0, sec: 0, timeup: true }, () => {
                    clearInterval(this.timer);
                    this.props.handleTimeup()
                });

            }
            else
                this.setState({ sec: sec - 1 })
        }
    }

    pad = (num) => {
        if (num < 10) {
            return ('0' + num)
        }
        return num;
    }


    render = () => {
        const { min, sec, timeup } = this.state
        if(timeup){
            return(
                <h1 className="text-center text-danger">Time Up!</h1>
            )
        }else{
            return ( <h1 className="text-center">{this.pad(min)}:{this.pad(sec)}</h1> )
        }
        
    }
}