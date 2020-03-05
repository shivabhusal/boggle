import React from 'react'
export default class AddWord extends React.Component {
    constructor(props){
        super(props);
        this.state = { input: '', timeup: this.props.timeup }


    }
    updateInput = (e) => {
        this.setState({ input: e.target.value })
    }

    handleKeyPress = (e) => {
        e.preventDefault();
        this.props.handleNewWord(this.state.input)
        this.setState({input: ''})
    }

    render = () => (
        <form action="#" className="col-12" onSubmit={this.handleKeyPress}>
            <input className="w-25 m-auto d-block text-center" type="text"
                onChange={this.updateInput}
                value={this.state.input}
                placeholder="Your Word Here" />
        </form>
    )
}