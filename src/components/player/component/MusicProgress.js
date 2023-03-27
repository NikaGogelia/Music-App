import { useState } from "react";

function MusicProgress() {
  const [musicP, setMusicP] = useState(20);

  return (
    <div className="music-progress d-flex align-items-center">
      <div className="current-position m-position">0:00</div>
      <input
        style={{ backgroundSize: `${musicP - 0.5}% ` }}
        type="range"
        className="m-progress"
        name="m-progress"
        id="m-progress"
        min={1}
        max={100}
        value={musicP}
        onChange={(e) => setMusicP(e.target.value)}
      />
      <div className="time m-position">3:00</div>
    </div>
  );
}

export default MusicProgress;
