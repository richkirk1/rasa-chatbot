import socket from '../socketio';

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
    const socketio = socket("http://localhost:5005/");

    socketio.emit('user_uttered', {
      'message': message,
      'session_id': socketio.id,
    });

    socketio.on('bot_uttered', (response) => {
      console.log(response);
      this.addBotMessage(response);
    });
  }

   setMessage = (message) => {
    this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
    }));
   };

  /*
   Bot & User message creators. 
   
   Added user message here as it was already present and felt the message creation should be within actions.
  */
   addBotMessage = (response) => {
    const message = this.createChatBotMessage(response.text, (response.quick_replies ? {
        widget: 'buttonWidget',
        payload: {
          "options": response.quick_replies,
        },
      } : undefined));

    this.setMessage(message);
  };

  addUserMessage = (message) => {
    const response = this.createClientMessage(message);
    this.setMessage(response);
    this.messageHandler(message);
  };

 }

export default ActionProvider;