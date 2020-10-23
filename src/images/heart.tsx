import React from 'react';

const HeartSvg = (): JSX.Element => {
	
	const fillColor = '#E63946'
	
	return (
		<svg version="1.1" x="0px" y="0px" width="100px" height="50px" viewBox="0 0 100 85">
			<style type="text/css">
			</style>
			<defs>
			</defs>
			<path fill={fillColor} d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0
				c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"/>
		
			<animateTransform 
        attributeName="transform" 
        type="scale" 
        values="1; 1.5; 1.25; 1.5; 1.5; 1;" 
        dur="3s" 
        repeatCount="indefinite"
				> 
      </animateTransform>
		</svg>
	)
}

export default HeartSvg;