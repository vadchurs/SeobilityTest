import React, { ChangeEvent } from "react";

type NameTextPropsType = {
    nameText: string
    onChangeNameText: (e: ChangeEvent<HTMLInputElement>) => void
    errorNameText: string
}

export const NameText = (props:NameTextPropsType) => {
    return (
        <div>
        <input
          className="nameText"
          placeholder="enter your Name"
          type={"text"}
          value={props.nameText}
          onChange={props.onChangeNameText}
        />
        {props.errorNameText && <div className="error">{props.errorNameText}</div>}
      </div>
    )
}