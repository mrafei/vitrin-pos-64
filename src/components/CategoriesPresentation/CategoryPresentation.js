/**
 *
 * CategoryPresentation
 *
 */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import dragIcon from "../../../assets/images/dragg-icon.png";
import moment from "moment-jalaali";
import ProductCard from "../ProductCard";
import CategoryHeader from "./CategoryHeader";
import AddNewProductCard from "../ProductCard/AddNewProductCard";

function CategoryPresentation({
  category: { deals: products, name, id },
  themeColor,
  history,
  orders = [],
  productCardOptions,
  pluginBaseUrl,
  isEditMode,
  onCategoryEditButtonClick,
  onNewProductCardClick = () => {},
  showMoreBtnOnClick,
  isDragging,
  dragHandleProps,
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
  const shadow = isDragging * 15 + 3;
  return (
    <div
      className={`container u-border-radius-8 bg-white px-0 ${!isDragging && 'mt-5'}`}
      style={{
        transition: "all 0.3s ease-in-out",
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.15) 0px ${shadow}px ${shadow}px 0px`,
      }}>
      <div className="p-3 d-flex justify-content-between">
        {isEditMode && dragHandleProps && (
          <span className="dragHandle" {...dragHandleProps}>
            <img src={dragIcon} alt="dragging" style={{ width: 24 }} />
          </span>
        )}
        <div className="w-100">
          <CategoryHeader
            categoryName={name}
            themeColor={themeColor}
            hasShowMoreOption={products.length > 2}
            showMoreBtnOnClick={() => {
              if (showMoreBtnOnClick) showMoreBtnOnClick();
              else history.push(`${pluginBaseUrl}/categories/${id}`);
              window.scrollTo(0, 0);
            }}
            onCategoryEditButtonClick={() => onCategoryEditButtonClick(id)}
            isEditMode={isEditMode}
          />
        </div>
      </div>
      <>
        <MediaQuery maxWidth={768}>
          <div className="d-flex flex-wrap px-3 justify-content-start">
            {isEditMode && (
              <div className="flex-1 justify-content-center d-flex my-1">
                <AddNewProductCard
                  onClick={() => {
                    localStorage.setItem("adminNewProductCategory", JSON.stringify({ name, id }));
                    onNewProductCardClick();
                  }}
                />
              </div>
            )}
            {products.map((product, i) => {
              const {
                extra_data: { only_on_day: onlyOnDay },
              } = product;
              const productAvailableToday =
                onlyOnDay && onlyOnDay.length
                  ? onlyOnDay.find((sc) => sc.id === moment().day())
                  : true;
              if (productAvailableToday || isEditMode) {
                return (
                  <div className="flex-1 justify-content-center d-flex my-1">
                    <ProductCard
                      className="mx-0"
                      key={`c-${id}-p-${product.id}`}
                      themeColor={themeColor}
                      product={product}
                      count={productsCount[i]}
                      {...productCardOptions}
                      isEditMode={isEditMode}
                    />
                  </div>
                );
              }
              return null;
            })}
            {products.length % 2 === 0 && isEditMode ? <div className="flex-1 my-1" /> : null}
            {products.length % 2 === 1 && !isEditMode ? <div className="flex-1 my-1" /> : null}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <div className="d-flex flex-wrap px-3 justify-content-start">
            {isEditMode && (
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
                onlyOnDay && onlyOnDay.length
                  ? onlyOnDay.find((sc) => sc.id === moment().day())
                  : true;
              if (productAvailableToday || isEditMode) {
                return (
                  <ProductCard
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
        </MediaQuery>
      </>
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
