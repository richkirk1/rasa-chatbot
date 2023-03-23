import socket from '../socketio';

// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        const socketio = socket("http://localhost:5005/");

        socketio.emit('user_uttered', {
            'message': message,
            'session_id': socketio.id,
        });

        socketio.on('bot_uttered', (response) => {
            console.log(response);
            this.actionProvider.addMessage(response.text);
        })
    }
}

export default MessageParser;