import React, { useState, createContext } from 'react';

export const ChatContext = createContext({});

export const ChatProvider = (props) => {
  const [replyData, setReplyData] = useState('');

  const onMessageReply = (data) => {
    setReplyData(data);
    console.log('You are replying to the message.');
  };

  return (
    <ChatContext.Provider
      value={{
        onMessageReply,
        replyData,
        setReplyData,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
