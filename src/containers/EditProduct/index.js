import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import { makeSelectLoading, makeSelectUploadedFiles } from "../App/selectors";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectCategories,
  makeSelectDeal,
} from "../../../stores/business/selector";
import {
  handleKeyDown,
  persianToEnglishNumber,
  useCustomForm,
} from "../../../utils/helper";
import {
  createProduct,
  deleteImageFromProduct,
  deleteProduct,
  getDeal,
  setDeal,
  updateProduct,
} from "../../../stores/business/actions";
import SeoSection from "./SeoSection";
import { clearUploadedFiles, removeFile, uploadFile } from "../App/actions";
import PopularitySection from "./PopularitySection";
import ExtraDescriptionSection from "./ExtraDescriptionSection";
import InfoTable from "./InfoTable";
import AvailabilitySection from "./AvailabilitySection";
import ExtraItems from "./ExtraItems";
import PriceSection from "./PriceSection";
import GeneralInfo from "./GeneralInfo";

export function EditProduct({
  match,
  history,
  deal: product,
  categories,
  isLoading,
  _updateProduct,
  _removeFile,
  uploadedFiles,
  _uploadFile,
  _deleteProductImage,
  cleanUploads,
  _createProduct,
  _deleteProduct,
  _getDeal,
  business,
  _setDeal,
}) {
  useEffect(() => {
    if (match.params.id) {
      _getDeal(match.params.id);
    }
    return () => {
      cleanUploads();
      _setDeal({
        description: "",
        title: "",
        discounted_price: 0,
        initial_price: 0,
        images: [],
        categories: [],
        available: true,
        extra_data: {
          inventory_count: null,
          only_on_day: [],
          packaging_price: 0,
          info_table: [],
          complementary: "",
        },
      });
    };
  }, [match.params.id]);
  const [form, setForm] = useCustomForm({
    title: "",
    description: "",
    complementary: "",
    price: "",
    discountAmount: "",
    discountPercent: "",
    finalPrice: "",
    priority: 100,
  });

  const [error, setError] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [isPercent, setIsPercent] = useState(true);
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [isProductAvailable, toggleProductAvailability] = useState(false);
  const [productInfoTable, setProductInfoTable] = useState([
    { key: "", value: "" },
  ]);
  const [productExtraItems, setProductExtraItems] = useState([]);
  const [productAmount, setProductAmount] = useState("");
  const [productPackagingPrice, setProductPackagingPrice] = useState(0);
  const [productImages, setImages] = useState([]);
  const [selectedCategories, setCategories] = useState([]);
  const [selectedDays, setDays] = useState([]);

  useEffect(() => {
    const {
      description,
      title,
      discounted_price: discountedPrice,
      initial_price: initialPrice,
      images,
      categories: _categories,
      extra_items: extraItems,
      available,
      extra_data: {
        inventory_count: inventoryCount,
        only_on_day: onlyOnDay,
        packaging_price: packagingPrice,
        info_table,
        complementary,
      },
      priority,
    } = product;
    toggleProductAvailability(available);
    setProductAmount(inventoryCount);
    setHasDiscount(initialPrice > discountedPrice);
    setDays(onlyOnDay || []);
    setProductPackagingPrice(packagingPrice);
    setImages(images);
    setCategories(
      _categories.map(
        (_c) => categories && categories.find((__c) => __c.id === _c)
      )
    );
    setProductInfoTable(
      info_table && info_table.length ? info_table : [{ key: "", value: "" }]
    );
    setProductExtraItems(extraItems || []);
    setForm({
      title: title || "",
      description: description || "",
      complementary: complementary || "",
      price: initialPrice,
      finalPrice: discountedPrice,
      priority: priority || priority === 0 ? priority : 100,
      discountAmount: initialPrice ? initialPrice - discountedPrice : 0,
      discountPercent:
        initialPrice && discountedPrice
          ? Math.floor(((initialPrice - discountedPrice) / initialPrice) * 100)
          : 0,
    });

    if (match.params.category)
      setCategories([
        categories &&
          categories.find((__c) => __c.id === +match.params.category),
      ]);
  }, [match.params.id, product]);

  const addCategory = (_category) => {
    if (selectedCategories.findIndex((sc) => sc.id === _category.id) === -1) {
      setCategories([...selectedCategories, _category]);
    }
  };
  const removeCategory = (_category) => {
    const selectedCategoryIndex = selectedCategories.findIndex(
      (sc) => sc.id === _category.id
    );
    const _selectedCategories = [...selectedCategories];
    _selectedCategories.splice(selectedCategoryIndex, 1);
    if (selectedCategoryIndex > -1) {
      setCategories(_selectedCategories);
    }
  };
  const addDay = (day) => {
    if (!selectedDays.find((sc) => sc.id === day.id)) {
      setDays([...selectedDays, day]);
    }
  };
  const removeDay = (day) => {
    const selectedDayIndex = selectedDays.findIndex((sc) => sc.id === day.id);
    const _selectedDays = [...selectedDays];
    _selectedDays.splice(selectedDayIndex, 1);
    if (selectedDayIndex > -1) {
      setDays(_selectedDays);
    }
  };
  const submit = () => {
    if (selectedCategories.length === 0) {
      setError("لطفا دسته‌بندی انتخاب کنید.");
    } else {
      setError("");
      const extraData = {};
      extraData.info_table = productInfoTable.filter(
        (r) => r.value !== "" || r.key !== ""
      );
      extraData.complementary = form.complementary;
      extraData.only_on_day = selectedDays;
      extraData.packaging_price = productPackagingPrice
        ? parseInt(productPackagingPrice, 10)
        : 0;
      if (productAmount > 0)
        extraData.inventory_count = parseInt(productAmount, 10);
      let discountedPrice = form.price;
      if (hasDiscount) {
        if (isPercent)
          discountedPrice = Math.round(
            (form.finalPrice / form.price) * persianToEnglishNumber(form.price)
          );
        else discountedPrice = persianToEnglishNumber(form.price) - discount;
      }
      const _product = {
        business: business.id,
        title: form.title,
        discounted_price: +discountedPrice,
        initial_price: +form.price,
        description: form.description,
        categories: selectedCategories.map((sc) => sc.id),
        available: isProductAvailable,
        extra_data: extraData,
        extra_items: product.extra_items || [],
        priority: +form.priority,
      };
      if (product.id) {
        _updateProduct(
          product.id,
          _product,
          uploadedFiles,
          productExtraItems,
          history.goBack
        );
      } else {
        _createProduct(_product, uploadedFiles, productExtraItems, history);
      }
      setCategories([]);
      setDays([]);
      cleanUploads();
    }
  };
  const discount = isPercent
    ? Math.round(((form.price - form.finalPrice) / form.price) * 100)
    : Math.round(form.price - form.finalPrice);
  return (
    <>
      <div className="px-3 u-background-white justify-content-between align-items-center container u-height-44 d-flex u-border-radius-8 box-shadow py-3 u-fontWeightBold">
        <Icon
          className="c-modal-header-close float-right"
          icon={ICONS.CLOSE}
          size={25}
          onClick={history.goBack}
          color="#667e8a"
        />
        <span>ویرایش محصول</span>
        <div style={{ height: 25, width: 25 }} />
      </div>
      <div
        className="d-flex flex-1 container px-0"
        style={{ height: "calc(100% - 110px)" }}
      >
        <div className="overflow-hidden d-flex mt-4 flex-1">
          <div className="overflow-auto pb-2 w-100">
            <GeneralInfo
              _deleteProductImage={_deleteProductImage}
              productImages={productImages}
              setImages={setImages}
              isLoading={isLoading}
              uploadedFiles={uploadedFiles}
              _removeFile={_removeFile}
              error={error}
              description={form.description}
              setDescription={(value) => setForm("description", value)}
              removeCategory={removeCategory}
              addCategory={addCategory}
              categories={categories}
              selectedCategories={selectedCategories}
              title={form.title}
              setTitle={(value) => setForm("title", value)}
              _uploadFile={_uploadFile}
            />
            <InfoTable
              productInfoTable={productInfoTable}
              setProductInfoTable={setProductInfoTable}
            />
            <ExtraDescriptionSection
              complementary={form.complementary}
              setComplementary={(value) => setForm("complementary", value)}
            />
          </div>
        </div>
        <div className="overflow-hidden d-flex mt-4 flex-1">
          <div className="overflow-auto pb-2 w-100">
            <PriceSection
              price={+form.price}
              setPrice={(value) => setForm("price", value)}
              finalPrice={+form.finalPrice}
              setFinalPrice={(value) => setForm("finalPrice", value)}
              productPackagingPrice={productPackagingPrice}
              setProductPackagingPrice={setProductPackagingPrice}
              discount={discount}
              isPercent={isPercent}
              hasDiscount={hasDiscount}
              setHasDiscount={setHasDiscount}
              setIsPercent={setIsPercent}
            />
            <ExtraItems
              productExtraItems={productExtraItems}
              setProductExtraItems={setProductExtraItems}
            />
            <AvailabilitySection
              isProductAvailable={isProductAvailable}
              toggleProductAvailability={toggleProductAvailability}
              productAmount={+productAmount}
              setProductAmount={(value) => {
                if (value === 0) toggleProductAvailability(false);
                setProductAmount(value);
              }}
              removeDay={removeDay}
              addDay={addDay}
              selectedDays={selectedDays}
            />

            <PopularitySection
              priority={form.priority}
              setPriority={(value) => setForm("priority", value)}
            />
            <SeoSection title={form.title} description={form.description} />
          </div>
        </div>
      </div>
      <div className="d-flex container mt-3 px-0">
        <button
          className="d-flex container-shadow fit-content px-4 py-2 justify-content-center u-border-radius-8 align-items-center c-btn-primary u-fontSemiSmall u-text-white u-background-primary-blue"
          disabled={isLoading}
          type="button"
          tabIndex="0"
          onClick={submit}
        >
          <Icon
            icon={ICONS.SAVE}
            size={24}
            width={20}
            height={20}
            color="white"
            className="ml-1"
          />
          تایید و ذخیره
        </button>
        {product.id && (
          <button
            className="d-flex container-shadow fit-content px-4 py-2 justify-content-center u-border-radius-8 align-items-center c-btn-primary u-fontSemiSmall mr-2 u-text-primary-blue u-background-white"
            disabled={isLoading}
            type="button"
            tabIndex="0"
            onClick={() => {
              setDialogBox(true);
            }}
          >
            <Icon
              icon={ICONS.TRASH}
              size={19}
              color="#0050FF"
              className="ml-1"
            />
            حذف محصول
          </button>
        )}
      </div>
      {isDialogBoxOpen && (
        <div className="c-modal" id="c-modal-name">
          <div className="d-flex flex-column c-dialogBox px-3">
            <div className="u-text-darkest-grey u-fontMedium">
              اطمینان دارید که می‌خواهید این محصول را حذف کنید؟
            </div>
            <div className="d-flex flex-row justify-content-around mr-auto u-fontWeightBold">
              <span
                className="u-text-primary-blue cursorPointer u-fontMedium"
                onClick={() => {
                  _deleteProduct(product.id, history);
                  setDialogBox(false);
                }}
              >
                حذف
              </span>
              <span
                className="u-text-primary-blue cursorPointer mr-4 u-fontMedium"
                onClick={() => setDialogBox(false)}
                onKeyDown={(e) => handleKeyDown(e, () => setDialogBox(false))}
                role="button"
                tabIndex="0"
              >
                بستن
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  categories: makeSelectCategories(),
  business: makeSelectBusiness(),
  uploadedFiles: makeSelectUploadedFiles(),
  themeColor: makeSelectBusinessThemeColor(),
  deal: makeSelectDeal(),
});

function mapDispatchToProps(dispatch) {
  return {
    _createProduct: (product, images, extraItems, history) =>
      dispatch(createProduct(product, images, extraItems, history)),
    _deleteProduct: (productId, history) =>
      dispatch(deleteProduct(productId, history)),
    _updateProduct: (productId, product, images, extraItems, callback) =>
      dispatch(updateProduct(productId, product, images, extraItems, callback)),
    cleanUploads: () => dispatch(clearUploadedFiles()),
    _uploadFile: (files, folderName) =>
      dispatch(uploadFile({ files, folderName })),
    _removeFile: (index) => dispatch(removeFile(index)),
    _deleteProductImage: (imageId) => dispatch(deleteImageFromProduct(imageId)),
    _getDeal: (id) => dispatch(getDeal(id)),
    _setDeal: (deal) => dispatch(setDeal(deal)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withRouter, withConnect)(EditProduct);
