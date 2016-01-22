let CardPage = require('./material-ui/app/card-page');
let React = require('react');
let ReactDOM = require('react-dom');

(function() {
  ReactDOM.render(<CardPage src={"/react/cards/latin"} />, document.querySelector('#react-page'));
})();