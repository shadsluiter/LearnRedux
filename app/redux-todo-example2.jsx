var redux = require('redux');

console.log('starting redux example');

var stateDefault = {
  searchText: 'No search term',
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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe(function(){
    var state = store.getState();
    console.log('currentState -> ', state);
    document.getElementById('app').innerHTML = state.searchText;

});


var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Monkey pictures'
};
store.dispatch(action);

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Job for Shad'
};
store.dispatch(action);

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Looking for peace'
};
store.dispatch(action);
