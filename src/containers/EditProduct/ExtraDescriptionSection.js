import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/esm/Paper";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";

import RichText from "../../components/RichText";
import { handleKeyDown } from "../../../utils/helper";

export default function ExtraDescriptionSection({
  setComplementary,
  complementary,
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
            مشخصات تکمیلی
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
          <div className="px-3 pb-3 w-100">
            <RichText
              placeholder="درباره این آیتم بیشتر بنویسید..."
              label=""
              value={complementary}
              onChange={setComplementary}
            />
          </div>
        </Collapse>
      </Paper>
    </div>
  );
}

ExtraDescriptionSection.propTypes = {
  setComplementary: PropTypes.func,
  complementary: PropTypes.string,
};
