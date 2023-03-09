import React, {Component} from "react";
import socket from '../socketio';
import {Loading} from 'react-simple-chatbot';


class MessageReciever extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bot_uttered: [],
            loading: true,
            temp: null,
        }

        this.url = "http://localhost:5005/";
        this.socket = socket(this.url);

    }

    triggerNext(messages) {
        if(messages.length > 0){
            this.props.triggerNextStep({value: messages.splice(1, messages.length), trigger: 'bloop'});
        }
        else {
            this.props.triggerNextStep({trigger: 'user_uttered'});
        }
        
    }

    componentDidMount(){
        const { steps } = this.props;
        const message = steps.user_uttered.value;

        this.socket.emit('user_uttered', {
            'message': message,
            'session_id': this.socket.id,
        });

        var temp = this.state.bot_uttered;
        this.socket.on('bot_uttered', (response) => {
            temp.push(response.text);
            this.setState({bot_uttered: temp, loading: false});   

           
        })

        setTimeout(() => {
            this.triggerNext(temp);
        }, 500);

        this.setState({loading: true});
    }

    render() {
        const {bot_uttered, loading} = this.state;
        if(loading){
            return (<div><Loading/></div>)
        }
        return(<div>{bot_uttered[0]}</div>)
          
    }
}

export default MessageReciever;