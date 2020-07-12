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
import { ICONS } from "../../../assets/images/icons";
import { Link } from "react-router-dom";
// import styled from 'styled-components';

function CategoryHeader({ categoryName, onCategoryEditButtonClick, isEditMode, isList }) {
  return (
    <div>
      <div className="d-flex mx-1 justify-content-between u-textBlack align-items-center">
        <span className="u-fontWeightBold">
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
        {isList && isEditMode ? (
          <Link
            to="/products/new"
            className="u-cursor-pointer u-background-primary-blue u-border-radius-4 d-inline-flex justify-content-center align-items-center pr-2 py-2 pl-3">
            <Icon icon={ICONS.PLUS} color="white" className="ml-2" size={12} />
            <span className="u-fontWeightBold u-fontMedium u-text-white">افزودن محصول جدید</span>
          </Link>
        ) : null}
      </div>
      {isList ? (
        <div className="d-flex text-center align-items-center mt-4">
          <div className="col-3 px-0 d-flex align-items-center">
            <div className="col-2 px-0" />
            <div className="col-10  pl-0 text-right pr-3">نام محصول</div>
          </div>
          <div className="col-7 px-0 d-flex">
            <div className="col-3 px-0">قیمت واحد</div>
            <div className="col-3 px-0">میزان تخفیف</div>
            <div className="col-2 px-0">درصد تخفیف</div>
            <div className="col-4 px-0">قیمت بعد از تخفیف</div>
          </div>
          <div className="col-2 px-0 d-flex">
            <div className="col-10 px-0" />
            <div className="col-2 px-0" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

CategoryHeader.propTypes = {
  categoryName: PropTypes.string,
  themeColor: PropTypes.string,
  showMoreBtnOnClick: PropTypes.func,
  onCategoryEditButtonClick: PropTypes.func,
  isEditMode: PropTypes.bool,
};

export default memo(CategoryHeader);
