/**
 *
 * CategoryPresentation
 *
 */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dragIcon from "../../../assets/images/dragg-icon.png";
import moment from "moment-jalaali";
import ProductCard from "../ProductCard";
import CategoryHeader from "./CategoryHeader";
import AddNewProductCard from "../ProductCard/AddNewProductCard";

function CategoryPresentation({
  category: { deals: products, name, id },
  themeColor,
  orders = [],
  productCardOptions,
  isEditMode,
  onCategoryEditButtonClick,
  onNewProductCardClick = () => {},
  isDragging,
  dragHandleProps,
  isList,
}) {
  const [productsCount, setProductsCount] = useState(
    products.map((_product) =>
      orders.find((item) => item.id === _product.id)
        ? orders.find((item) => item.id === _product.id).count
        : 0
    )
  );
  useEffect(() => {
    setProductsCount(
      products.map((_product) =>
        orders.find((item) => item.id === _product.id)
          ? orders.find((item) => item.id === _product.id).count
          : 0
      )
    );
  }, [orders]);
  const scale = isDragging * -0.05 + 1;
  const shadow = isDragging * 15 + 20;
  return (
    <div
      className={`container u-border-radius-8 bg-white px-0 ${!isDragging && "mt-5"}`}
      style={{
        transition: "all 0.3s ease-in-out",
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.15) 0px  0px ${shadow}px`,
      }}>
      <div className="p-3 d-flex justify-content-between u-background-melo-grey">
        {isEditMode && dragHandleProps && (
          <span className={`dragHandle ${isList && "pt-2"}`} {...dragHandleProps}>
            <img src={dragIcon} alt="dragging" style={{ width: 24 }} />
          </span>
        )}
        <div className="w-100">
          <CategoryHeader
            categoryName={name}
            themeColor={themeColor}
            onCategoryEditButtonClick={() => onCategoryEditButtonClick(id)}
            isEditMode={isEditMode}
            isList={isList}
          />
        </div>
      </div>
      <div
        className={`justify-content-start ${!isList ? "d-flex flex-wrap py-2 px-3" : "py-1 pl-3"}`}
        style={{ paddingRight: !isList ? 0 : 39 }}>
        {isEditMode && !isList && (
          <AddNewProductCard
            onClick={() => {
              localStorage.setItem("adminNewProductCategory", JSON.stringify({ name, id }));
              onNewProductCardClick();
            }}
          />
        )}
        {products.map((product, i) => {
          const {
            extra_data: { only_on_day: onlyOnDay },
          } = product;
          const productAvailableToday =
            onlyOnDay && onlyOnDay.length ? onlyOnDay.find((sc) => sc.id === moment().day()) : true;
          if (productAvailableToday || isEditMode) {
            return (
              <ProductCard
                isList={isList}
                key={`c-${id}-p-${product.id}`}
                themeColor={themeColor}
                product={product}
                count={productsCount[i]}
                {...productCardOptions}
                isEditMode={isEditMode}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

CategoryPresentation.propTypes = {
  category: PropTypes.object,
  history: PropTypes.object,
  themeColor: PropTypes.string,
  productCardOptions: PropTypes.object,
  orders: PropTypes.array,
  pluginBaseUrl: PropTypes.string,
  isEditMode: PropTypes.bool,
  onNewProductCardClick: PropTypes.func,
  onCategoryEditButtonClick: PropTypes.func,
  showMoreBtnOnClick: PropTypes.func,
  isDragging: PropTypes.bool,
  dragHandleProps: PropTypes.object,
};

export default memo(CategoryPresentation);
