import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Modal from "../../components/Modal";
import {
  handleKeyDown,
  englishNumberToPersianNumber,
  persianToEnglishNumber,
} from "../../../utils/helper";
import Input from "../../components/Input";
import { makeSelectBusinessId, makeSelectCategories } from "../../../stores/business/selector";
import { makeSelectLoading } from "../App/selectors";
import { createCategory, deleteCategory, updateCategory } from "../../../stores/business/actions";
import { setGroupDiscount } from "./actions";
import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import { PrimaryButton } from "../../components/Button";

function CategoryModal({
  isOpen,
  isLoading,
  _updateCategory,
  onClose,
  history,
  categories,
  _deleteCategory,
  _setGroupDiscount,
  categoryId,
  _createCategory,
  businessId,
}) {
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [percent, setPercent] = useState(0);

  const [category, setCategory] = useState(null);
  useEffect(() => {
    const category = categories && categories.find((_c) => _c.id === +categoryId);
    if (category) {
      setCategory(category);
      setCategoryName(category.name);
    }
  }, [history.location.search]);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="c-modal-box overflow-hidden">
        <div className="d-flex c-modal-header bg-white text-center u-borderBottom">
          <div className="u-relative">
            <Icon
              size={25}
              color={"#C8CBD0"}
              icon={ICONS.CLOSE}
              onClick={onClose}
              className="u-cursor-pointer u-absolute right-0"
            />
          </div>
          <div className="m-auto u-fontMedium u-text-dark-grey">دسته‌بندی</div>
        </div>

        {isDialogBoxOpen && (
          <div className="c-modal" id="c-modal-name">
            <div className="d-flex flex-column c-dialogBox px-3">
              <div className="u-text-darkest-grey u-fontMedium">
                اطمینان دارید که می‌خواهید این دسته‌بندی را حذف کنید؟
              </div>
              <div className="d-flex flex-row justify-content-around mr-auto u-fontWeightBold">
                <span
                  className="u-text-primary-blue cursorPointer u-fontMedium"
                  onClick={() => {
                    setDialogBox(false);
                    _deleteCategory(category, { goBack: onClose });
                  }}>
                  حذف
                </span>
                <span
                  className="u-text-primary-blue cursorPointer mr-4 u-fontMedium"
                  onClick={() => setDialogBox(false)}
                  onKeyDown={(e) => handleKeyDown(e, () => setDialogBox(false))}
                  role="button"
                  tabIndex="0">
                  بستن
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="c-modal-body mt-1" style={{ minHeight: 340 }}>
          <div className="px-3 mt-1">
            <div className="mt-1">
              <Input
                label="عنوان دسته‌بندی"
                value={categoryName}
                onChange={(value) => setCategoryName(value)}
                placeholder=""
              />
            </div>
          </div>
          {categoryId && (
            <div className="px-3 mt-3">
              <div className="mt-1 d-flex justify-content-between align-items-center">
                <Input
                  numberOnly
                  value={percent ? englishNumberToPersianNumber(percent) : ""}
                  onChange={(value) => {
                    if (persianToEnglishNumber(value) <= 100)
                      setPercent(persianToEnglishNumber(value));
                  }}
                  label="تخفیف به درصد"
                />
                <PrimaryButton
                  style={{ width: 100, marginRight: 10 }}
                  text="اعمال"
                  disabled={isLoading}
                  isLoading={isLoading}
                  onClick={() => {
                    _setGroupDiscount(percent, category.id);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex container px-0 mr-5 mb-4">
          <button
            className="d-flex container-shadow fit-content px-4 py-2 justify-content-center u-border-radius-8 align-items-center c-btn-primary u-fontSemiSmall u-text-white u-background-primary-blue"
            disabled={isLoading}
            onClick={() => {
              if (categoryId) _updateCategory(category, categoryName, { goBack: onClose });
              else _createCategory(categoryName, businessId, { goBack: onClose });
            }}>
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
          {categoryId && (
            <button
              className="d-flex container-shadow fit-content px-4 py-2 justify-content-center u-border-radius-8 align-items-center c-btn-primary u-fontSemiSmall mr-2 u-text-primary-blue u-background-white"
              disabled={isLoading}
              type="button"
              tabIndex="0"
              onClick={() => {
                setDialogBox(true);
              }}>
              <Icon icon={ICONS.TRASH} size={19} color="#168fd5" className="ml-1" />
              حذف دسته‌بندی
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

CategoryModal.propTypes = {
  _updateCategory: PropTypes.func,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  history: PropTypes.object,
  categories: PropTypes.array,
  _deleteCategory: PropTypes.func,
  _setGroupDiscount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  isLoading: makeSelectLoading(),
  businessId: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateCategory: (category, name, history) =>
      dispatch(updateCategory(category.id, name, history)),
    _deleteCategory: (category, history) => dispatch(deleteCategory(category, history)),
    _setGroupDiscount: (percent, id) => dispatch(setGroupDiscount(percent, id)),
    _createCategory: (category, businessId, history) =>
      dispatch(createCategory(category, businessId, history)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter, memo)(CategoryModal);
