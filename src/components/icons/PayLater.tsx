import React from 'react';

function PayLater({
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
        <g transform="translate(-149 -92)">
          <g transform="translate(0 64)">
            <g transform="translate(149 28)">
              <circle
                cx="23"
                cy="20"
                r="19.5"
                fill={fillColor}
                fillRule="nonzero"
                stroke={balloonStrokeColor}
                strokeWidth="2"
              />
              <path
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M28.974 26.453a9.5 9.5 0 10-4.283 2.293"
              />
              <path
                fill={fillColor}
                fillRule="nonzero"
                d="M22.059 24.5l.007-.906c-1.656-.145-2.691-1.028-2.73-2.606h1.637c.043.653.472 1.043 1.109 1.164l.02-2.066-.375-.094c-1.352-.324-2.184-1-2.18-2.18-.008-1.332 1.07-2.253 2.598-2.402l.007-.91h.922l-.008.918c1.504.164 2.47 1.09 2.489 2.383h-1.621c-.047-.492-.364-.824-.883-.946l-.016 1.954.23.054c1.391.313 2.395 1.02 2.4 2.352-.005 1.355-.985 2.254-2.677 2.383l-.008.902h-.921zm.945-2.348c.59-.117.95-.468.953-.941-.004-.445-.332-.691-.937-.883l-.016 1.824zm-.89-3.582l.015-1.726c-.55.113-.848.437-.848.855-.008.45.344.703.832.871z"
              />
              <path
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M26.9193843 26.8591793L29.8900493 23.9362616 32.8607143 26.8591793"
                transform="rotate(-140 29.89 25.398)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default PayLater;
