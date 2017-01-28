var redux = require('redux');

console.log('starting redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos:[]
};

var reducer = (state = stateDefault, action) => {

  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
      default:
        return state;
  }


};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);


var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Monkey pictures'
};
store.dispatch(action);

var currentState = store.getState();
console.log('Search text should say monkey pictures -> ', currentState);
