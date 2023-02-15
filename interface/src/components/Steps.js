import React, {Component} from "react";
import socket from '../socketio';
import {Loading} from 'react-simple-chatbot';

//Plans to seperate this class and it be called within steps
class ActionProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bot_uttered: null,
            loading: true,
        }

        this.url = "http://localhost:5005/";
        this.socket = socket(this.url);

    }

    componentDidMount(){
        const { steps } = this.props;
        const message = steps.user_uttered.value;

        this.socket.emit('user_uttered', {
            'message': message,
            'session_id': this.socket.id,
        });

        this.socket.on('bot_uttered', (response) => {
            console.log(response);
            this.setState({bot_uttered: response.text, loading: false});

        })

        this.setState({loading: true});
    }

    render() {
        const {bot_uttered, loading} = this.state;
        if(loading){
            return (<div><Loading/></div>)
        }
        return (
            <div>{bot_uttered}</div>
        )     
    }
}


const steps =
[   
    {
        id: 'Introduction',
        message: 'Hi I am Rover, can I help you with your job search today?',
        trigger: 'user_uttered',
    },
    {
        id: 'user_uttered',
        user: true,
        trigger: 'bot_uttered',
    },
    {
        id: 'bot_uttered',
        component: <ActionProvider/>,
        asMessage: true,
        trigger: 'user_uttered',
    }
];

export default steps;