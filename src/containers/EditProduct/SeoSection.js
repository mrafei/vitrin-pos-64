import React, { useState } from "react";
import Input from "../../components/Input";

function SeoSection({ product, setProduct }) {
  const [seoKeyword, setSeoKeyword] = useState("");

  const seoKeywordValidation =
    seoKeyword &&
    seoKeyword.length >= 4 &&
    product.title.search(seoKeyword) > -1 &&
    product.description.search(seoKeyword) > -1;

  const seoKeywordInputValidation =
    seoKeyword && seoKeyword.length >= 4 && product.title.search(seoKeyword) > -1
      ? "green-bullet mx-1"
      : "red-bullet mx-1";

  const seoKeywordDescriptionValidation =
    seoKeyword && seoKeyword.length >= 4 && product.description.search(seoKeyword) > -1
      ? "green-bullet mx-1"
      : "red-bullet mx-1";
  return (
    <div
      className="u-relative px-3 u-background-white box-shadow u-border-radius-8 mr-4 mt-4"
      style={{ height: "fit-content" }}>
      <div className="d-flex flex-column align-items-center u-cursor-pointer px-0 py-2 mx-auto">
        <div className="d-flex justify-content-between collapse-header w-100">
          <div className="flex-1 u-text-black u-fontWeightBold">تنظیمات سئو</div>
          <div
            className={`d-flex align-items-center u-fontMedium ${
              seoKeywordValidation ? "u-text-green" : "u-text-red"
            }`}>
            {seoKeywordValidation ? "خوب" : "ضعیف"}
            <div
              className={`d-flex u-border-radius-4 mr-2 u-fontMedium ${
                seoKeywordValidation ? "u-background-green" : "u-background-red"
              }`}
              style={{ height: 8, width: 40 }}
            />
          </div>
        </div>
        <div className="px-3 ">
          <div className="my-2">
            <div className="u-fontMedium">
              می‌خواهید این پست شما با جستجوی چه عبارتی در گوگل در نتایج بالا نمایش داده شود؟
            </div>
            <Input
              className="my-2"
              value={seoKeyword}
              label="کلمه کلیدی"
              onChange={(value) => setSeoKeyword(value)}
            />
            <div className="my-2">
              <div className="d-flex align-items-center my-2">
                <div className={seoKeywordInputValidation} />
                <div>کلمه کلیدی در عنوان آیتم وجود دارد و حداقل ۴ کاراکتر داشته باشد.</div>
              </div>
              <div className="d-flex align-items-center my-2">
                <div className={seoKeywordDescriptionValidation} />
                <div>کلمه کلیدی در توضیحات آیتم وجود دارد و حداقل ۴ کاراکتر داشته باشد.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoSection;
