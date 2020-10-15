import React from 'react';

type propTypes = {
    color: string;
    height: string;
}

const SearchSvg = (props: propTypes): JSX.Element => {
    return (
        <svg width={props.height || "18px"} height={props.height || "18px"} viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g id="Screen" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="search-location" transform="translate(-1370.000000, -144.000000)">
                    <g id="Table-tabs-and-search" transform="translate(-1.000000, 135.000000)">
                        <g id="Group" transform="translate(33.000000, 0.000000)">
                            <g id="Search-Field" transform="translate(1122.000000, 0.000000)">
                                <g id="baseline-search-24px" transform="translate(213.000000, 6.400000)">
                                    <g id="Shape">
                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                        <path d="M15.5,14 L14.71,14 L14.43,13.73 C15.41,12.59 16,11.11 16,9.5 C16,5.91 13.09,3 9.5,3 C5.91,3 3,5.91 3,9.5 C3,13.09 5.91,16 9.5,16 C11.11,16 12.59,15.41 13.73,14.43 L14,14.71 L14,15.5 L19,20.49 L20.49,19 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 Z" fill={props.color} fillRule="nonzero"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default SearchSvg;