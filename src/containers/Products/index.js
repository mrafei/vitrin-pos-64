/* eslint-disable react/no-danger */
/**
 *
 * AdminOrder
 *
 */

import React, { memo, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
const { shell } = require("electron");

import {
  makeSelectBusinessAddress,
  makeSelectCategories,
  makeSelectDeliverers,
  makeSelectDeliveries,
  makeSelectDeliveriesPagination,
} from "../../../stores/business/selector";
import { getDeliveries, updateProduct } from "../../../stores/business/actions";
import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import CategoriesPresentation from "../../components/CategoriesPresentation";
import { useInjectReducer } from "../../../utils/injectReducer";
import reducer from "./reducer";
import { useInjectSaga } from "../../../utils/injectSaga";
import saga from "./saga";
import { changeCategoryOrder } from "./actions";

export function Products({
  _getDeliveries,
  address,
  categories,
  _changeCategoryOrder,
  _updateProduct,
}) {
  useInjectReducer({ key: "products", reducer });
  useInjectSaga({ key: "products", saga });
  const [listView, setListView] = useState(true);
  return (
    <div className="pb-5 overflow-auto" style={{ height: "calc(100% - 115px)" }}>
      <div className="u-border-radius-8 d-flex justify-content-between u-background-white container px-0 container-shadow overflow-hidden u-mt-50 p-3">
        <div className="d-flex align-items-center">
          <div className="d-flex u-cursor-pointer" onClick={() => setListView(true)}>
            <Icon
              icon={ICONS.LIST_VIEW}
              className="ml-1"
              size={24}
              color={listView ? "#168fd5" : "#4F595B"}
            />
            <span
              className={`${
                listView ? "u-fontWeightBold u-text-primary-blue" : "u-text-darkest-grey"
              }`}>
              لیست
            </span>
          </div>
          <div className="mr-3 d-flex u-cursor-pointer" onClick={() => setListView(false)}>
            <Icon
              icon={ICONS.CARD_VIEW}
              className="ml-1"
              size={24}
              color={!listView ? "#168fd5" : "#4F595B"}
            />
            <span
              className={`${
                !listView ? "u-fontWeightBold u-text-primary-blue" : "u-text-darkest-grey"
              }`}>
              کارت
            </span>
          </div>
        </div>
        <div className="d-flex">
          <div
            onClick={() => shell.openExternal(address)}
            className="ml-2 u-cursor-pointer u-background-dark-red u-border-radius-4 d-inline-flex justify-content-center align-items-center pr-2 py-2 pl-3">
            <Icon icon={ICONS.WEBSITE} color="white" className="ml-2" size={18} />
            <span className="u-fontWeightBold u-fontMedium u-text-white">دیدن سایت</span>
          </div>

          <div className="u-cursor-pointer u-background-primary-blue u-border-radius-4 d-inline-flex justify-content-center align-items-center pr-2 py-2 pl-3">
            <Icon icon={ICONS.PLUS} color="white" className="ml-2" size={12} />
            <span className="u-fontWeightBold u-fontMedium u-text-white">
              افزودن دسته‌بندی جدید
            </span>
          </div>
        </div>
      </div>
      <CategoriesPresentation
        history={history}
        categories={categories}
        pluginBaseUrl="/admin"
        isEditMode
        abstract
        isList={listView}
        changeDealCategoryOrder={(item, newIndex) => _changeCategoryOrder(item, newIndex)}
        onNewProductCardClick={
          () => {}
          // _toggleModal(ADMIN_ADD_NEW_PRODUCT_MODAL, true)
        }
        onCategoryEditButtonClick={(_category) => {
          // _toggleModal(ADMIN_EDIT_CATEGORY_ITEM_MODAL, true);
          // _setCategory(_category);
        }}
        productCardOptions={{
          onClick: (product) => {
            // _toggleModal(ADMIN_EDIT_PRODUCT_MODAL, true);
            // _setProduct(product);
          },
          _updateProduct,
        }}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  address: makeSelectBusinessAddress(),
  deliverers: makeSelectDeliverers(),
  deliveries: makeSelectDeliveries(),
  pagination: makeSelectDeliveriesPagination(),
  categories: makeSelectCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getDeliveries: (name, page) => dispatch(getDeliveries(name, page)),
    _changeCategoryOrder: (id, newIndex) => dispatch(changeCategoryOrder(id, newIndex)),
    _updateProduct: (productId, product, uploadedFiles) =>
      dispatch(updateProduct(productId, product, uploadedFiles)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withRouter, withConnect)(Products);
