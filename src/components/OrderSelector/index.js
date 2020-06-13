import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from '../../components/Icon';
import { ICONS } from '../../assets/images/icons';

const OrderSelector = ({ collapseState, setCollapseState }) => {
  const [collapse, setCollapse] = useState(false);
  let text = 'همه';
  if (collapseState === 'today') text = 'امروز';
  if (collapseState === 'past') text = 'گذشته';

  const toggleCollapse = isOpen => {
    setCollapse(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'initial';
  };
  return (
    <div className="position-absolute w-100" style={{ zIndex: 1 }}>
      {collapse && (
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
          className="w-100 h-100-vh position-absolute"
          style={{
            backgroundColor: collapse ? 'rgba(0,0,0,0.5)' : 'transparent',
          }}
          onClick={() => {
            toggleCollapse(false);
          }}
        />
      )}
      <div className="d-flex flex-column col-12 col-sm-10 col-md-6 mx-auto px-0">
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
          className="w-100 u-borderBottom bg-white p-3 u-cursor-pointer d-flex"
          onClick={() => {
            toggleCollapse(!collapse);
          }}
        >
          {text}{' '}
          <div
            style={{ transition: 'all 300ms linear' }}
            className={`mr-1 ${collapse ? 'rotated' : ''}`}
          >
            <Icon icon={ICONS.CHEVRON} size={9} color="black" />
          </div>
        </div>

        <Collapse isOpened={collapse}>
          <div className="bg-white u-border-bottom-left-radius-4 u-border-bottom-right-radius-4 u-cursor-pointer">
            {collapseState !== 'all' && (
              <div
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
                className="py-2 px-3"
                onClick={() => {
                  setCollapseState('all');
                  toggleCollapse(false);
                }}
              >
                همه
              </div>
            )}
            {collapseState !== 'today' && (
              <div
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
                className="py-2 px-3"
                onClick={() => {
                  setCollapseState('today');
                  toggleCollapse(false);
                }}
              >
                امروز
              </div>
            )}
            {collapseState !== 'past' && (
              <div
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
                className="py-2 px-3"
                onClick={() => {
                  setCollapseState('past');
                  toggleCollapse(false);
                }}
              >
                گذشته
              </div>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};
OrderSelector.propTypes = {
  collapseState: PropTypes.string,
  setCollapseState: PropTypes.func,
};
export default OrderSelector;
