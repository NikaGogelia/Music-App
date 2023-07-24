import "./detail-page-options.css";
import PlayButton from "../play-button/PlayButton";
import LikeButton from "../like-button/LikeButton";
import MoreOptionsButton from "../more-options-button/MoreOptionsButton";

function DetailPageOptions({ content, track }) {
  return (
    <div className="detail-page-options d-flex align-items-center">
      <PlayButton />
      {content === "album" || content === "track" || content === "playlist" ? (
        <div className="d-flex align-items-center">
          <LikeButton content={content} track={track} />
          <MoreOptionsButton content={content} track={track}/>
        </div>
      ) : null}
    </div>
  );
}

export default DetailPageOptions;
