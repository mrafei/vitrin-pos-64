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
// import styled from 'styled-components';
function CategoriesPresentation({
  categories,
  themeColor = "#168fd5",
  history,
  abstract,
  orders = [],
  productCardOptions = {},
  isEditMode,
  onNewProductCardClick,
  pluginBaseUrl,
  reloadOnUpdate,
  onCategoryEditButtonClick,
  changeDealCategoryOrder,
}) {
  const [list, setList] = useState([...categories]);
  const onDragEnd = (e) => {
    console.log("******");
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
  return (
    <>
      <main ref={container}>
        {!isEditMode ? (
          list.map((category) =>
            category.deals.length ? (
              <CategoryPresentation
                onCategoryEditButtonClick={onCategoryEditButtonClick}
                pluginBaseUrl={pluginBaseUrl}
                reloadOnUpdate={reloadOnUpdate}
                key={`c-${category.id}`}
                category={category}
                themeColor={themeColor}
                history={history}
                productCardOptions={productCardOptions}
                orders={orders}
                isEditMode={isEditMode}
                onNewProductCardClick={onNewProductCardClick}
              />
            ) : null
          )
        ) : (
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
                              isEditMode={isEditMode}
                              onNewProductCardClick={onNewProductCardClick}
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
        )}
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
  isEditMode: PropTypes.bool,
  onNewProductCardClick: PropTypes.func,
  pluginBaseUrl: PropTypes.string,
  reloadOnUpdate: PropTypes.bool,
  onCategoryEditButtonClick: PropTypes.func,
  changeDealCategoryOrder: PropTypes.func,
};

export default memo(CategoriesPresentation);
