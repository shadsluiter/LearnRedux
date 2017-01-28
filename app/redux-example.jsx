var redux = require('redux');

console.log('starting redux example');
var stateDefault = {
  name:'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = function(state = stateDefault, action) {
    //state = state || { name:'Anonymous'};

    //console.log('new action', action);
    switch (action.type) {

      case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };

      case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [...state.hobbies,
        {
            id:nextHobbyId++,
            hobby:action.hobby
        }
      ]
    };
    case 'REMOVE_HOBBY':
    return {
      ...state,
      hobbies: state.hobbies.filter(function(hobby) {
          return hobby.id !== action.id
      })
    };

    case 'REMOVE_MOVIE':
    return {
      ...state,
      movies: state.movies.filter(function(movie) {
          return movie.id !== action.id
      })
    };


    case 'ADD_MOVIE':
    return {
      ...state,
      movies: [...state.movies,
      {
          id:nextMovieId++,
          movie:action.movie,
          genre:action.genre
      }
    ]
  };
      default:
      return state;
    }
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe( function() {
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log('New state', store.getState());
});

//unsubscribe();

var currentState = store.getState();
console.log('Current State: ', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Shad'
};
store.dispatch(action);

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'Saving Private Ryan',
  genre: 'war'
});


store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'Rogue One',
  genre: 'science fiction'
});

store.dispatch({
    type: 'REMOVE_MOVIE',
    id: 1
});
var action2 = {
  type: 'CHANGE_NAME',
  name: 'Emily'
};
store.dispatch(action2);
