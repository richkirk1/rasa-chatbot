import { useEffect } from 'react';
import socket from '../socketio';
var socketio;

class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }

   /*
    3/25/2023 - Moved socket calls to action, as it seemed more fitting. Also allows for it to be accessed outside
    of user input.
   */

   messageHandler = (message) => {
    if(!socketio)                 // looking to change this set up but running with this for right now. 
      socketio = socket("http://localhost:5005/");
    
    socketio.removeAllListeners() // ensures there is only one bot listening
  
    socketio.emit('user_uttered', {
      'message': message,
      'session_id': socketio.id
    });

    socketio.on('bot_uttered', (response) => {
      console.log(response);
      (response.attachment ? this.addCustomMessage(response) : this.addBotMessage(response));
    });
  
  }

   setMessage = (message) => {
    this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
        infoBox: "inactive",
    }));
   };

  /*
   Bot & User message creators. 
   
   Added user message here as it was already present and felt the message creation should be within actions.
  */
   addBotMessage = (response) => {
    
    const message = this.createChatBotMessage(response.text, 
      (response.quick_replies ? {
        widget: 'options',
        payload: {
          "options": response.quick_replies,
        },
      } : 
        undefined));

    this.setMessage(message);
  };

  addCustomMessage = (response) => {
    const message = this.createChatBotMessage('Here are the top three results matching your search:', 
        {
        widget: 'carousel',
        payload: {
          "attachment": response.attachment,
        }});

    this.setMessage(message);
  }

  addUserMessage = (message) => {
    const response = this.createClientMessage(message);
    this.setMessage(response);
    this.messageHandler(message);
  };

 }

export default ActionProvider;