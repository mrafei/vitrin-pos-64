/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { CDN_BASE_URL } from "../../../utils/api";
import { handleKeyDown } from "../../../utils/helper";

const plusIcon = `${CDN_BASE_URL}plus-blue.svg`;

function AddNewItemSection({ className = "py-2 px-3", title, description, onClick }) {
  return (
    <div
      className={`d-flex flex-column u-addItem cursorPointer u-border-radius-4 ${className}`}
      onClick={onClick}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      role="button"
      tabIndex="0">
      <div className="u-text-dark-grey">{description}</div>
      <span className="u-text-primary-light-blue mt-1">{title}</span>
      <img src={plusIcon} alt="" />
    </div>
  );
}

AddNewItemSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default memo(AddNewItemSection);
