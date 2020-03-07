import React from 'react'

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
        const { startTime, gameStarted, timeup } = props;
        this.state = { startTime, gameStarted, timeup };
    }

    componentDidUpdate(prevProps) {
        console.log("Component updated..")
        if (this.props.gameStarted != prevProps.gameStarted) {
            const { startTime, gameStarted, timeup } = this.props;
            this.setState({ startTime, gameStarted, timeup }, () => {
                if (this.state.gameStarted)
                    clearInterval(this.timer)
                    this.timer = setInterval(this.minusOneSec, 1000);
            })
        }
    }

    componentDidMount() {
        console.log("Mounted..")
        if (this.state.gameStarted)
            this.timer = setInterval(this.minusOneSec, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    minusOneSec = () => {
        const { startTime: { min, sec } } = this.state
        if (min != 0) {
            if (sec == 0)
                this.setState({ startTime: { min: min - 1, sec: 59 } })
            else
                this.setState({ startTime: { ...this.state.startTime, sec: sec - 1 } })

        } else {
            if (sec == 0) {
                this.setState({ startTime: { min: 0, sec: 0 }, timeup: true }, () => {
                    clearInterval(this.timer);
                    this.props.handleTimeup()
                });

            }
            else
                this.setState({ startTime: { ...this.state.startTime, sec: sec - 1 } })
        }
    }

    pad = (num) => {
        if (num < 10) {
            return ('0' + num)
        }
        return num;
    }


    render = () => {
        const { startTime: { min, sec }, timeup } = this.state
        if (timeup) {
            return (
                <h1 className="text-center text-danger">Time Up!</h1>
            )
        } else {
            return (<h1 className="text-center">{this.pad(min)}:{this.pad(sec)}</h1>)
        }

    }
}


