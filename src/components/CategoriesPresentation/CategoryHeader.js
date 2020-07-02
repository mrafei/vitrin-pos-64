/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 *
 * CategoryHeader
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import pen from "../../../assets/images/pen.svg";
import Icon from "../Icon";
import { handleKeyDown } from "../../../utils/helper";
import { ICONS } from "../../../assets/images/icons";
// import styled from 'styled-components';

function CategoryHeader({
  categoryName,
  themeColor,
  hasShowMoreOption,
  onCategoryEditButtonClick,
  showMoreBtnOnClick,
  isEditMode,
}) {
  return (
    <div className="d-flex mx-1 justify-content-between u-textBlack">
      <span className="u-fontWeightBold u-fontSemiLarge">
        {categoryName}
        {isEditMode && (
          <img
            alt=""
            className="mx-2 cursorPointer"
            src={pen}
            onClick={onCategoryEditButtonClick}
          />
        )}
      </span>
      {hasShowMoreOption ? (
        <div
          className="d-flex u-cursor-pointer align-items-center"
          style={{
            color: themeColor,
          }}
          onClick={showMoreBtnOnClick}
          onKeyDown={(e) => handleKeyDown(e, showMoreBtnOnClick)}
          role="button"
          tabIndex="0">
          نمایش بیشتر
          <div className="mr-1" style={{ transform: "rotate(-90deg)" }}>
            <Icon icon={ICONS.CHEVRON} size={9} color={themeColor} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

CategoryHeader.propTypes = {
  categoryName: PropTypes.string,
  themeColor: PropTypes.string,
  hasShowMoreOption: PropTypes.bool,
  showMoreBtnOnClick: PropTypes.func,
  onCategoryEditButtonClick: PropTypes.func,
  isEditMode: PropTypes.bool,
};

export default memo(CategoryHeader);
