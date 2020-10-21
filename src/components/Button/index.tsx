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
      console.log('clicked')
      startAnimation();
      onanimationend = () => {
        console.log('finished')
        props.onClick(e);
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
