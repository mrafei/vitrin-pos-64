/* eslint-disable react/no-danger */
/**
 *
 * Input
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/esm/TextField';

function Input({
                 className = 'direction-rtl',
                 onChange,
                 value,
                 type,
                 label,
                 themeColor,
                 noModal,
                 numberOnly,
                 ...props
               }) {
  const [assistiveText, setAssistiveText] = useState('');
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .MuiFilledInput-underline:after {
            border-bottom: 2px solid ${themeColor} !important;
          }
          .MuiFormLabel-root.Mui-focused {
            color: ${themeColor} !important;
        `
        }}
      />
      <div className="w-100">
        {type === 'textarea' ? (
          <textarea
            className="c-input c-input-text-area mt-2"
            value={value}
            onChange={e => onChange(e.target.value)}
            {...props}
          />
        ) : (
          <TextField
            InputLabelProps={{
              style: { textAlign: 'left', direction: 'rtl' }
            }}
            fullWidth
            variant="filled"
            className={`u-fontLarge ${className}`}
            value={value}
            onChange={e => {
              if (numberOnly) {
                if (e.target.value.search(/[^0-9۰-۹]/g, '') !== -1)
                  setAssistiveText('تنها مجاز به وارد کردن عدد هستید.');
                else setAssistiveText('');
                onChange(e.target.value.replace(/[^0-9۰-۹]/g, ''));
              } else onChange(e.target.value);
            }}
            label={label}
            {...props}
          />
        )}
        <div className="u-text-red u-font-semi-small mt-1">{assistiveText}</div>
      </div>
    </>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  themeColor: PropTypes.string,
  noModal: PropTypes.bool,
  numberOnly: PropTypes.bool
};

Input.defaultProps = {
  className: 'direction-rtl',
  type: 'text',
  themeColor: '#168FD5'
};

export default memo(Input);
