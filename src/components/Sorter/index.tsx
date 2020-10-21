import React from "react";
import './index.style.scss';

type sortProps = {
  sortName: string,
  onClick: ()=>void,
}

const Sorter = (props: sortProps ): JSX.Element | null => {
  
  return (
    <div className='sorter_container'>
      <div className='sorter_element'onClick={props.onClick}>
        {props.sortName}
      </div>     
    </div>
  );
};

export default Sorter;