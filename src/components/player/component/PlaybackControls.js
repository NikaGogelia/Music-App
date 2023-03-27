import { useState } from "react";

function PlaybackControls() {
  const [play, setPlay] = useState(false);

  return (
    <div className="playback-controls d-flex align-items-center">
      <button className="left-arrow">
        <svg
          width="30"
          height="26"
          viewBox="0 0 30 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 20.2917V5.70834"
            stroke="#f9feff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.75 21.3333L11.25 13L23.75 4.66666V21.3333Z"
            fill="#f9feff"
            stroke="#f9feff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button className="pause-play" onClick={() => setPlay(!play)}>
        {play ? (
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M54 30C54 36.3652 51.4714 42.4697 46.9706 46.9706C42.4697 51.4714 36.3652 54 30 54C23.6348 54 17.5303 51.4714 13.0294 46.9706C8.52856 42.4697 6 36.3652 6 30C6 23.6348 8.52856 17.5303 13.0294 13.0294C17.5303 8.52856 23.6348 6 30 6C36.3652 6 42.4697 8.52856 46.9706 13.0294C51.4714 17.5303 54 23.6348 54 30ZM21 24C21 23.2044 21.3161 22.4413 21.8787 21.8787C22.4413 21.3161 23.2044 21 24 21C24.7956 21 25.5587 21.3161 26.1213 21.8787C26.6839 22.4413 27 23.2044 27 24V36C27 36.7956 26.6839 37.5587 26.1213 38.1213C25.5587 38.6839 24.7956 39 24 39C23.2044 39 22.4413 38.6839 21.8787 38.1213C21.3161 37.5587 21 36.7956 21 36V24ZM36 21C35.2044 21 34.4413 21.3161 33.8787 21.8787C33.3161 22.4413 33 23.2044 33 24V36C33 36.7956 33.3161 37.5587 33.8787 38.1213C34.4413 38.6839 35.2044 39 36 39C36.7956 39 37.5587 38.6839 38.1213 38.1213C38.6839 37.5587 39 36.7956 39 36V24C39 23.2044 38.6839 22.4413 38.1213 21.8787C37.5587 21.3161 36.7956 21 36 21Z"
              fill="white"
            />
            <rect
              x="4"
              y="4"
              width="52"
              height="52"
              rx="26"
              stroke="#f9feff"
              strokeWidth="8"
            />
          </svg>
        ) : (
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30 54C36.3652 54 42.4697 51.4714 46.9706 46.9706C51.4714 42.4697 54 36.3652 54 30C54 23.6348 51.4714 17.5303 46.9706 13.0294C42.4697 8.52856 36.3652 6 30 6C23.6348 6 17.5303 8.52856 13.0294 13.0294C8.52856 17.5303 6 23.6348 6 30C6 36.3652 8.52856 42.4697 13.0294 46.9706C17.5303 51.4714 23.6348 54 30 54ZM28.665 21.504C28.2132 21.2026 27.688 21.0294 27.1455 21.0031C26.6031 20.9767 26.0636 21.0981 25.5847 21.3544C25.1058 21.6106 24.7055 21.992 24.4264 22.458C24.1473 22.9239 23.9999 23.4569 24 24V36C23.9999 36.5431 24.1473 37.0761 24.4264 37.542C24.7055 38.008 25.1058 38.3894 25.5847 38.6456C26.0636 38.9019 26.6031 39.0233 27.1455 38.9969C27.688 38.9706 28.2132 38.7974 28.665 38.496L37.665 32.496C38.0759 32.222 38.4128 31.8509 38.6458 31.4155C38.8788 30.98 39.0007 30.4938 39.0007 30C39.0007 29.5062 38.8788 29.02 38.6458 28.5845C38.4128 28.1491 38.0759 27.778 37.665 27.504L28.665 21.504Z"
              fill="#f9feff"
            />
            <rect
              x="4"
              y="4"
              width="52"
              height="52"
              rx="26"
              stroke="#f9feff"
              strokeWidth="8"
            />
          </svg>
        )}
      </button>
      <button className="right-arrow">
        <svg
          width="30"
          height="26"
          viewBox="0 0 30 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.75 5.70832L23.75 20.2917"
            stroke="#F3F4F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.25 4.66667L18.75 13L6.25 21.3333L6.25 4.66667Z"
            fill="#F3F4F6"
            stroke="#F3F4F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default PlaybackControls;
