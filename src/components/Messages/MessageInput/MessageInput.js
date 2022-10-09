import React, { useState, useContext } from 'react';

import classes from './MessageInput.module.css';

// importing icons
import { FiSend } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';

import { ChatContext } from '../../../contexts/ChatContext';

import { useMutation, useQueryClient } from 'react-query';
import { addMessage } from '../../../api/chatApi';

export default function MessageInput() {
  const [enteredMessage, setEnteredMessage] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const { replyData, setReplyData } = useContext(ChatContext);

  const queryClient = useQueryClient();

  const addMessageMutation = useMutation(addMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('message');
    },
  });

  const messageChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setFormIsValid(true);
    } else setFormIsValid(false);
    setEnteredMessage(event.target.value);
  };

  // Sender dummy data
  const username = 'Lucija Toć';
  const picture = 'img/ivana.png';

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (enteredMessage.trim().length === 0) {
      return;
    }
    addMessageMutation.mutate(
      replyData.id !== ''
        ? {
            parent_id: replyData.id,
            author: {
              name: username,
              picture: picture,
            },
            text: enteredMessage,
            timestamp: Date.now(),
          }
        : {
            author: {
              name: username,
              picture: picture,
            },
            text: enteredMessage,
            timestamp: Date.now(),
          }
    );
    setFormIsValid(false);
    setEnteredMessage('');
    setReplyData('');
    console.log('Message sent!');
  };

  return (
    <Card className={classes.message_input}>
      <Card className={classes.icon}>
        <AiOutlinePlus />
      </Card>
      <form
        className={classes.message_input__form}
        onSubmit={sendMessageHandler}
      >
        <input
          value={enteredMessage || ''}
          onChange={messageChangeHandler}
          placeholder={`
            ${
              replyData.user !== undefined
                ? 'You are replying to ' + replyData.user
                : ''
            }`}
        />
        <Card className={classes.button_card}>
          <Button
            className={classes.button}
            type='submit'
            disabled={!formIsValid}
          >
            <FiSend />
            Send message
          </Button>
        </Card>
      </form>
    </Card>
  );
}
