import React from "react";

function TextSwitch({ isSwitchOn, toggleSwitch, disabled, texts = ["", ""], className = "" }) {
  return (
    <div
      className={`d-flex u-border-primary-blue u-border-radius-8 fit-content ${className} ${
        disabled ? "cursor-default" : "u-cursor-pointer"
      }`}
      onClick={() => {
        if (!disabled) toggleSwitch(!isSwitchOn);
      }}
      style={{ opacity: disabled ? 0.4 : 1 }}>
      <div
        className={`u-border-radius-8 px-3 py-1 ${
          isSwitchOn
            ? "u-background-primary-blue u-text-white"
            : "u-background-white u-text-primary-blue"
        }`}>
        {texts[0]}
      </div>
      <div
        className={`u-border-radius-8 px-3 py-1 ${
          !isSwitchOn
            ? "u-background-primary-blue u-text-white"
            : "u-background-white u-text-primary-blue"
        }`}>
        {texts[1]}
      </div>
    </div>
  );
}
export default TextSwitch;
