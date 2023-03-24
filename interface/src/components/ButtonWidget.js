import React from "react";
// import "./ButtonWidget.css";

const ButtonWidget = (props) => {
  const socketio = props.payload.socket;
  const options = props.payload.options;
  const optionsMarkup = options.map((button, index) => (
    <button
      className="option-button"
      key={index}
      onClick={() => {
        props.actionProvider.setMessage(props.actionProvider.createClientMessage(button.title))
        socketio.emit('user_uttered', {
            'message': button.payload,
            'session_id': socketio.id,
        });
        socketio.on('bot_uttered', (response) => {
            console.log(response);
            this.actionProvider.addMessage(response, socketio);
        })
 
      }}
    >
      {button.title}
    </button>
  ));

  return <div className="react-chatbot-kit-message-containter options-container">{optionsMarkup}</div>;
};

export default ButtonWidget;