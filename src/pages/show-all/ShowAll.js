import "./show-all.css";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import MusicCard from "../../components/card/MusicCard";
import ArtistCard from "../../components/card/ArtistCard";
import CategoryCard from "../../components/card/CategoryCard";

function ShowAll() {
  const {
    headerName,
  } = useRootContext();

  const params = useLocation();
  const { data, pageName, content } = params?.state;

  // Render Different Cards On Different Content Types
  const renderSwitch = (data) => {
    switch (content) {
      case "album":
      case "track":
        return <MusicCard {...data} key={data.id} content={content} />;
      case "artist":
        return <ArtistCard {...data} key={data.id} content={content} />;
      case "category":
        return <CategoryCard {...data} key={data.id} content={content} />;
      default:
        break;
    }
  };

  return (
    <div className="show-all">
      <h1>{headerName(pageName)}</h1>
      <div className="d-flex flex-wrap justify-content-evenly align-items-center">
        {data?.map((item) => {
          let passedData = [];
          switch (pageName) {
            case "recommends-for-you":
              passedData = item?.album;
              break;
            default:
              passedData = item;
              break;
          }

          return renderSwitch(passedData);
        })}
      </div>
    </div>
  );
}

export default ShowAll;
