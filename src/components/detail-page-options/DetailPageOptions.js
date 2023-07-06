import "./detail-page-options.css";
import PlayButton from "../play-button/PlayButton";
import LikeButton from "../like-button/LikeButton";
import MoreOptionsButton from "../more-options-button/MoreOptionsButton";

function DetailPageOptions({ content }) {
  return (
    <div className="detail-page-options d-flex align-items-center">
      <PlayButton />
      {content === "album" ? (
        <div className="d-flex align-items-center">
          <LikeButton />
          <MoreOptionsButton content={content} />
        </div>
      ) : null}
    </div>
  );
}

export default DetailPageOptions;
