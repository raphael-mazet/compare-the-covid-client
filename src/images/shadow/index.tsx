import React from 'react';
import './index.style.scss'

const ShadowSvg = (): JSX.Element => {
    
  const fillColor = '#E63946'

	return (

<p className="shadowFrame">
  <svg version="1.1" className="shadow" id="Layer_1" x="61px" y="20px"
	 width="150px" height="20px" viewBox="0 0 122.436 39.744" enable-background="new 0 0 122.436 39.744">
    <ellipse fill={fillColor} cx="61.128" cy="19.872" rx="49.25" ry="8.916"/>
  </svg>
</p>

)
}

export default ShadowSvg;