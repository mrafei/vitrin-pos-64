import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import TextField from "@material-ui/core/TextField";
import { ICONS } from "../../../assets/images/icons";

const Select = ({
  options,
  selectOption,
  inputData,
  onChange = () => {},
  onFocus = () => {},
  itemStyle,
  inputStyle,
  noIcon,
  containerStyle,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { label, value, className, placeholder } = inputData;

  return (
    <>
      {isOpen && <div className="u-absolute w-100 h-100 top-0 right-0" />}
      <div className="u-relative" style={containerStyle}>
        <TextField
          variant="filled"
          disabled={disabled}
          style={{ background: "white", width: "100%", ...inputStyle }}
          label={label}
          value={value}
          className={className}
          placeholder={placeholder}
          onChange={(name, v) => {
            onChange(name, v);
          }}
          autoComplete="off"
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
          {...props}
        />
        <Icon
          icon={ICONS.CONTROL_DOWN}
          size={25}
          color="#949C9F"
          className="position-absolute left-0 u-top-50-percent u-pointer-events-none"
        />
        {isOpen && (
          <div className="d-flex flex-column w-100 z-index-1000 c-input-result-search">
            {options.map((option) => (
              <div
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
                style={itemStyle}
                key={option.id}
                onClick={() => {
                  setIsOpen(false);
                  selectOption(option);
                }}
                className="d-flex flex-row align-items-center u-cursor-pointer px-2 u-text-dark-grey u-fontMedium c-input-result-search-item">
                {!noIcon && (
                  <Icon icon={ICONS.PLUS} size={12} color="#168fd4" className="ml-2 mr-2" />
                )}
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
Select.propTypes = {
  options: PropTypes.array,
  selectOption: PropTypes.func,
  inputData: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  itemStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  noIcon: PropTypes.bool,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
};
export default Select;
