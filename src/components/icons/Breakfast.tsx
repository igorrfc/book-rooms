import React from 'react';

function Breakfast({
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
      <g fill="none" stroke="none">
        <g transform="translate(-81 -92)">
          <g transform="translate(0 64)">
            <g transform="translate(81 28)">
              <circle
                cx="23"
                cy="20"
                r="19"
                fill={fillColor}
                stroke={balloonStrokeColor}
                strokeWidth="2"
              />
              <g
                stroke={strokeColor}
                strokeWidth="2"
                transform="translate(15 11)"
              >
                <path d="M14 7v3.767a5.152 5.152 0 01-1.331 3.46 5.152 5.152 0 01-3.308 1.678 18.265 18.265 0 01-3.65.007 5.21 5.21 0 01-3.291-1.618 5.21 5.21 0 01-1.416-3.366h0L1 7h13z" />
                <path d="M14 8c2 0 3 .833 3 2.5S16 13 14 13" />
                <path
                  d="M5 4c5.333-1 6.333-2.333 3-4"
                  transform="matrix(-1 0 0 1 14.923 0)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Breakfast;
