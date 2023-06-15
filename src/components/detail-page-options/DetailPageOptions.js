import "./detail-page-options.css";
import PlayButton from "../play-button/PlayButton";
import LikeButton from "../like-button/LikeButton";
import MoreOptionsButton from "../more-options-button/MoreOptionsButton";

function DetailPageOptions() {
  return (
    <div className="detail-page-options d-flex align-items-center">
      <PlayButton />
      <div className="d-flex align-items-center">
        <LikeButton />
        <MoreOptionsButton content="album" />
      </div>
    </div>
  );
}

export default DetailPageOptions;
