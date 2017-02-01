var redux = require('redux');
var axios = require('axios');
console.log('starting redux example');



// ---- name reducer and action generators

var nameReducer = function(state = 'Anonymous', action) {
  // state now refers to the name of the person.
  switch (action.type) {

    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

var changeName = (name) => {
  return {
    type:'CHANGE_NAME',
    // name: name
    name
  }
};


// ----- hobby reducer and action generators
var nextHobbyId = 1;
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

var addHobby = (hobby) => {
  return {
    type:'ADD_HOBBY',
    hobby
  }
};

var removeHobby = (id) => {
  return {
    type:'REMOVE_HOBBY',
    id
  }
};

// ----- movie reducer and action generators
var nextMovieId = 1;
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

var addMovie = function(movie,genre) {
  return {
    type:'ADD_MOVIE',
    movie,
    genre
  }
};

var removeMovie = function(id) {
  return {
    type:'REMOVE_MOVIE',
    id
  }
};


// ---- map reducer and action generators
// --------------------------------------


// intitate the location search.  Called first from fetchLocation
var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

// only called on a successful data return from api. called inside fetchLocation
var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var mapReducer = (state ={isFetching: false, url:undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching:true,
        url: action.url
      };
      case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching:false,
        url:action.url
      };
      default:
        return state;
  }
};


// combines two step process (1) startLocationFetch and (2) completeLocationFetch
var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function (res) {
    var loc = res.data.loc;
    var baseURL = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseURL + loc));

  });
};


// --- combined reducer
// ----------------------
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: movieReducer,
  map: mapReducer
});
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


var unsubscribe = store.subscribe(function(){
    var state = store.getState();
    console.log('currentState -> ', state);

    if (state.map.isFetching) {
      document.getElementById('app').innerHTML ='Loading';
    }
    else if (state.map.url) {
      console.log(state.map.url);
        document.getElementById('app').innerHTML =  '<a href = ' + state.map.url + '>View your location</a>';
    }
});


fetchLocation();

store.dispatch (changeName('Shad'));
store.dispatch (addHobby('Running'));
store.dispatch (addHobby('Watch TV'));
store.dispatch (addHobby('Fly drones'));
store.dispatch (removeHobby(2));
store.dispatch (changeName('Tim'));
store.dispatch (addMovie('Harry Potter', 'Fantasy'));
store.dispatch (addMovie('Star Wars', 'Sci Fi'));
store.dispatch (addMovie('Home Alone', 'Comedy'));
store.dispatch (removeMovie(2));
