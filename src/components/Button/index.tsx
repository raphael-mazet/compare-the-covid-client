import React, { useState } from "react";
import "./index.style.scss";

type propTypes = {
  content: string | JSX.Element;
  onClick: (e:any) => void | undefined;
  buttonType?: string;
  disabled?: boolean;
};

const ButtonSt = (props: propTypes): JSX.Element => {
  
  const [className, setClassName] = useState<string>('');

  const startAnimation = () => {
    setClassName('animation');
  }

  const clickHandler = (e: any) => {
    if (props.buttonType === 'back') {
      startAnimation();
      onanimationend = (e) => {
        if (e.animationName === 'fadeTextout') props.onClick(e);
        else e.preventDefault();
      }
    } else {
      props.onClick(e);
    }
  }

  return (
    <button
      className={["button", props.buttonType, className].join(" ")}
      onClick={(e) => clickHandler(e)}
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
};

export default ButtonSt;
