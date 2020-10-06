import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

import { handleKeyDown } from "../../../utils/helper";
import Input from "../../components/Input";

export default function SeoSection({ title, description }) {
  const [isCollapseOpen, openCollapse] = useState(false);
  const [seoKeyword, setSeoKeyword] = useState("");
  const theme = useTheme();
  const seoKeywordValidation =
    seoKeyword &&
    seoKeyword.length >= 4 &&
    title.search(seoKeyword) > -1 &&
    description.search(seoKeyword) > -1;

  const seoKeywordInputValidation =
    seoKeyword && seoKeyword.length >= 4 && title.search(seoKeyword) > -1
      ? "green-bullet mx-1"
      : "red-bullet mx-1";

  const seoKeywordDescriptionValidation =
    seoKeyword && seoKeyword.length >= 4 && description.search(seoKeyword) > -1
      ? "green-bullet mx-1"
      : "red-bullet mx-1";

  return (
    <div className="my-3 px-3">
      <Paper className="d-flex flex-column align-items-center u-cursor-pointer mx-auto">
        <div
          onClick={() => openCollapse(!isCollapseOpen)}
          className={`d-flex justify-content-between collapse-header u-font-semi-small-r w-100 ${
            seoKeywordValidation ? "u-border-right-green" : "u-border-right-red"
          }`}
          onKeyDown={(e) =>
            handleKeyDown(e, () => openCollapse(!isCollapseOpen))
          }
          role="button"
          tabIndex="0"
        >
          <div className="flex-1 u-text-black u-fontWeightBold">
            تنظیمات سئو
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
            content: "ReactCollapse--content",
          }}
        >
          <div className="px-3">
            <div className="my-2">
              <div>کلمه کلیدی</div>
              <div className="u-text-dark-grey">
                می‌خواهید این پست شما با جستجوی چه عبارتی در گوگل در نتایج بالا
                نمایش داده شود؟
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
                  <div>
                    کلمه کلیدی در عنوان آیتم وجود دارد و حداقل ۴ کاراکتر داشته
                    باشد.
                  </div>
                </div>
                <div className="d-flex align-items-center my-2">
                  <div className={seoKeywordDescriptionValidation} />
                  <div>
                    کلمه کلیدی در توضیحات آیتم وجود دارد و حداقل ۴ کاراکتر داشته
                    باشد.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </Paper>
    </div>
  );
}
SeoSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
