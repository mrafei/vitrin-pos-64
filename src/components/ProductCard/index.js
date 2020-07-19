/**
 *
 * ProductCard
 *
 */

import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductPrice from "./ProductPrice";
import { CDN_BASE_URL } from "../../../utils/api";
import {
  calculateDiscountPercent,
  ellipseText,
  englishNumberToPersianNumber,
  noOp,
  priceFormatter,
} from "../../../utils/helper";
import Switch from "../Swtich";
import pen from "../../../assets/images/pen.svg";
const penIcon = `${CDN_BASE_URL}edit-pen-white-icn.svg`;

function ProductCard({ onClick, themeColor, product, _updateProduct = noOp, loading, isList }) {
  const {
    title,
    initial_price: initialPrice,
    discounted_price: discountedPrice,
    main_image_thumbnail_url: mainImageThumbnailUrl,
  } = product;
  useEffect(() => {
    setAvailable(product.available);
  }, [product.available]);
  const [snackBar, setSnackBar] = useState(false);
  const [available, setAvailable] = useState(product.available);
  const changeAvailability = useCallback(
    (availability) => {
      if (!loading) {
        setAvailable(availability);
        _updateProduct(product.id, { ...product, available: availability }, []);
      }
    },
    [product, available, loading]
  );
  const discountPercent = calculateDiscountPercent(initialPrice, discountedPrice);
  if (isList)
    return (
      <div
        onClick={() => onClick(product)}
        className="d-flex u-cursor-pointer text-center align-items-center mt-1 flex-1 mx-1 my-2">
        <div className="col-3 px-0 d-flex align-items-center">
          <div className="col-2 px-0">
            <img
              className="u-height-36 width-36 u-border-radius-4 u-background-melo-grey"
              style={{ boxShadow: " inset 0px 0px 4px rgba(0, 0, 0, 0.1)" }}
              alt={`image-${product.id}`}
              src={mainImageThumbnailUrl}
            />
          </div>
          <div
            className="d-flex align-items-center col-10 pl-0 text-right pr-3"
            style={{ minHeight: 48 }}>
            {title}
          </div>
        </div>
        <div className="col-7 px-0 d-flex">
          <div className="col-3 px-0">
            <span>{priceFormatter(initialPrice)}</span>{" "}
            <span className="u-font-semi-small">تومان</span>
          </div>
          <div className="col-3 px-0">
            <span>{priceFormatter(initialPrice - discountedPrice)}</span>
            {initialPrice - discountedPrice ? <span style={{ marginRight: 2 }}>-</span> : ""}{" "}
            <span className="u-font-semi-small">تومان</span>
          </div>
          <div className="col-2 px-0 u-fontMedium">
            ٪<span>{englishNumberToPersianNumber(discountPercent)}</span>
          </div>
          <div className="col-4 px-0">
            <span>{priceFormatter(discountedPrice)}</span>{" "}
            <span className="u-font-semi-small">تومان</span>
          </div>
        </div>
        <div className="col-2 px-0 d-flex">
          <div className="col-10 px-0">
            <div className="d-flex justify-content-center align-items-end flex-1">
              <span
                style={{ width: 40 }}
                className={`u-font-semi-small ml-2 u-fontWeightBold ${
                  available ? "u-text-primary-blue" : "u-text-darkest-grey"
                }`}>
                {available ? "موجود" : "ناموجود"}
              </span>
              <Switch isSwitchOn={available} toggleSwitch={changeAvailability} />
            </div>
          </div>
          <div className="col-2 px-0" onClick={() => onClick(product)}>
            <img alt="" className="mx-2 cursorPointer" src={pen} />
          </div>
        </div>
      </div>
    );
  return (
    <div
      onClick={() => onClick(product)}
      style={{ margin: 12 }}
      className="u-relative u-cursor-pointer c-business-card-custom u-background-white d-flex flex-column u-dashed-border">
      <div
        className="position-relative align-self-center overflow-hidden u-border-top-left-radius-4 u-border-top-right-radius-4"
        style={{ background: "#c4c4c4" }}>
        <div className="liner-gradiant-card d-flex align-items-center p-1" />
        <img className="c-business-card-item-img" src={mainImageThumbnailUrl} alt="بهترینو" />
        <ProductPrice initialPrice={initialPrice} discountedPrice={discountedPrice} />
        <div
          tabIndex="0"
          role="button"
          onKeyDown={() => setSnackBar(false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSnackBar(false);
          }}
          className="add-snackbar d-flex justify-content-center align-items-center u-text-white u-fontWeightBold position-absolute w-100 bottom-0"
          style={{
            backgroundColor: themeColor,
            transform: `translateY(${snackBar ? 0 : "50px"})`,
          }}>
          به سبد خرید افزوده شد!
        </div>
      </div>
      <div className="u-fontNormal px-1 u-text-black mt-1 u-fontWeightBold text-right overflow-hidden">
        {ellipseText(title, 40)}
      </div>
      <div className="d-flex justify-content-between px-1 align-items-end pb-2 flex-1">
        <span
          style={{ width: 40 }}
          className={`u-font-semi-small u-fontWeightBold ${
            available ? "u-text-primary-blue" : "u-text-darkest-grey"
          }`}>
          {available ? "موجود" : "ناموجود"}
        </span>
        <Switch isSwitchOn={available} toggleSwitch={changeAvailability} />
      </div>
      <button
        type="button"
        className="c-btn c-product-btn-editMode u-border-radius-4 u-addItem z-index-2">
        <img alt="" src={penIcon} />
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  increaseOrderItem: PropTypes.func,
  decreaseOrderItem: PropTypes.func,
  product: PropTypes.object,
  hasOrderControlPanel: PropTypes.bool,
  themeColor: PropTypes.string,
  count: PropTypes.number,
};

export default memo(ProductCard);
