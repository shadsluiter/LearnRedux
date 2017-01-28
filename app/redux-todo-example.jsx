var redux = require('redux');

console.log('starting redux example');
var stateDefault = {
  searchText: '',
  showCompleted: false,

  todos: []
};

var reducer = function(state = stateDefault, action) {
    //state = state || { name:'Anonymous'};
    switch (action.type) {
      case 'CHANGE_TEXT':
      return {
        ...state,
        searchText: action.searchText
      }
      default:
        return state;
    };

};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var state = store.getState();
console.log('Initial Current State: ', state);


var unsubscribe = store.subscribe( function() {
  var state = store.getState();

  console.log('Search text is', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});

var action = {
  type: 'CHANGE_TEXT',
  searchText: 'dog'
};

store.dispatch(action);
var state = store.getState();
console.log('Final Current State: ', state);
document.getElementById('app').innerHTML = state.searchText;
