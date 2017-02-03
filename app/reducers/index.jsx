
export var nameReducer = function(state = 'Anonymous', action) {
  // state now refers to the name of the person.
  switch (action.type) {

    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};


var nextHobbyId = 1;
export var hobbiesReducer = function(state =[],action) {

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


var nextMovieId = 1;
export var movieReducer = function(movies_state = [], action) {
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



export var mapReducer = (state ={isFetching: false, url:undefined}, action) => {
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
