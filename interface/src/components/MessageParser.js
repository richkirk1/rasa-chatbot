import React, {Component} from "react";

class MessageParser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            messages: null,
        }
    }

    componentDidMount() {
        const { steps } = this.props;

        var msgs = steps.bot_uttered.value;
        if(steps.bloop.value) {
            msgs = steps.bloop.value;
        }
    
        const msg = msgs.shift();
        this.setState({message: msg, messages: msgs});

        setTimeout(() => {
            this.triggerNext(msgs);
        }, 1000);
  
    }

    triggerNext(messages) {
        if(messages.length > 0){
            this.props.triggerNextStep({value: messages, trigger: 'bloop'});
        }
        else {
            this.props.triggerNextStep({trigger: 'user_uttered'});
        }
    }

    render() {
        const {message} = this.state;

        return(<div> {message} </div>)
    }
}

export default MessageParser;