/**
 *
 * AddNewItemSection
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CounterControlPanel from './CounterControlPanel';
import CounterCircleButton from './CounterCircleButton';
import PlusCircleButton from './PlusCircleButton';
// import styled from 'styled-components';

function RenderOrderControlPanel({
  isControlMode,
  themeColor,
  count,
  increment,
  decrement,
  toggleControlMode,
  openOrderControlPanel,
  initialIncrement,
  isProductAvailable,
  isEditMode,
}) {
  if (!isProductAvailable) {
    return (
      <div
        style={{ border: `2px solid ${themeColor}`, color: themeColor }}
        className="product-not-available"
      >
        ناموجود
      </div>
    );
  }
  if (isEditMode) {
    return <div />;
  }
  if (isControlMode) {
    return (
      <>
        <div className="c-business-card-item-bg" />
        <CounterControlPanel
          count={count}
          increment={increment}
          decrement={decrement}
          themeColor={themeColor}
          toggleControlMode={toggleControlMode}
        />
      </>
    );
  }
  if (count) {
    return (
      <CounterCircleButton
        onClick={openOrderControlPanel}
        themeColor={themeColor}
        count={count}
      />
    );
  }

  return (
    <PlusCircleButton onClick={initialIncrement} themeColor={themeColor} />
  );
}

RenderOrderControlPanel.propTypes = {
  initialIncrement: PropTypes.func.isRequired,
  openOrderControlPanel: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  isControlMode: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  toggleControlMode: PropTypes.func.isRequired,
  isProductAvailable: PropTypes.bool,
  isEditMode: PropTypes.bool,
};

RenderOrderControlPanel.defaultProps = {};

export default memo(RenderOrderControlPanel);
