import { createStore, combineReducers } from 'redux';

const initCountState = {
  count: 0
};

function countReducer(state = initCountState, action) {
  switch (action.type) {
  case 'ADD':
    return {
      ...state,
      count: state.count + 1
    };
  case 'SUBTRACT':
    return {
      ...state,
      count: state.count - 1
    };
  default:
    return state;
  }
}

const initNameState = {
  name: ''
};

function nameReducer(state = initNameState, action) {
  switch (action.type) {
  case 'UPDATE_NAME':
    return {
      ...state,
      name: action.payload
    };
  default:
    return state;
  }
}

const reducers = combineReducers({
  countReducer,
  nameReducer
});

const store = createStore(reducers);

export default store;
