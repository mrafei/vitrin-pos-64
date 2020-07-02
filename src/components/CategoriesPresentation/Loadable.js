/**
 *
 * Asynchronously loads the component for FoodCategories
 *
 */

import React from 'react';
import loadable from '../../utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <div />,
});
