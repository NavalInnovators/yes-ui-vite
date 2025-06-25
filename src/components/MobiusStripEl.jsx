import React from "react";
import "./MobiusStripEl.css";
import { MobiusStrip } from "../assets";

function MobiusStripEl() {
  return (
    <div className="mobius-strip">
      <div className="mobius-strip-container">
        <div className="mobius-strip-img">
          <img src={MobiusStrip} alt="MobiusStrip" />
        </div>
      </div>
    </div>
  );
}

export default MobiusStripEl;
