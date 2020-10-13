import React from 'react';
import './index.style.scss';

type propTypes = {
  content: string;
  onClick: () => any;
  buttonType?: string;
}

const ButtonSt = (props: propTypes): JSX.Element => {
  return (
    <button
      className={["button", props.buttonType].join(" ")}
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
};

export default ButtonSt;