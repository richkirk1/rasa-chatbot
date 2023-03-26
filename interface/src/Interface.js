import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './App.css';

import MessageParser from './components/MessageParser';
import ActionProvider from './components/ActionProvider';
import config from './components/config';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Chatbot 
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='Rover Support'
      />
      </header> 
    </div>
  );
}

export default App;
