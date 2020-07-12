/* eslint-disable react/no-danger */
/**
 *
 * CategoriesPresentation
 *
 */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import CategoryPresentation from "./CategoryPresentation";
import CategoryHeader from "./CategoryHeader";
import ProductCard from "../ProductCard";

function CategoriesPresentation({
  categories,
  themeColor = "#168fd5",
  history,
  abstract,
  orders = [],
  productCardOptions = {},
  onNewProductCardClick,
  pluginBaseUrl,
  reloadOnUpdate,
  onCategoryEditButtonClick,
  changeDealCategoryOrder,
  isList,
}) {
  const [list, setList] = useState([...categories]);
  const onDragEnd = (e) => {
    const newList = [...list];
    const draggbleItem = newList[e.source.index];
    newList.splice(e.source.index, 1);
    newList.splice(e.destination.index, 0, draggbleItem);
    setList(newList);
    changeDealCategoryOrder(draggbleItem.id, e.destination.index);
    // the only one that is required
  };
  useEffect(() => {
    setList([...categories]);
  }, [categories]);
  const container = React.createRef();
  const unavailableProducts = [];
  list.map((c) => {
    c &&
      c.deals &&
      c.deals.map((d) => {
        if (!d.available && !unavailableProducts.some((up) => up.id === d.id))
          unavailableProducts.push(d);
      });
  });
  return (
    <>
      <main ref={container}>
        <div className="container u-border-radius-8 bg-white px-0 container-shadow mt-5">
          <div className="p-3 d-flex justify-content-between u-background-melo-grey">
            <div style={{ width: 24 }} />
            <div className="w-100">
              <CategoryHeader
                categoryName="محصول‌های ناموجود"
                themeColor={themeColor}
                isList={isList}
              />
            </div>
          </div>
          <div
            style={{ paddingRight: !isList ? 0 : 39 }}
            className={`justify-content-start u-background-light-grey ${
              !isList ? "d-flex flex-wrap py-2 px-3" : "py-1 pl-3"
            }`}>
            {unavailableProducts.map((product, i) => (
              <ProductCard
                key={`c-unavailable-p-${product.id}`}
                themeColor={themeColor}
                product={product}
                {...productCardOptions}
                isList={isList}
                isEditMode
              />
            ))}
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="deal_categories">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((category, index) =>
                  category.deals.length ? (
                    <Draggable draggableId={`${category.id}`} index={index} key={category.id}>
                      {(_provided, _snapshot) => (
                        <div ref={_provided.innerRef} {..._provided.draggableProps}>
                          <CategoryPresentation
                            onCategoryEditButtonClick={onCategoryEditButtonClick}
                            pluginBaseUrl={pluginBaseUrl}
                            reloadOnUpdate={reloadOnUpdate}
                            key={`c-${category.id}`}
                            category={category}
                            dragHandleProps={_provided.dragHandleProps}
                            isDragging={_snapshot.isDragging}
                            themeColor={themeColor}
                            history={history}
                            abstract={abstract}
                            productCardOptions={productCardOptions}
                            orders={orders}
                            isEditMode
                            onNewProductCardClick={onNewProductCardClick}
                            isList={isList}
                          />
                        </div>
                      )}
                    </Draggable>
                  ) : null
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </>
  );
}

CategoriesPresentation.propTypes = {
  categories: PropTypes.array,
  themeColor: PropTypes.string,
  history: PropTypes.object,
  abstract: PropTypes.bool,
  productCardOptions: PropTypes.object,
  orders: PropTypes.array,
  onNewProductCardClick: PropTypes.func,
  pluginBaseUrl: PropTypes.string,
  reloadOnUpdate: PropTypes.bool,
  onCategoryEditButtonClick: PropTypes.func,
  changeDealCategoryOrder: PropTypes.func,
};

export default memo(CategoriesPresentation);
