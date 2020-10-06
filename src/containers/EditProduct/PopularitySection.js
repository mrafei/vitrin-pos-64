import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import Button from "@material-ui/core/esm/Button";
import Add from "@material-ui/icons/Add";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/esm/Box";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import {
  englishNumberToPersianNumber,
  handleKeyDown,
  persianToEnglishNumber,
} from "../../../utils/helper";
import Input from "../../components/Input";

export default function PopularitySection({ setPriority, priority = 100 }) {
  const [isCollapseOpen, openCollapse] = useState(false);
  const inputRef = useRef(null);
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
            اولویت (محبوبیت)
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
          <div className="pb-3 px-3">
            <div className="u-text-black u-fontNormal">
              چنانچه می‌خواهید ترتیب این محصول را برحسب اولویت نمایش در سایت
              مشخص کنید به آن امتیاز دهید.
            </div>

            <Box color="text.secondary" className="u-font-semi-small mt-1">
              حالت پیشفرض همه محصولات عدد ۱۰۰ است.
            </Box>
            <div className="position-relative">
              <Button
                onClick={() => {
                  const number = parseInt(priority, 10) + 1;
                  if (number <= 100) setPriority(number);
                }}
                style={{ minWidth: 0, width: 40, height: "calc(100% - 20px)" }}
                className="position-absolute mr-5 bottom-0 z-index-2 h-100 d-flex justify-content-center align-items-center"
              >
                <Add fontSize="small" color="primary" />
              </Button>
              <Input
                inputProps={{ className: "text-center" }}
                numberOnly
                inputRef={inputRef}
                onClick={() => {
                  inputRef.current.select();
                }}
                value={
                  priority
                    ? englishNumberToPersianNumber(parseInt(priority, 10))
                    : "۰"
                }
                onChange={(value) => {
                  if (persianToEnglishNumber(value) <= 100)
                    setPriority(persianToEnglishNumber(value));
                }}
              />
              <Button
                onClick={() => {
                  const number = parseInt(priority, 10) - 1;
                  if (number <= 100) setPriority(number);
                }}
                style={{ minWidth: 0, width: 40, height: "calc(100% - 20px)" }}
                className="position-absolute bottom-0 left-0 ml-5 z-index-2 d-flex justify-content-center align-items-center"
              >
                <Icon icon={ICONS.MINUS} color={theme.palette.primary.main} />
              </Button>
            </div>
          </div>
        </Collapse>
      </Paper>
    </div>
  );
}

PopularitySection.propTypes = {
  setPriority: PropTypes.func,
  priority: PropTypes.number,
};
