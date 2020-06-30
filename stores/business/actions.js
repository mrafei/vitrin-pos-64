import {businessSerializer} from '../../utils/helper';
import {
  SET_BUSINESS,
  GET_BUSINESS,
  UPDATE_BUSINESS_REQUEST,
  UPDATE_BUSINESS_WORKING_HOUR_REQUEST,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_IMAGE_TO_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_IMAGE_FROM_PRODUCT,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_SECTION,
  SUGGEST_BUSINESS_EDIT, SET_PLUGIN_DATA, GET_DELIVERIES, SET_DELIVERIES,
} from './constants';

export function setBusiness(business) {
  return {
    type: SET_BUSINESS,
    data: businessSerializer(business),
  };
}

export function getBusiness() {
  return {
    type: GET_BUSINESS,
  };
}

export function updateBusiness(data, successMessage, failMessage) {
  return {
    type: UPDATE_BUSINESS_REQUEST,
    data,
    successMessage,
    failMessage,
  };
}

export function suggestBusinessEdit(data) {
  return {
    type: SUGGEST_BUSINESS_EDIT,
    data,
  };
}

export function updateBusinessWorkingHour(data, label) {
  return {
    type: UPDATE_BUSINESS_WORKING_HOUR_REQUEST,
    data,
    label,
  };
}

export function createCategory(category, businessId) {
  return {
    type: CREATE_CATEGORY,
    data: {business: businessId, name: category},
  };
}

export function updateCategory(categoryId, categoryName) {
  return {
    type: UPDATE_CATEGORY,
    data: {id: categoryId, name: categoryName},
  };
}

export function deleteCategory(data, history) {
  return {
    type: DELETE_CATEGORY,
    data,
    history,
  };
}

export function createProduct(product, images) {
  return {
    type: CREATE_PRODUCT,
    data: {product, images},
  };
}

export function updateProduct(productId, product, uploadedFiles) {
  return {
    type: UPDATE_PRODUCT,
    data: {id: productId, product, images: uploadedFiles},
  };
}

export function deleteProduct(productId) {
  return {
    type: DELETE_PRODUCT,
    data: {id: productId},
  };
}

export function addImageToProduct(image, productId) {
  return {
    type: ADD_IMAGE_TO_PRODUCT,
    data: {image, deal: productId},
  };
}

export function deleteImageFromProduct(imageId) {
  return {
    type: DELETE_IMAGE_FROM_PRODUCT,
    data: {id: imageId},
  };
}

export function createPost(post, postType) {
  return {
    type: CREATE_POST,
    data: {post},
    postType,
  };
}

export function updatePost(post, postType) {
  return {
    type: UPDATE_POST,
    data: {post},
    postType,
  };
}

export function deletePost(postId, postType) {
  return {
    type: DELETE_POST,
    data: {id: postId},
    postType,
  };
}

export function updateSection(data) {
  return {
    type: UPDATE_SECTION,
    data,
  };
}

export function setPluginData(pluginName, data, successMessage, errorMessage) {
  return {
    type: SET_PLUGIN_DATA,
    data: {
      plugin: pluginName,
      data,
    },
    successMessage,
    errorMessage
  };
}

export function getDeliveries(deliverer, page) {
  return {
    type: GET_DELIVERIES,
    data: {page, deliverer}
  };
}

export function setDeliveries(data, pagination) {
  return {
    type: SET_DELIVERIES,
    data,
    pagination
  };
}
