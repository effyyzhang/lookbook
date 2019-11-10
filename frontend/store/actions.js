import axios from 'axios';
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

const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

const deleteAuth = () => ({
  type: DELETE_AUTH,
  auth: {},
});

const createUser = (user) => ({
  type: CREATE_USER,
  user,
});

const attemptSessionLogin = () => async (dispatch) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const auth = (await axios.get('/api/sessions', {
      headers: { authorization: token },
    })).data;
    dispatch(setAuth(auth));
  }
};

const attemptLogin = (credentials, history) => async (dispatch) => {
  const { token, isAdmin } = (await axios.post(
    '/api/sessions',
    credentials,
  )).data;
  window.localStorage.setItem('token', token);
  await dispatch(attemptSessionLogin());

  if (isAdmin) {
    history.push('/admin');
  } else {
    history.push('/');
  }
};

const logout = (history) => async (dispatch) => {
  window.localStorage.removeItem('token');
  // window.localStorage.removeItem('google_token');
  dispatch(deleteAuth());
  history.push('/');
};

const register = (newUser, history) => async (dispatch) => {
  const user = (await axios.post('/signup', newUser)).data;
  dispatch(createUser(user));
  history.push('/login');
};

const fetchBrands = () => async (dispatch) => {
  const brands = (await axios.get('/api/brands')).data;
  console.log('fetchbrands', brands);
  dispatch({ type: SET_BRANDS, brands });
};

const deleteBrand = (brand) => async (dispatch) => {
  await axios.delete(`/api/brands/${brand.id}`);
  dispatch({ type: DELETE_BRAND, brand });
};

const createBrand = (brand, history) => async (dispatch) => {
  const newBrand = (await axios.post('/api/brands', { brand })).data;
  dispatch({ type: CREATE_BRAND, brand: newBrand });
  history.push('/admin');
};

const updateBrand = (brand) => async (dispatch) => {
  await axios.put(`/api/brands/${brand.id}`, { brand });
  dispatch({ type: UPDATE_BRAND, brand });
};

const fetchTags = () => async (dispatch) => {
  const tags = (await axios.get('/api/tags')).data;
  dispatch({ type: SET_TAGS, tags });
};

const deleteTag = (tag) => async (dispatch) => {
  await axios.delete(`/api/tags/${tag.id}`);
  dispatch({ type: DELETE_TAG, tag });
};

const createTag = (tag) => async (dispatch) => {
  const newTag = (await axios.post('/api/tags', { tag })).data;
  dispatch({ type: CREATE_TAG, tag: newTag });
};

const updateTag = (tag) => async (dispatch) => {
  await axios.put(`/api/brands/${tag.id}`, { tag });
  dispatch({ type: UPDATE_TAG, tag });
};

export {
  register,
  fetchBrands,
  createBrand,
  deleteBrand,
  updateBrand,
  fetchTags,
  deleteTag,
  createTag,
  updateTag,
  attemptLogin,
  attemptSessionLogin,
  logout,
};
