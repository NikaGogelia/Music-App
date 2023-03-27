import { useEffect, useState } from "react";
import { Howl } from "howler";

function MusicDescription() {
  const [favorite, setFavorite] = useState(false);

  const sound = new Howl({
    src: ["./assets/sounds/ting.mp3"],
  });

  useEffect(() => {
    if (favorite) {
      sound.play();
    }
  });

  return (
    <div className="music-description d-flex justify-content-center align-items-center">
      <img
        width={65}
        height={60}
        src="./assets/images/album.png"
        alt="music-img"
      />
      <div className="m-desc">
        <h4>Remember</h4>
        <p>Pop Smoke, Nigo</p>
      </div>
      <button
        className={`favorite-music ${favorite ? "favorite-active" : ""}`}
        onClick={() => setFavorite(!favorite)}
      >
        <svg
          width={21}
          height={19}
          viewBox="0 0 21 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.60678 4.60201C1.84235 4.03329 2.18764 3.51655 2.62292 3.08127C3.05819 2.64599 3.57494 2.30071 4.14366 2.06513C4.71238 1.82956 5.32193 1.70831 5.9375 1.70831C6.55308 1.70831 7.16263 1.82956 7.73134 2.06513C8.30006 2.30071 8.81681 2.64599 9.25209 3.08127L10.625 4.45419L11.9979 3.08127C12.877 2.20219 14.0693 1.70832 15.3125 1.70832C16.5557 1.70832 17.748 2.20219 18.6271 3.08127C19.5062 3.96035 20 5.15264 20 6.39585C20 7.63906 19.5062 8.83136 18.6271 9.71044L10.625 17.7125L2.62292 9.71044C2.18764 9.27516 1.84235 8.75841 1.60678 8.1897C1.37121 7.62098 1.24996 7.01143 1.24996 6.39585C1.24996 5.78028 1.37121 5.17073 1.60678 4.60201Z"
            stroke="#f9feff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default MusicDescription;
