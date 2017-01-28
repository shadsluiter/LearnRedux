var redux = require('redux');

console.log('starting redux example');

var reducer = (state ={name: 'Anonymous'}, action) => {

  // es5 alternative way to assign default value
  //state = state || {name: 'Anonymouse'};
  return state;

};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);
