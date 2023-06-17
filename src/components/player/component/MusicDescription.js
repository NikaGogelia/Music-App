import { Link } from "react-router-dom";
import LikeButton from "../../like-button/LikeButton";
import ArtistsName from "../../artists-name/ArtistsName";

function MusicDescription() {
  return (
    <div className="music-description d-flex justify-content-center align-items-center">
      <img
        width={65}
        height={60}
        src="/assets/images/album.png"
        alt="music-img"
      />
      <div className="m-desc d-flex flex-column justify-content-center">
        <Link>
          <h4>Remember</h4>
        </Link>
        <span>
          {/* <ArtistsName artists={} /> */}
        </span>
      </div>
      <LikeButton />
    </div>
  );
}

export default MusicDescription;
