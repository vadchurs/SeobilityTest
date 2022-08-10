import React, { ChangeEvent, memo } from "react";

type BirthPropsType = {
  birth: string;
  onChangeBirth: (e: ChangeEvent<HTMLInputElement>) => void;
  errorBirth: string;
};

export const Birth = memo((props: BirthPropsType) => {
  return (
    <div>
      <input type={"date"} onChange={props.onChangeBirth} value={props.birth} />
      {props.errorBirth && <div className="error">{props.errorBirth}</div>}
    </div>
  );
});
