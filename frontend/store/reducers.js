import { combineReducers } from 'redux';

import {
  SET_AUTH,
  DELETE_AUTH,
  CREATE_USER,
  SET_TAGS,
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
  SET_BRANDS,
  CREATE_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
} from './constants';

const brandsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BRANDS:
      return action.brands;
    case CREATE_BRAND:
      return [...state, action.brand];
    case DELETE_BRAND:
      return state.filter((brand) => brand.id !== action.brand.id);
    case UPDATE_BRAND:
      return state.map((brand) => {
        if (brand.id === action.brand.id) {
          return action.brand;
        }
        return brand;
      });
    default:
      return state;
  }
};

const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    case CREATE_TAG:
      return [...state, action.tag];
    case DELETE_TAG:
      return state.filter((tag) => tag.id !== action.tag.id);
    case UPDATE_TAG:
      return state.map((tag) => {
        if (tag.id === action.tag.id) {
          return action.tag;
        }
        return tag;
      });
    default:
      return state;
  }
};

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...action.auth };
    case DELETE_AUTH:
      return { ...action.auth };
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      // registered user will be added
      return action.user;
    default:
      return state;
  }
};

export default combineReducers({
  brands: brandsReducer,
  tags: tagsReducer,
  auth: authReducer,
  user: userReducer,
});
