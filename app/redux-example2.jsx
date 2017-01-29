var redux = require('redux');

console.log('starting redux example');
var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state = stateDefault, action) => {

  console.log('New action', action);

  switch (action.type) {
    case 'CHANGE_NAME':
    return {
      ...state,
      name:action.name
    };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id:nextHobbyId++,
            hobby:[action.hobby]
          }
        ]
      };
      case 'ADD_MOVIE':
        return {
          ...state,
          movies: [
            ...state.movies,
            {
              id:nextMovieId++,
              movie:action.movie,
              genre:action.genre
            }
          ]
        };
        case 'REMOVE_HOBBY':
          return {
            ...state,
            hobbies: state.hobbies.filter(function(hobby) {
              return (hobby.id !== action.id);
            })
          };
        case 'REMOVE_MOVIE':
          return {
            ...state,
            movies: state.movies.filter(function(movie) {
              return (movie.id !== action.id);
            })
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
