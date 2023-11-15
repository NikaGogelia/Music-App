import "./detail-page-options.css";
import PlayButton from "../play-button/PlayButton";
import LikeButton from "../like-button/LikeButton";
import MoreOptionsButton from "../more-options-button/MoreOptionsButton";

function DetailPageOptions({
  content,
  track,
  playlist,
  ownerPlaylist,
  likesPlaylist,
  artistPage,
}) {
  if (likesPlaylist || artistPage)
    return (
      <div className="detail-page-options d-flex align-items-center">
        <PlayButton />
      </div>
    );
  if (ownerPlaylist)
    return (
      <div className="detail-page-options d-flex align-items-center">
        <PlayButton />
        <div className="d-flex align-items-center">
          <MoreOptionsButton content={content} track={track} />
        </div>
      </div>
    );
  return (
    <div className="detail-page-options d-flex align-items-center">
      <PlayButton />
      <div className="d-flex align-items-center">
        <LikeButton content={content} track={track} playlist={playlist} />
        <MoreOptionsButton content={content} track={track} />
      </div>
    </div>
  );
}

export default DetailPageOptions;
