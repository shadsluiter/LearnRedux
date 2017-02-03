var redux = require('redux');
var axios = require('axios');
console.log('starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();


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


store.dispatch(actions.fetchLocation());

store.dispatch (actions.changeName('Shad'));
store.dispatch (actions.addHobby('Running'));
store.dispatch (actions.addHobby('Watch TV'));
store.dispatch (actions.addHobby('Fly drones'));
store.dispatch (actions.removeHobby(2));
store.dispatch (actions.changeName('Tim'));
store.dispatch (actions.addMovie('Harry Potter', 'Fantasy'));
store.dispatch (actions.addMovie('Star Wars', 'Sci Fi'));
store.dispatch (actions.addMovie('Home Alone', 'Comedy'));
store.dispatch (actions.removeMovie(2));
