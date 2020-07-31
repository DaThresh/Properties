import { hot } from 'react-hot-loader/root';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './app.css';

function App() {
  const dispatch = useDispatch();
  const { count, name } = useSelector((state)=> ({
    ...state.countReducer,
    ...state.nameReducer
  }));

  const add = ()=> {
    dispatch({
      type: 'ADD'
    });
  };

  const subtract = ()=> {
    dispatch({
      type: 'SUBTRACT'
    });
  };

  const updateName = (e)=> {
    dispatch({
      type: 'UPDATE_NAME',
      payload: e.target.value
    });
  };

  return (
    <>
      <div id='test'>
        <h1 className='count'>{`Counter: ${count}`}</h1>
        <button onClick={add}>+</button>
        <button onClick={subtract}>-</button>
        <h1 className='name'>{`Name: ${name}`}</h1>
        <input placeholder='Input your name' onChange={updateName}/>
      </div>
    </>
  );
}

export default hot(App);
