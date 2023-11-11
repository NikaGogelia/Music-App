import "./show-all.css";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import Footer from "../../components/footer/Footer";

function ShowAll() {
  const { headerName, renderMusicCardSwitch } = useRootContext();

  const params = useLocation();
  const { data, pageName, content } = params?.state;

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

          return renderMusicCardSwitch(passedData, content);
        })}
      </div>
      <Footer />
    </div>
  );
}

export default ShowAll;
