import React from "react";
import "./index.style.scss";

type propTypes = {
  content: string | JSX.Element;
  onClick: (e:any) => void | undefined;
  buttonType?: string;
  disabled?: boolean;
};

const ButtonSt = (props: propTypes): JSX.Element => {
  
  const clickHandler = (e: any) => {
    ontransitionend = () => {(props.onClick(e))}
  }

  return (
    <button
      className={["button", props.buttonType].join(" ")}
      onClick={(e) => clickHandler(e)}
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
};

export default ButtonSt;
