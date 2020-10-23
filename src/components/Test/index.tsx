import React from "react";
import './index.style.scss';
import sadface from '../../images/sad.png'

const Test = (): JSX.Element  => {

  return (
    <div className="x">
      <img className="y" src={sadface}/>
    </div>
  );
};

export default Test;