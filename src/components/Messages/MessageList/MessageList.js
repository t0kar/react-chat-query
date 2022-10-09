import React from 'react';
import dateFormat from 'dateformat';

import { useQuery } from 'react-query';
import { getMessages } from '../../../api/chatApi';

import classes from './MessageList.module.css';
import Message from '../Message/Message';

export default function MessageList() {
  const {
    isLoading,
    isError,
    data: chatData,
  } = useQuery('chatData', getMessages);

  // don't render if date already exist
  const dates = new Set();

  const renderDate = (message, dateNum) => {
    const timestampDate = dateFormat(message.timestamp, 'dddd, dd.mm.yyyy.');

    dates.add(dateNum);

    return <li className={classes.date}>{timestampDate}</li>;
  };

  return (
    <ul className={classes.message_list}>
      {isError && <li>Something went wrong.</li>}
      {isLoading ? (
        <li>Loading...</li>
      ) : (
        chatData.data.comments.map((message) => {
          const dateNum = dateFormat(message.timestamp, 'dddd, dd.mm.yyyy.');

          return (
            message.parent_id === undefined && (
              <div key={message.timestamp / 0.5}>
                {dates.has(dateNum) ? null : renderDate(message, dateNum)}
                <Message
                  isComment={false}
                  key={message.timestamp}
                  id={message.id}
                  authorPicture={message.author.picture}
                  authorName={message.author.name}
                  text={message.text}
                  timestamp={message.timestamp}
                  dataset={chatData.data.comments}
                />
              </div>
            )
          );
        })
      )}
    </ul>
  );
}
