import React from "react";
import "./LoaderEnvelope.css";

const LoaderEnvelope = ({ size = "medium", fullScreen = false }) => {
    return (
        <div className={`loader-envelope-wrapper ${fullScreen ? "fullscreen" : ""}`}>
            <img
                src="/Loader_Envelope.gif"
                alt="Loading..."
                className={`loader-envelope-gif loader-${size}`}
            />
        </div>
    );
};

export default LoaderEnvelope;