import { useState } from "react";
import PlayButton from "../../play-button/PlayButton";

function PlaybackControls() {
  const [play, setPlay] = useState(false);

  return (
    <div className="playback-controls d-flex align-items-center">
      <button className="left-arrow playback-arrow" title="Previous">
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
      <PlayButton />
      <button className="right-arrow playback-arrow" title="Next">
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
