


// ActionProvider starter code
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

   addMessage = (response) => {
    const message = this.createChatBotMessage(response)
    this.setMessage(message);
   };
 }

export default ActionProvider;