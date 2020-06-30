/* eslint-disable indent */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import {englishNumberToPersianNumber, getQueryParams} from "../../../utils/helper";
import {ICONS} from "../../../assets/images/icons";

function Pagination({ location, pagination }) {
  const page = +getQueryParams('page', location.search) || 1;
  const pages = pagination.pagesCount
    ? Array.from(Array(pagination.pagesCount).keys())
        .slice(Math.max(page - 3, 0), Math.min(page + 2, pagination.pagesCount))
        .reverse()
    : [];

  return (
    <div className="d-flex justify-content-between">
      {pagination.next ? (
        <Link
          to={`${location.pathname}?${pagination.next.split('?')[1] ||
            'page=1'}`}
          style={{ width: 105 }}
          className="u-text-primary-blue d-flex justify-content-center align-items-center"
        >
          <div style={{ transform: 'rotate(90deg)' }}>
            <Icon
              icon={ICONS.CHEVRON}
              color="#168fd5"
              size={9}
              width={12}
              height={12}
            />
          </div>
          <div>قبلی</div>
        </Link>
      ) : (
        <div style={{ width: 105 }} />
      )}
      <div className="d-flex justify-content-center align-items-center">
        {pages[0] + 1 < pagination.pagesCount && (
          <div className="d-flex align-items-center">
            <Link
              to={`${location.pathname}?page=${pagination.pagesCount}`}
              className="p-1"
            >
              <div className="u-border-radius-50-percent u-text-dark-grey">
                {englishNumberToPersianNumber(pagination.pagesCount)}
              </div>
            </Link>
            <span>...</span>
          </div>
        )}
        {pages.map(p => (
          <Link
            key={`page-${p}`}
            to={`${location.pathname}?page=${p + 1}`}
            className="p-1"
          >
            <div
              className="u-border-radius-50-percent"
              style={{
                fontWeight: p + 1 === +page ? 'bold' : 'normal',
                color: p + 1 === +page ? '#168fd5' : '#949C9F',
              }}
            >
              {englishNumberToPersianNumber(p + 1)}
            </div>
          </Link>
        ))}
        {pages[pages.length - 1] > 0 && (
          <div className="d-flex align-items-center">
            <span>...</span>
            <Link to={`${location.pathname}?page=${1}`} className="p-1">
              <div className="u-border-radius-50-percent u-text-dark-grey">
                ۱
              </div>
            </Link>
          </div>
        )}
      </div>
      {pagination.previous ? (
        <Link
          to={`${location.pathname}?${pagination.previous.split('?')[1] ||
            'page=1'}`}
          style={{ width: 105 }}
          className="u-text-primary-blue d-flex justify-content-center align-items-center"
        >
          <div>بعدی</div>
          <div style={{ transform: 'rotate(-90deg)' }}>
            <Icon
              icon={ICONS.CHEVRON}
              color="#168fd5"
              size={9}
              width={12}
              height={12}
            />
          </div>
        </Link>
      ) : (
        <div style={{ width: 105 }} />
      )}
    </div>
  );
}
Pagination.propTypes = {
  location: PropTypes.object,
  pagination: PropTypes.object,
};
export default memo(Pagination);
