import ChatBot from 'react-simple-chatbot';
import BotAvatar from './icons/rover.jpg';
import { Steps, Theme } from './components';
import { ThemeProvider } from 'styled-components';
import './Interface.css'

function Interface() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
      <ChatBot  
        botAvatar={BotAvatar}  
        headerTitle='' 
        placeholder='Enter your message...' 
        hideUserAvatar={true} 
        steps={Steps}>
      </ChatBot>
      </ThemeProvider>
    </div>
  );
}


export default Interface;
