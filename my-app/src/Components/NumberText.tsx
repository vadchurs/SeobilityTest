import React, { ChangeEvent } from "react";
import InputMask from "react-input-mask";

type NumberTextPropsType = {
  numberText: string;
  onChangeNumberText: (e: ChangeEvent<HTMLInputElement>) => void;
  errorNumberText: string;
};

export const NumberText = (props: NumberTextPropsType) => {
  return (
    <div>
      {/* <input
        placeholder="enter your phone"
        type={"tel"}
        value={props.numberText}
        onChange={props.onChangeNumberText}
      /> */}
      <InputMask type={"tel"} mask="+9/999/999/99/99" value={props.numberText} placeholder={"enter your phone number"} onChange={props.onChangeNumberText} />
      {props.errorNumberText && (
        <div className="error">{props.errorNumberText}</div>
      )}
    </div>
  );
};
