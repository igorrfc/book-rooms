import React from 'react';

function Wifi({
  fillColor,
  strokeColor,
  balloonStrokeColor,
}: {
  fillColor: string;
  strokeColor: string;
  balloonStrokeColor: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="50"
      viewBox="0 0 47 40"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-12 -92)">
          <g transform="translate(0 64)">
            <g transform="translate(12.5 28)">
              <circle
                cx="23.5"
                cy="20"
                r="19.5"
                fill={fillColor}
                fillRule="nonzero"
                stroke={balloonStrokeColor}
                strokeWidth="2"
              />
              <g transform="translate(13.775 13)">
                <path
                  stroke={strokeColor}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.25"
                  d="M19.514 4.185a15.004 15.004 0 00-1.117-1.018C15.978 1.177 12.977 0 9.727 0 6.476 0 3.474 1.18 1.054 3.172c-.365.3-.716.618-1.053.954"
                />
                <path
                  stroke={strokeColor}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.25"
                  d="M16.617 6.96a10.907 10.907 0 00-.756-.689C14.137 4.842 12.017 4 9.726 4c-2.322 0-4.467.865-6.204 2.328-.232.196-.457.402-.674.618M13.835 9.845a6.79 6.79 0 00-.532-.495C12.281 8.497 11.05 8 9.727 8c-1.368 0-2.635.53-3.677 1.436-.142.123-.28.253-.413.39"
                />
                <circle cx="9.725" cy="13" r="2" fill={strokeColor} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Wifi;
