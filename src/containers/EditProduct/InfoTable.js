import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import IconButton from "@material-ui/core/esm/IconButton";
import Input from "../../components/Input";
import AddNewItemSection from "../../components/AddNewItemSection";
import { handleKeyDown } from "../../../utils/helper";

export default function InfoTable({ productInfoTable, setProductInfoTable }) {
  const [isCollapseOpen, openCollapse] = useState(false);
  const theme = useTheme();
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
          <div className="flex-1 u-text-black u-fontWeightBold">
            جدول مشخصات
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
            content: "ReactCollapse--content pb-3",
          }}
        >
          <div className="d-flex flex-column align-items-center u-cursor-pointer mx-auto">
            <div className="px-3">
              <div>
                در این بخش می توانید مشخصات ویژه محصول خود را به صورت جدول بیان
                کنید.
              </div>
              {productInfoTable.map((row, index) => (
                <div className="d-flex" key={`entry-${index}`}>
                  <div className="col-1 px-1 d-flex align-items-center">
                    <IconButton
                      onClick={() =>
                        setProductInfoTable(
                          productInfoTable.filter((r, i) => i !== index)
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
                      className="mt-2"
                      value={row.key}
                      label="عنوان ویژگی"
                      onChange={(value) => {
                        const newProductInfoTable = [...productInfoTable];
                        newProductInfoTable[index].key = value;
                        setProductInfoTable(newProductInfoTable);
                      }}
                    />
                    {row.key === "" ? (
                      <div className="pr-3 mb-2 u-font-semi-small">
                        مثال: ابعاد
                      </div>
                    ) : null}
                  </div>
                  <div className="col-7 px-1">
                    <Input
                      className="mt-2"
                      value={row.value}
                      label="توضیحات ویژگی"
                      onChange={(value) => {
                        const newProductInfoTable = [...productInfoTable];
                        newProductInfoTable[index].value = value;
                        setProductInfoTable(newProductInfoTable);
                      }}
                    />
                    {row.value === "" ? (
                      <div className="pr-3 mb-2 u-font-semi-small">
                        مثال: ۳۳*۵۰*۵۸
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              <AddNewItemSection
                className="p-2 u-border-none u-border-radius-4 u-font-small"
                title="افزودن ردیف دیگر"
                onClick={() =>
                  setProductInfoTable([
                    ...productInfoTable,
                    { key: "", value: "" },
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

InfoTable.propTypes = {
  productInfoTable: PropTypes.array,
  setProductInfoTable: PropTypes.func,
};
