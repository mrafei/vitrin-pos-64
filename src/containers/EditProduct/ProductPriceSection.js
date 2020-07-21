import React, { memo, useEffect, useState } from "react";
import Input from "../../components/Input";
import Switch from "../../components/Swtich";
import {
  persianToEnglishNumber,
  priceFormatter,
  englishNumberToPersianNumber,
} from "../../../utils/helper";
import TextSwitch from "../../components/TextSwitch";

function ProductPriceSection({ product, setProduct }) {
  const { initial_price: price, discounted_price: discountedPrice } = product;
  const [isPercent, setIsPercent] = useState(true);
  const [hasDiscount, setHasDiscount] = useState(false);
  const discount = isPercent
    ? Math.round(((price - discountedPrice) / price) * 100)
    : Math.round(price - discountedPrice);
  useEffect(() => {
    setHasDiscount(product.initial_price > product.discounted_price);
  }, [product.id]);
  return (
    <div
      className="u-relative p-4 u-background-white box-shadow u-border-radius-8 mr-4"
      style={{ height: "fit-content" }}>
      <div className="u-text-black u-fontWeightBold d-flex align-items-center justify-content-between">
        قیمت محصول
      </div>
      <Input
        className="mt-3"
        value={englishNumberToPersianNumber(price)}
        onChange={(initial_price) => {
          setProduct({
            ...product,
            initial_price: persianToEnglishNumber(initial_price),
            discounted_price: hasDiscount
              ? isPercent
                ? Math.round((discountedPrice / price) * persianToEnglishNumber(initial_price))
                : persianToEnglishNumber(initial_price) - discount
              : persianToEnglishNumber(initial_price),
          });
        }}
        label="قیمت اصلی محصول (تومان)"
        numberOnly
      />
      <Input
        value={englishNumberToPersianNumber(product.extra_data.packaging_price)}
        onChange={(packaging_price) =>
          setProduct({
            ...product,
            extra_data: {
              ...product.extra_data,
              packaging_price: persianToEnglishNumber(packaging_price),
            },
          })
        }
        className="mt-2"
        label="هزینه بسته‌بندی (تومان)"
        numberOnly
      />
      <div className="d-flex align-items-center justify-content-between mt-3">
        <span className="u-fontWeightBold u-text-black">تخفیف محصول</span>
        <Switch
          isSwitchOn={hasDiscount}
          toggleSwitch={(value) => {
            if (!value) setProduct({ ...product, discounted_price: price });
            setHasDiscount(value);
          }}
        />
      </div>
      <div className="d-flex align-items-center mt-2">
        <div className="w-50">
          <Input
            disabled={!hasDiscount}
            value={englishNumberToPersianNumber(discount)}
            onChange={(value) => {
              if (isPercent && persianToEnglishNumber(value) <= 100)
                setProduct({
                  ...product,
                  discounted_price: price * (1 - persianToEnglishNumber(value) / 100),
                });
              if (!isPercent)
                setProduct({ ...product, discounted_price: price - persianToEnglishNumber(value) });
            }}
            label={`تخفیف محصول (${isPercent ? "درصد" : "تومان"})`}
            numberOnly
          />
        </div>
        <div className="w-50 pr-4">
          <span>قیمت نهایی:</span>
          <span className="mr-1 u-fontWeightBold">
            {priceFormatter(Math.round(discountedPrice))}
          </span>
          <span className="mr-1 u-fontMedium">تومان</span>
        </div>
      </div>
      <TextSwitch
        className="mt-3"
        isSwitchOn={isPercent}
        toggleSwitch={setIsPercent}
        disabled={!hasDiscount}
        texts={["درصد", "تومان"]}
      />
    </div>
  );
}
export default memo(ProductPriceSection);
