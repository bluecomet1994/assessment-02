import axios from 'axios';
import * as Action from '../constants';

const ROOT_API = 'http://localhost:5000/api';

export const getItems = () => dispatch => {
  dispatch({ type: Action.ITEMS_REQUEST });

  return axios.get(`${ROOT_API}/items`)
    .then(response => {
      dispatch({
        type: Action.GET_ITEMS_SUCCSSS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: Action.GET_ITEMS_SUCCSSS,
        error
      });

      return error;
    })
}

export const addItem = data => dispatch => {
  dispatch({ type: Action.ITEMS_REQUEST });

  return axios.post(`${ROOT_API}/items`, data)
    .then(() => {
      dispatch(getItems());
    });
}

export const selectItem = data => {
  return {
    type: Action.SELECT_ITEM,
    payload: data
  }
}

export const editItem = (id, data) => dispatch => {
  dispatch({ type: Action.ITEMS_REQUEST });

  return axios.put(`${ROOT_API}/items?id=${id}`, data)
    .then(() => {
      dispatch(getItems());
    });
}

export const purchaseItem = id => dispatch => {
  return axios.put(`${ROOT_API}/items/purchase?id=${id}`)
    .then(() => {
      axios.get(`${ROOT_API}/items`)
        .then(response => {
          dispatch({
            type: Action.GET_ITEMS_SUCCSSS,
            payload: response.data
          });
        })
        .catch(error => {
          dispatch({
            type: Action.GET_ITEMS_SUCCSSS,
            error
          });

          return error;
        })
    });
}

export const deleteItem = id => dispatch => {
  dispatch({ type: Action.ITEMS_REQUEST });

  return axios.delete(`${ROOT_API}/items?id=${id}`)
    .then(() => {
      dispatch(getItems());
    });
}