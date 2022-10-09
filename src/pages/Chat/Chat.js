import React from 'react';

import classes from './Chat.module.css';

import Card from '../../components/UI/Card/Card';
import MessageInput from '../../components/Messages/MessageInput/MessageInput';
import MessageList from '../../components/Messages/MessageList/MessageList';

export default function Chat() {
  return (
    <Card className={classes.chat}>
      <MessageList />
      <MessageInput />
    </Card>
  );
}
