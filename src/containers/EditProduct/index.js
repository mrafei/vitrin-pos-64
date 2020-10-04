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
import ProductPriceSection from "./ProductPriceSection";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { getWeekDay, getWeekDays, handleKeyDown } from "../../../utils/helper";
import RichText from "../../components/RichText";
import {
  createProduct,
  deleteImageFromProduct,
  deleteProduct,
  getDeal,
  updateProduct,
} from "../../../stores/business/actions";
import SeoSection from "./SeoSection";
import { clearUploadedFiles, removeFile, uploadFile } from "../App/actions";
import ProductImagesSection from "./ProductImagesSection";

export function EditProduct({
  match,
  history,
  deal,
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
}) {
  useEffect(() => {
    if (match.params.id && deal.id) setProduct({ ...product, ...deal });
    if (match.params.category)
      setProduct({ ...product, ...deal, categories: [+match.params.category] });
  }, [match.params.id, deal.id]);
  useEffect(() => {
    if (match.params.id) {
      _getDeal(match.params.id);
    }
    return cleanUploads;
  }, []);
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    initial_price: 0,
    discounted_price: 0,
    available: true,
    categories: [],
    extra_data: {
      only_on_day: [],
      packaging_price: 0,
    },
  });
  const [productImages, setImages] = useState([]);
  const [categoryError, setCategoryError] = useState("");
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
        <div className="u-background-white mt-4 u-border-radius-8 overflow-hidden flex-1 box-shadow d-flex flex-column">
          <div className="d-flex px-4 py-5 flex-1 flex-column align-items-center overflow-auto">
            <ProductImagesSection
              _removeFile={_removeFile}
              uploadedFiles={uploadedFiles}
              productImages={productImages}
              _uploadFile={_uploadFile}
              _deleteProductImage={_deleteProductImage}
              setImages={setImages}
            />
            <Input
              className="mt-4"
              label="عنوان محصول"
              value={product.title}
              onChange={(title) => setProduct({ ...product, title })}
            />
            <div className="mt-5 w-100">
              <RichText
                placeholder="توضیحات محصول (اختیاری)"
                value={product.description}
                onChange={(description) =>
                  setProduct({ ...product, description })
                }
              />
            </div>

            <div className="w-100">
              <Select
                inputData={{ defaultValue: "افزودن دسته‌بندی" }}
                selectOption={(categoryName) => {
                  setCategoryError("");
                  const id = categories.find((c) => c.name === categoryName).id;
                  setProduct({
                    ...product,
                    categories: [...product.categories, id],
                  });
                }}
                options={categories
                  .filter(
                    (c) => !product.categories.find((cat) => cat === c.id)
                  )
                  .map((c) => ({ ...c, text: c.name }))}
              />
              <div className="d-flex mt-2">
                {categories.length
                  ? product.categories.map((c) => (
                      <div
                        key={`category-${c}`}
                        className="d-flex justify-content-center align-items-center u-background-light-grey u-text-primary-blue category-item pl-2 pr-1 m-1"
                      >
                        <div
                          onClick={() => {
                            const index = product.categories.indexOf(c);
                            const newCategories = [...product.categories];
                            newCategories.splice(index, 1);
                            setProduct({
                              ...product,
                              categories: newCategories,
                            });
                          }}
                          className="u-border-radius-50-percent u-background-primary-blue ml-1 d-flex"
                          style={{ height: 15, width: 15 }}
                        >
                          <Icon
                            className="u-cursor-pointer"
                            icon={ICONS.CLOSE}
                            height={15}
                            width={15}
                            size={25}
                            color="white"
                          />
                        </div>
                        {categories.find((cat) => cat.id === c).name}
                      </div>
                    ))
                  : null}
              </div>
              <div className="u-text-red">{categoryError}</div>
              <Select
                inputData={{
                  defaultValue: "فقط موجود در روزهای خاص (غذای روز)",
                }}
                selectOption={(day) => {
                  const id = getWeekDays.find((c) => getWeekDay(c) === day);
                  setProduct({
                    ...product,
                    extra_data: {
                      ...product.extra_data,
                      only_on_day: [...product.extra_data.only_on_day, id],
                    },
                  });
                }}
                options={getWeekDays
                  .filter(
                    (d) =>
                      !product.extra_data.only_on_day.find((day) => day === d)
                  )
                  .map((d) => ({ id: d, text: getWeekDay(d) }))}
              />
              <div className="d-flex mt-2">
                {product.extra_data.only_on_day.map((d) => (
                  <div
                    key={`day-${d}`}
                    className="d-flex justify-content-center align-items-center u-background-light-grey u-text-primary-blue category-item pl-2 pr-1 m-1"
                  >
                    <div
                      onClick={() => {
                        const index = product.extra_data.only_on_day.indexOf(d);
                        const newDays = [...product.extra_data.only_on_day];
                        newDays.splice(index, 1);
                        setProduct({
                          ...product,
                          extra_data: {
                            ...product.extra_data,
                            only_on_day: newDays,
                          },
                        });
                      }}
                      className="u-border-radius-50-percent u-background-primary-blue ml-1 d-flex"
                      style={{ height: 15, width: 15 }}
                    >
                      <Icon
                        className="u-cursor-pointer"
                        icon={ICONS.CLOSE}
                        height={15}
                        width={15}
                        size={25}
                        color="white"
                      />
                    </div>
                    {getWeekDay(d)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden d-flex mt-4 flex-1">
          <div className="overflow-auto pb-2 w-100">
            <ProductPriceSection product={product} setProduct={setProduct} />
            <SeoSection product={product} setProduct={setProduct} />
          </div>
        </div>
      </div>
      <div className="d-flex container mt-3 px-0">
        <button
          className="d-flex container-shadow fit-content px-4 py-2 justify-content-center u-border-radius-8 align-items-center c-btn-primary u-fontSemiSmall u-text-white u-background-primary-blue"
          disabled={isLoading}
          type="button"
          tabIndex="0"
          onClick={() => {
            if (!product.categories.length) {
              setCategoryError("لطفا دسته‌بندی انتخاب کنید.");
              return;
            }
            if (product.id)
              _updateProduct(
                product.id,
                product,
                uploadedFiles,
                history.goBack
              );
            else _createProduct(product, uploadedFiles, history);
          }}
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
    _createProduct: (product, images, history) =>
      dispatch(createProduct(product, images, history)),
    _deleteProduct: (productId, history) =>
      dispatch(deleteProduct(productId, history)),
    _updateProduct: (productId, product, images, callback) =>
      dispatch(updateProduct(productId, product, images, callback)),
    cleanUploads: () => dispatch(clearUploadedFiles()),
    _uploadFile: (files, folderName) =>
      dispatch(uploadFile({ files, folderName })),
    _removeFile: (index) => dispatch(removeFile(index)),
    _deleteProductImage: (imageId) => dispatch(deleteImageFromProduct(imageId)),
    _getDeal: (id) => dispatch(getDeal(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withRouter, withConnect)(EditProduct);
