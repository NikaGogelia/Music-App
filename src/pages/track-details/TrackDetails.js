import "./track-details.css";
import { useLocation } from "react-router-dom";

function TrackDetails() {
  const params = useLocation();
  // const { data: propsData, content } = params?.state;
  console.log(params.state)
  return (
    <div className="track-details">
      <h1>Track Details</h1>
    </div>
  );
}

export default TrackDetails;
