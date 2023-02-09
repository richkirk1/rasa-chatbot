import ChatBot from 'react-simple-chatbot';
import Steps from './components/Steps.js';
import BotAvatar from './icons/Rover.webp';
import Theme from './components/Theme.js';
import { ThemeProvider } from 'styled-components';

function Interface() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
      <ChatBot botAvatar={BotAvatar} hideUserAvatar={true} steps={Steps}>
      </ChatBot>
      </ThemeProvider>
    </div>
  );
}

export default Interface;
