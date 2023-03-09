import React from "react";
import MessageReciever from './MessageReciever';
import MessageParser from "./MessageParser";

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
        component: <MessageReciever/>,
        asMessage: true,
        waitAction: true,
    },
    {
        id: 'bloop',
        component: <MessageParser/>,
        asMessage: true,
        waitAction: true,
        
    }
];

export default steps;