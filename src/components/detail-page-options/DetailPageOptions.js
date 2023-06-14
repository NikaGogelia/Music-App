import "./detail-page-options.css";
import PlayButton from "../play-button/PlayButton";
import LikeButton from "../like-button/LikeButton";

function DetailPageOptions() {
  return (
    <div className="detail-page-options d-flex align-items-center">
      <PlayButton />
      <LikeButton />
    </div>
  );
}

export default DetailPageOptions;
