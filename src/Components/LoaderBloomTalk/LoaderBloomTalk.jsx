import React from "react";
import "./LoaderBloomTalk.css";

const LoaderBloomTalk = ({ size = "medium", fullScreen = false }) => {
    return (
        <div
            className={`loader-wrapper ${fullScreen ? "fullscreen" : ""}`}
        >
            <img
                src="/Loader_BloomTalk.gif"
                className={`loader-gif loader-${size}`}
            />
        </div>
    );
};

export default LoaderBloomTalk;