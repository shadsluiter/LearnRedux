var redux = require('redux');

console.log('starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {

  console.log('New action', action);

  switch (action.type) {
    case 'CHANGE_NAME':
    return {
      ...state,
      name:action.name
    };
    default:
      return state;
  }

};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type:'CHANGE_NAME',
  name:'Shad'
};

store.dispatch(action);

var currentState = store.getState();
console.log('Name should be shad -> ', currentState);
