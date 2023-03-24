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

  setMessage = (message) => {
    this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
    }));
  };

  addMessage = (response, socketio) => {
    let message = '';
    if (typeof response.quick_replies !== 'undefined') {
      message = this.createChatBotMessage(response.text, {
        widget: 'buttonWidget',
        payload: {
          "socket": socketio,
          "options": response.quick_replies,
        },
      });
    } else {
      message = this.createChatBotMessage(response.text);
    }
    this.setMessage(message);
  };
}

export default ActionProvider;