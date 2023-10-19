import * as Action from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
  currentItem: null
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case Action.ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Action.GET_ITEMS_SUCCSSS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    }
    case Action.GET_ITEMS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    case Action.SELECT_ITEM: {
      return {
        ...state,
        currentItem: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default items;