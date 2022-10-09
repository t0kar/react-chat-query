import React, { useContext } from 'react';
import dateFormat from 'dateformat';

import classes from './Message.module.css';

import Card from '../../UI/Card/Card';

import { ChatContext } from '../../../contexts/ChatContext';

export default function Message(props) {
  const { onMessageReply } = useContext(ChatContext);

  let commentCounter = 0;

  const comments = props.dataset.map(
    (comment) =>
      comment.parent_id === props.id &&
      ((commentCounter = commentCounter + 1),
      (
        <Message
          isComment={true}
          key={comment.timestamp}
          id={comment.id}
          authorPicture={comment.author.picture}
          authorName={comment.author.name}
          text={comment.text}
          timestamp={comment.timestamp}
          dataset={props.dataset}
        />
      ))
  );

  const messages = (
    <>
      <li className={`${!props.isComment ? classes.message : classes.comment}`}>
        <img
          src={`./media/${props.authorPicture}`}
          alt='author'
          className={classes.author_picture}
        />
        <div>
          <Card className={`${classes.message__data}`}>
            <div className={classes.author_name}>{props.authorName}</div>
            <div className={classes.text}>{props.text}</div>
          </Card>
          <div className={`${classes.message__footer}`}>
            <div className={classes.timestamp}>
              {!props.isComment
                ? dateFormat(props.timestamp, 'h:MM TT')
                : dateFormat(props.timestamp, 'h:MM TT, dd.mm.yyyy.')}
            </div>
            <span>·</span>
            <div
              className={classes.reply}
              onClick={() =>
                onMessageReply({ id: props.id, user: props.authorName })
              }
            >
              {`${commentCounter > 0 ? `Reply (${commentCounter})` : 'Reply'}`}
            </div>
          </div>
        </div>
      </li>
      <div className={classes.comment_container}>{comments}</div>
    </>
  );

  return !props.isComment ? (
    <div className={classes.message_container}>{messages}</div>
  ) : (
    <>{messages}</>
  );
}
