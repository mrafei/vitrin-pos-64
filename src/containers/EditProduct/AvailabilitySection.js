import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import Chip from "@material-ui/core/esm/Chip";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Switch from "../../components/Swtich";
import Input from "../../components/Input";
import Select from "../../components/Select";

import {
  englishNumberToPersianNumber,
  handleKeyDown,
  persianToEnglishNumber,
} from "../../../utils/helper";
import { availableOnDayOptions } from "./constants";

export default function AvailabilitySection({
  isProductAvailable,
  toggleProductAvailability,
  productAmount,
  setProductAmount,
  removeDay,
  addDay,
  selectedDays,
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
            موجودی محصول
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
          <div className="p-3">
            <div className="mt-2 d-flex">
              <div className="ml-1">موجود</div>
              <Switch
                id="product-availability"
                onColor={theme.palette.primary.main}
                isSwitchOn={isProductAvailable}
                toggleSwitch={() => {
                  if (productAmount === 0) setProductAmount(null);
                  toggleProductAvailability(!isProductAvailable);
                }}
              />
              <div className="mr-1">ناموجود</div>
            </div>
            <div className="mt-2 d-flex">
              <Input
                placeholder="نامحدود"
                label="تعداد موجودی"
                value={
                  productAmount || productAmount === 0
                    ? englishNumberToPersianNumber(productAmount)
                    : ""
                }
                onChange={(value) =>
                  setProductAmount(parseInt(persianToEnglishNumber(value), 10))
                }
                numberOnly
              />
            </div>
            <div className="mt-3">
              <Select
                inputData={{
                  value: "",
                  label: "فقط موجود در روزهای خاص (غذای روز)",
                }}
                options={availableOnDayOptions}
                selectOption={(text) =>
                  addDay(
                    availableOnDayOptions.find((option) => option.text === text)
                  )
                }
              />
              <div className="d-flex mt-2 flex-wrap">
                {selectedDays.map((c) => (
                  <Chip
                    style={{ direction: "ltr" }}
                    label={c.text}
                    onDelete={() => {
                      removeDay(c);
                    }}
                    variant="outlined"
                    className="m-1"
                  />
                ))}
              </div>
            </div>
          </div>
        </Collapse>
      </Paper>
    </div>
  );
}
AvailabilitySection.propTypes = {
  isProductAvailable: PropTypes.bool,
  toggleProductAvailability: PropTypes.func,
  productAmount: PropTypes.number,
  setProductAmount: PropTypes.func,
  removeDay: PropTypes.func,
  addDay: PropTypes.func,
  selectedDays: PropTypes.array,
};
