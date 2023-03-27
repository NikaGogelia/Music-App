import "./player.css";
import MusicDescription from "./component/MusicDescription";
import PlaybackControls from "./component/PlaybackControls";
import MusicProgress from "./component/MusicProgress";
import VolumeProgress from "./component/VolumeProgress";
import MoreOptions from "./component/MoreOptions";
import { Col, Row } from "react-bootstrap";

function Player() {
  return (
    <Row className="player d-flex justify-content-between align-items-center">
      <Col
        lg={3}
        className="music-desc-container d-flex justify-content-start align-items-center"
      >
        <MusicDescription />
      </Col>
      <Col
        lg={6}
        className="music-controls-container d-flex flex-column justify-content-center align-items-center"
      >
        <PlaybackControls />
        <MusicProgress />
      </Col>
      <Col
        lg={3}
        className="other-options-container d-flex justify-content-end align-items-center"
      >
        <MoreOptions />
        <VolumeProgress />
      </Col>
    </Row>
  );
}

export default Player;
