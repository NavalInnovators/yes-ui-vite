import React from "react";
import PropTypes from "prop-types";
import { FlexMobiusStrip } from "../index.jsx";
import "./FlexMobiusWrapper.css";

function FlexMobiusWrapper({
  wrapperWidth,
  wrapperHeight,
  stripWidth,
  heading,
  headingSize = "7rem",
  headingWeight = "400",
  text,
  textSize = "1.5rem",
  textWeight = "400",
}) {
  return (
    <div
      className="FlexMobiusWrapper"
      style={{
        width: wrapperWidth,
        height: wrapperHeight,
        position: "relative",
      }}
    >
      <div
        className="text-overlay"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          whiteSpace: "nowrap",
          zIndex: 2,
        }}
      >
        <h1 className="mobiusStripHeading" style={{ margin: 0, fontSize: headingSize, fontWeight: headingWeight }}>
          {heading}
        </h1>
        <p className="mobiusStripText" style={{ margin: 0, fontSize: textSize, fontWeight: textWeight }}>
          {text}
        </p>
      </div>
      <FlexMobiusStrip stripWidth={stripWidth} />
    </div>
  );
}

FlexMobiusWrapper.propTypes = {
  wrapperWidth: PropTypes.string.isRequired, // Width of the wrapper
  wrapperHeight: PropTypes.string.isRequired, // Height of the wrapper
  stripWidth: PropTypes.string.isRequired, // Width of the Mobius Strip
  heading: PropTypes.string.isRequired, // Text for the heading
  headingSize: PropTypes.string, // Font size of the heading
  headingWeight: PropTypes.string, // Font weight of the heading
  text: PropTypes.string.isRequired, // Text for the paragraph
  textSize: PropTypes.string, // Font size of the paragraph
  textWeight: PropTypes.string, // Font weight of the paragraph
};

export default FlexMobiusWrapper;
