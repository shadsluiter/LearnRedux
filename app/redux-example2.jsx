var redux = require('redux');

console.log('starting redux example');
var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;

var nameReducer = function(state = 'Anonymous', action) {
  // state now refers to the name of the person.
  switch (action.type) {

    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

var hobbiesReducer = function(state =[],action) {

  // notice that state now refers to the array of hobbies.
  switch (action.type) {
    case 'ADD_HOBBY':
    return [
      ...state,
      {
        id:nextHobbyId++,
        hobby:[action.hobby]
      }
    ];

    case 'REMOVE_HOBBY':
    return  state.filter(function(hobby) {
        return (hobby.id !== action.id);
      })
    default:
      return state;

  };
};

var movieReducer = function(movies_state = [], action) {
  switch(action.type){

    case 'ADD_MOVIE':
    return [
    ...movies_state,
    {
      id:nextMovieId++,
      movie:action.movie,
      genre:action.genre
    }
  ];

    case 'REMOVE_MOVIE':
    return movies_state.filter(function(movie) {
        return (movie.id !== action.id);
      });


    default:
      return movies_state;
};

};
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: movieReducer
});
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


var unsubscribe = store.subscribe(function(){
    var state = store.getState();
    console.log('currentState -> ', state);
    console.log('The new name is ', state.name);
    document.getElementById('app').innerHTML = state.name;
});

var action = {
  type:'CHANGE_NAME',
  name:'Shad'
};

store.dispatch(action);

store.dispatch ({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch ({
  type: 'ADD_HOBBY',
  hobby: 'Watching TV'
});
store.dispatch ({
  type: 'ADD_HOBBY',
  hobby: 'Programming'
});

store.dispatch ({
  type: 'REMOVE_HOBBY',
  id: 2
});
action = {
  type:'CHANGE_NAME',
  name:'Tim'
};

store.dispatch(action);

action = {
  type:'ADD_MOVIE',
  movie:'Harry Potter',
  genre:'Fantasy'
};

store.dispatch(action);

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'Star Wars',
  genre: 'Science Fiction'
  });

  store.dispatch({
    type: 'ADD_MOVIE',
    movie: 'Home Alone',
    genre: 'Comedy'
    });

    store.dispatch({
      type: 'REMOVE_MOVIE',
      id: 2
      });
