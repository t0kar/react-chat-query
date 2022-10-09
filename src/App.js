import './App.css';
import { ChatProvider } from './contexts/ChatContext';

import Chat from './pages/Chat/Chat';

function App() {
  return (
    <div className='App'>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </div>
  );
}

export default App;
