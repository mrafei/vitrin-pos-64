import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import IconButton from "@material-ui/core/esm/IconButton";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Input from "../../components/Input";
import AddNewItemSection from "../../components/AddNewItemSection";
import { handleKeyDown } from "../../../utils/helper";

export default function ExtraItems({
  productExtraItems,
  setProductExtraItems,
}) {
  const [isCollapseOpen, openCollapse] = useState(false);
  const theme = useTheme();
  return (
    <div className="my-3 px-3">
      <Paper
        elevation={2}
        className="d-flex flex-column align-items-center u-cursor-pointer mx-auto"
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
            آیتم افزوده به محصول
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
          <div className="d-flex flex-column align-items-center u-cursor-pointer mx-auto pb-3">
            <div className="px-3">
              <div>
                آیتم‌های افزوده به عنوان موارد پیشنهادی بعد از انتخاب محصول به
                مشتریان‌تان نمایش داده می‌شوند.
              </div>
              {productExtraItems.map((row, index) => (
                <div className="d-flex">
                  <div className="col-1 px-1 d-flex align-items-center">
                    <IconButton
                      onClick={() =>
                        setProductExtraItems(
                          productExtraItems.filter((r, i) => i !== index)
                        )
                      }
                      edge="end"
                    >
                      <CloseRoundedIcon
                        style={{
                          color: theme.palette.text.disabled,
                        }}
                      />
                    </IconButton>
                  </div>
                  <div className="col-4 px-1">
                    <Input
                      className="my-2"
                      value={row.title}
                      label="عنوان آیتم"
                      onChange={(value) => {
                        const newProductExtraItems = [...productExtraItems];
                        newProductExtraItems[index].title = value;
                        setProductExtraItems(newProductExtraItems);
                      }}
                    />
                  </div>
                  <div className="col-7 px-1">
                    <Input
                      className="my-2"
                      value={row.price}
                      label="قیمت به تومان"
                      type="number"
                      onChange={(value) => {
                        const newProductExtraItems = [...productExtraItems];
                        newProductExtraItems[index].price = +value;
                        setProductExtraItems(newProductExtraItems);
                      }}
                    />
                  </div>
                </div>
              ))}
              <AddNewItemSection
                className="p-2 u-border-none u-border-radius-4 u-font-small mt-2"
                title="افزودن ردیف دیگر"
                onClick={() =>
                  setProductExtraItems([
                    ...productExtraItems,
                    { title: "", price: 0 },
                  ])
                }
              />
            </div>
          </div>
        </Collapse>
      </Paper>
    </div>
  );
}

ExtraItems.propTypes = {
  productExtraItems: PropTypes.array,
  setProductExtraItems: PropTypes.func,
};
