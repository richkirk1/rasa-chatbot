import React from 'react';
import ReactDOM from 'react-dom/client';
import Interface from './Interface';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
    <React.StrictMode>
        <Interface />
    </React.StrictMode>
    
);

const header = document.getElementById("react-chatbot-kit-chat-header").innerHTML;
console.log(header);
header.remove();

