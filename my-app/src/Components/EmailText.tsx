import React, { ChangeEvent, memo } from "react";

type EmailTextPropsType = {
  emailText: string;
  onChangeEmailText: (e: ChangeEvent<HTMLInputElement>) => void;
  errorEmailText: string;
};

export const EmailText = memo((props: EmailTextPropsType) => {
  return (
    <div>
      <input
        placeholder="enter your email"
        type={"text"}
        value={props.emailText}
        onChange={props.onChangeEmailText}
      />
      {props.errorEmailText && (
        <div className="error">{props.errorEmailText}</div>
      )}
    </div>
  );
});
