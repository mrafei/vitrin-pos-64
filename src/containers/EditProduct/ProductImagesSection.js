import React, { useRef } from "react";
import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import AddNewItemSection from "../../components/AddNewItemSection";

function ProductImagesSection({
  productImages = [],
  uploadedFiles = [],
  _removeFile,
  _uploadFile,
  _deleteProductImage,
  setImages,
}) {
  const myFiles = useRef(null);
  const deleteProductImage = (_image) => {
    _deleteProductImage(_image.id);
    const selectedImage = productImages.findIndex((pi) => pi.id === _image.id);
    const _productImages = [...productImages];
    _productImages.splice(selectedImage, 1);
    if (selectedImage > -1) {
      setImages(_productImages);
    }
  };
  return (
    <div className="d-flex w-100 mt-4">
      <input
        className="d-none"
        ref={myFiles}
        type="file"
        multiple
        onChange={() => {
          _uploadFile(myFiles.current.files, "business_deals_images");
        }}
      />
      <AddNewItemSection
        className="m-1 deal-image flex-column-reverse align-items-center justify-content-center p-2 u-border-radius-4"
        title="عکس"
        onClick={() => myFiles.current.click()}
      />
      {productImages.map((file) => (
        <div className="p-1 position-relative" key={`product-image-${file.image_url}`}>
          <div className="position-relative">
            <img alt="" className="deal-image u-border-radius-4" src={file.image_url} />
            <div className="liner-gradiant-card u-border-radius-4" />
            <Icon
              className="u-cursor-pointer position-absolute left-0 bottom-0 z-index-2"
              icon={ICONS.TRASH}
              size={19}
              color="white"
              onClick={() => deleteProductImage(file)}
            />
          </div>
        </div>
      ))}
      {uploadedFiles.map((file, index) => (
        <div className="p-1 position-relative" key={`product-image-${file.url}`}>
          <div className="position-relative">
            <img alt="" className="deal-image u-border-radius-4" src={file.url} />
            <div className="liner-gradiant-card u-border-radius-4" />
            <Icon
              onClick={() => _removeFile(index)}
              className="u-cursor-pointer position-absolute left-0 bottom-0 z-index-2"
              icon={ICONS.TRASH}
              size={19}
              color="white"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProductImagesSection;
