import React, { useState } from "react";
import PropTypes from "prop-types";
import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

import { Collapse } from "react-collapse";
import Input from "../../components/Input";
import {
  englishNumberToPersianNumber,
  handleKeyDown,
  persianToEnglishNumber,
  priceFormatter,
} from "../../../utils/helper";
import Switch from "../../components/Swtich";
import TextSwitch from "../../components/TextSwitch";

export default function PriceSection({
  price,
  setPrice,
  finalPrice,
  setFinalPrice,
  productPackagingPrice,
  setProductPackagingPrice,
  discount,
  isPercent,
  hasDiscount,
  setHasDiscount,
  setIsPercent,
}) {
  const theme = useTheme();
  const [isCollapseOpen, openCollapse] = useState(true);

  return (
    <div className="my-3 px-3">
      <Paper className="d-flex flex-column align-items-center u-cursor-pointer mx-auto">
        <div
          onClick={() => openCollapse(!isCollapseOpen)}
          className="d-flex justify-content-between collapse-header u-font-semi-small-r w-100"
          onKeyDown={(e) =>
            handleKeyDown(e, () => openCollapse(!isCollapseOpen))
          }
          role="button"
          tabIndex="0"
        >
          <div className="flex-1 u-text-black u-fontWeightBold">قیمت محصول</div>

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
          <Input
            label="قیمت محصول (تومان)"
            value={price ? englishNumberToPersianNumber(price) : ""}
            onChange={(value) => setPrice(persianToEnglishNumber(value))}
          />
          <div className="mt-3 u-relative">
            <Input
              label="هزینه‌ی بسته‌بندی محصول (تومان)"
              value={
                productPackagingPrice
                  ? englishNumberToPersianNumber(productPackagingPrice)
                  : ""
              }
              onChange={(value) =>
                setProductPackagingPrice(persianToEnglishNumber(value))
              }
              numberOnly
            />
          </div>
          <div className="d-flex mt-4 align-items-center justify-content-between">
            <span className="u-fontWeightBold u-text-black">
              تخفیف روی محصول
            </span>
            <Switch
              isSwitchOn={hasDiscount}
              toggleSwitch={(value) => {
                if (!value) setPrice(price);
                setHasDiscount(value);
              }}
            />
          </div>
          <Collapse isOpened={hasDiscount}>
            <div className="d-flex align-items-center mt-2">
              <div className="w-50">
                <Input
                  value={discount ? englishNumberToPersianNumber(discount) : ""}
                  onChange={(value) => {
                    if (isPercent && persianToEnglishNumber(value) <= 100)
                      setFinalPrice(
                        price * (1 - persianToEnglishNumber(value) / 100)
                      );
                    if (!isPercent)
                      setFinalPrice(price - persianToEnglishNumber(value));
                  }}
                  label={`تخفیف محصول (${isPercent ? "درصد" : "تومان"})`}
                  numberOnly
                />
              </div>
              <div className="w-50 pr-4">
                <span>قیمت نهایی:</span>
                <span className="mr-1 u-fontWeightBold">
                  {priceFormatter(Math.round(finalPrice))}
                </span>
                <span className="mr-1 u-fontMedium">تومان</span>
              </div>
            </div>
            <TextSwitch
              className="mt-3"
              isSwitchOn={!isPercent}
              toggleSwitch={(value) => setIsPercent(!value)}
              texts={["تومان", "درصد"]}
            />
          </Collapse>
        </Collapse>
      </Paper>
    </div>
  );
}

PriceSection.propTypes = {
  price: PropTypes.number,
  setPrice: PropTypes.func,
  finalPrice: PropTypes.number,
  setFinalPrice: PropTypes.func,
  productPackagingPrice: PropTypes.number,
  setProductPackagingPrice: PropTypes.func,
  discount: PropTypes.number,
  isPercent: PropTypes.bool,
  hasDiscount: PropTypes.bool,
  setHasDiscount: PropTypes.func,
  setIsPercent: PropTypes.func,
};
