import React from 'react';

function ChevronRight({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 5 8"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="_linked/03.-hotel---subpage---all-deals"
          transform="translate(-351.000000, -558.000000)"
          fill="#0077FF"
          fillRule="nonzero"
        >
          <g
            id="section---deluxe-room"
            transform="translate(16.000000, 548.000000)"
          >
            <g id="btn---room-info" transform="translate(276.000000, 3.000000)">
              <g id="Path-2" transform="translate(55.000000, 1.000000)">
                <path d="M4.44151901,7.99084312 C4.17043385,7.77715956 4.12390064,7.38417687 4.3375842,7.1130917 C4.55126775,6.84200653 4.94425045,6.79547333 5.21533562,7.00915688 L8.3869083,9.50915688 C8.7043639,9.75939204 8.7043639,10.240608 8.3869083,10.4908431 L5.21533562,12.9908431 C4.94425045,13.2045267 4.55126775,13.1579935 4.3375842,12.8869083 C4.12390064,12.6158231 4.17043385,12.2228404 4.44151901,12.0091569 L6.99039385,10 L4.44151901,7.99084312 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ChevronRight;
