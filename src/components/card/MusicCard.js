import "./card.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

function MusicCard({ album, images, name, artists, content }) {
  const { url } = content === "track" ? album?.images[0] : images[0];
  const titleWidth = 23;
  const textWidth = 2;

  return (
    <div className="music-card card animate__fadeIn">
      <LazyLoadImage
        className="card-img-top"
        effect="blur"
        src={url}
        alt="card-img"
      />
      <button className="play-album">
        <svg
          width={60}
          height={60}
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 54C36.3652 54 42.4697 51.4714 46.9706 46.9706C51.4714 42.4697 54 36.3652 54 30C54 23.6348 51.4714 17.5303 46.9706 13.0294C42.4697 8.52856 36.3652 6 30 6C23.6348 6 17.5303 8.52856 13.0294 13.0294C8.52856 17.5303 6 23.6348 6 30C6 36.3652 8.52856 42.4697 13.0294 46.9706C17.5303 51.4714 23.6348 54 30 54ZM28.665 21.504C28.2132 21.2026 27.688 21.0294 27.1455 21.0031C26.6031 20.9767 26.0636 21.0981 25.5847 21.3544C25.1058 21.6106 24.7055 21.992 24.4264 22.458C24.1473 22.9239 23.9999 23.4569 24 24V36C23.9999 36.5431 24.1473 37.0761 24.4264 37.542C24.7055 38.008 25.1058 38.3894 25.5847 38.6456C26.0636 38.9019 26.6031 39.0233 27.1455 38.9969C27.688 38.9706 28.2132 38.7974 28.665 38.496L37.665 32.496C38.0759 32.222 38.4128 31.8509 38.6458 31.4155C38.8788 30.98 39.0007 30.4938 39.0007 30C39.0007 29.5062 38.8788 29.02 38.6458 28.5845C38.4128 28.1491 38.0759 27.778 37.665 27.504L28.665 21.504Z"
          />
          <rect x={4} y={4} width={52} height={52} rx={26} strokeWidth={8} />
        </svg>
      </button>
      <div className="card-body">
        <h4 className="card-title">
          {name.length > titleWidth ? name.slice(0, titleWidth) + "..." : name}
        </h4>
        <p className="card-text">
          {artists.length > textWidth
            ? artists
                .splice(0, textWidth + 1)
                .map((artist) =>
                  artists.indexOf(artist) === artists.length - 1
                    ? artist.name
                    : artist.name + ", "
                ) + "And More"
            : artists.map((artist) =>
                artists.indexOf(artist) === artists.length - 1
                  ? artist.name
                  : artist.name + ", "
              )}
        </p>
      </div>
    </div>
  );
}

export default MusicCard;
