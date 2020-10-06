import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import Chip from "@material-ui/core/esm/Chip";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import IconButton from "@material-ui/core/esm/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { handleKeyDown } from "../../../utils/helper";
import LoadingIndicator from "../../components/LoadingIndicator";
import AddNewItemSection from "../../components/AddNewItemSection";
import Input from "../../components/Input";
import MaterialSelect from "../../components/Select";
import RichText from "../../components/RichText";

export default function GeneralInfo({
  _deleteProductImage,
  productImages,
  setImages,
  isLoading,
  uploadedFiles,
  _removeFile,
  error,
  description,
  setDescription,
  removeCategory,
  addCategory,
  categories,
  selectedCategories,
  title,
  setTitle,
  _uploadFile,
}) {
  const myFiles = useRef(null);
  const theme = useTheme();
  const deleteProductImage = (_image) => {
    _deleteProductImage(_image.id);
    const selectedImage = productImages.findIndex((pi) => pi.id === _image.id);
    const newProductImages = [...productImages];
    newProductImages.splice(selectedImage, 1);
    if (selectedImage > -1) {
      setImages(newProductImages);
    }
  };
  const [isCollapseOpen, openCollapse] = useState(true);
  return (
    <div className="my-3 px-3">
      <Paper
        elevation={2}
        className="d-flex flex-column align-items-center u-cursor-pointer"
      >
        <div
          onClick={() => openCollapse(!isCollapseOpen)}
          className="d-flex justify-content-between collapse-header u-font-semi-small-r w-100"
          onKeyDown={(e) =>
            handleKeyDown(e, () => openCollapse(!isCollapseOpen))
          }
          role="button"
          tabIndex="0"
        >
          <div className="flex-1 u-text-black u-fontWeightBold">
            اطلاعات اصلی محصول
          </div>

          <KeyboardArrowDownRoundedIcon
            style={{
              color: theme.palette.text.primary,
              transform: `rotate(${isCollapseOpen ? 180 : 0}deg)`,
              transition: "all 0.3s ease-in-out",
            }}
          />
        </div>
        <Collapse
          isOpened={isCollapseOpen}
          theme={{
            collapse: "w-100 ReactCollapse--collapse",
            content: "ReactCollapse--content p-3",
          }}
        >
          <div className="p-2 d-flex flex-wrap w-100">
            {isLoading ? (
              <LoadingIndicator isLocal isOpen={isLoading} />
            ) : (
              <>
                <div className="w-85">
                  <AddNewItemSection
                    className="m-1 deal-image u-box-shadow-none flex-column-reverse align-items-center justify-content-center p-2 u-border-radius-4"
                    title="عکس"
                    onClick={() => myFiles.current.click()}
                  />
                </div>
                {productImages.map((file) => (
                  <div className="p-1 position-relative">
                    <div className="position-relative">
                      <img
                        alt=""
                        className="deal-image u-border-radius-4"
                        src={file.image_url}
                      />
                      <div className="liner-gradiant-card u-border-radius-4" />
                      <IconButton
                        className="u-cursor-pointer position-absolute left-0 bottom-0 p-1 z-index-2"
                        onClick={() => deleteProductImage(file)}
                      >
                        <DeleteIcon className="u-text-white" />
                      </IconButton>
                    </div>
                  </div>
                ))}
                {uploadedFiles.map((file, index) => (
                  <div className="p-1 position-relative">
                    <div className="position-relative">
                      <img
                        alt=""
                        className="deal-image u-border-radius-4"
                        src={file.url}
                      />
                      <div className="liner-gradiant-card u-border-radius-4" />
                      <IconButton
                        className="u-cursor-pointer position-absolute left-0 bottom-0 p-1 z-index-2"
                        onClick={() => _removeFile(index)}
                      >
                        <DeleteIcon className="u-text-white" />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <input
            className="d-none"
            ref={myFiles}
            type="file"
            multiple
            onChange={() =>
              _uploadFile(myFiles.current.files, "business_deals_images")
            }
          />
          <Input
            className="mt-3"
            label="عنوان محصول"
            value={title}
            onChange={setTitle}
          />
          <div className="d-none u-text-red u-font-semi-small">
            فیلد هارا پر کنید
          </div>

          <div className="mt-3">
            <MaterialSelect
              themeColor={theme.palette.primary.main}
              inputData={{ value: "", label: "دسته بندی" }}
              options={categories.map((_category) => ({
                ..._category,
                text: _category.name,
              }))}
              selectOption={(text) =>
                addCategory(categories.find((cat) => cat.name === text))
              }
            />
            <div className="d-flex mt-2">
              {selectedCategories.map((c) =>
                c ? (
                  <Chip
                    style={{ direction: "ltr" }}
                    label={c.name}
                    onDelete={() => {
                      removeCategory(c);
                    }}
                    variant="outlined"
                    className="m-1"
                  />
                ) : null
              )}
            </div>
            <div className="u-text-red">{error}</div>
          </div>
          <div className="my-3 px-3">
            {description !== null && (
              <RichText
                placeholder="درباره این آیتم بیشتر بنویسید..."
                label="توضیحات محصول"
                value={description}
                onChange={setDescription}
              />
            )}
          </div>
        </Collapse>
      </Paper>
    </div>
  );
}

GeneralInfo.propTypes = {
  _deleteProductImage: PropTypes.func,
  productImages: PropTypes.array,
  setImages: PropTypes.func,
  isLoading: PropTypes.bool,
  uploadedFiles: PropTypes.array,
  _removeFile: PropTypes.func,
  error: PropTypes.string,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  removeCategory: PropTypes.func,
  addCategory: PropTypes.func,
  categories: PropTypes.array,
  selectedCategories: PropTypes.array,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  _uploadFile: PropTypes.func,
};
