/**
 *
 * ProductCard
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import AdminProductCard from "./AddNewProductCard";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import RenderOrderControlPanel from "./RenderOrderControlPanel";
import { CDN_BASE_URL } from "../../../utils/api";
import { handleKeyDown } from "../../../utils/helper";
const penIcon = `${CDN_BASE_URL}edit-pen-white-icn.svg`;

function ProductCard({
  onClick,
  className = " mx-1 my-1 ",
  increaseOrderItem,
  decreaseOrderItem,
  themeColor,
  product,
  hasOrderControlPanel,
  isNewProductCard,
  count,
  isEditMode,
}) {
  const {
    title,
    description,
    initial_price: initialPrice,
    discounted_price: discountedPrice,
    main_image_thumbnail_url: mainImageThumbnailUrl,
    available,
  } = product;

  const [isControlMode, toggleControlMode] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const openOrderControlPanel = (e) => {
    e.stopPropagation();
    toggleControlMode(true);
  };
  const initialIncrement = (e) => {
    if (increaseOrderItem) {
      e.stopPropagation();
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 2000);
      toggleControlMode(true);
      increaseOrderItem(product);
    }
  };
  const increment = (e) => {
    if (increaseOrderItem) {
      e.stopPropagation();
      increaseOrderItem(product);
    }
  };
  const decrement = (e) => {
    if (decreaseOrderItem) {
      e.stopPropagation();
      if (count === 1) {
        toggleControlMode(false);
      }
      decreaseOrderItem(product);
    }
  };

  if (isNewProductCard) {
    return <AdminProductCard />;
  }
  return (
    <div
      className={`cursorPointer u-relative c-business-card-custom m-1 ${
        isEditMode ? "u-dashed-border" : ""
      } ${className}`}
      onClick={() => onClick(product)}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      role="button"
      tabIndex="0">
      <div
        className="position-relative align-self-center overflow-hidden u-border-top-left-radius-4 u-border-top-right-radius-4"
        style={{ background: "#c4c4c4" }}>
        <div className="liner-gradiant-card d-flex align-items-center p-1" />
        {hasOrderControlPanel || isEditMode ? (
          <RenderOrderControlPanel
            count={count}
            increment={increment}
            decrement={decrement}
            themeColor={themeColor}
            toggleControlMode={toggleControlMode}
            openOrderControlPanel={openOrderControlPanel}
            initialIncrement={initialIncrement}
            isControlMode={isControlMode}
            isProductAvailable={available}
            isEditMode={isEditMode}
          />
        ) : null}
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
      <div className="px-1">
        <ProductDescription title={title} description={description} />
      </div>
      {isEditMode && (
        <button type="button" className="c-btn c-product-btn-editMode u-addItem z-index-2">
          <img alt="" src={penIcon} />
        </button>
      )}
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
  isNewProductCard: PropTypes.bool,
  count: PropTypes.number,
  isEditMode: PropTypes.bool,
};

export default memo(ProductCard);
