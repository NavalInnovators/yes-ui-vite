import React from "react";
import PropTypes from "prop-types";
import "./FlexMobiusStrip.css";
import MobiusStripSVG from "../../assets/mobiusStrip.svg";

function FlexMobiusStrip({ stripWidth }) {
  return (
    <div
      className="mobiusStripContainer"
      style={{ width: stripWidth, height: stripWidth }} // Inline styles for width and height
    >
      <img
        src={MobiusStripSVG}
        alt="logo"
        className="mobiusStripImg"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

FlexMobiusStrip.propTypes = {
  stripWidth: PropTypes.string.isRequired, // Width and height of the Mobius Strip
};

export default FlexMobiusStrip;
