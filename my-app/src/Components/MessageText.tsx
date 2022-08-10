import React, { ChangeEvent, memo } from "react";

type MessageTextPropsType = {
  messageText: string;
  onChangeMessageText: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessageText: string;
};

export const MessageText = memo((props: MessageTextPropsType) => {
  return (
    <div>
      <textarea
        placeholder="enter your message"
        value={props.messageText}
        onChange={props.onChangeMessageText}
      />
      {props.errorMessageText && (
        <div className="error">{props.errorMessageText}</div>
      )}
    </div>
  );
});
