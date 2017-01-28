var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');


//load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation();

// app.css
require('style!css!sass!applicationStyles')


// ReactDOM.render(
//
// <p>Boilerplate 3 project</p>,
//     document.getElementById('app')
//     );

//require ('./redux-example2.jsx');
require ('./redux-todo-example2.jsx');
