let React = require('react');
let TopNav = require('./material-ui/app/top-nav');
let ReactDOM = require('react-dom');

(function() {
	var navRight = (
		<div key="top-right-nav">
		  <a href='/notes/new' key="new-card-button-top" className="btn btn-success pull-right">New Note</a>
		</div>
	);
  ReactDOM.render(<TopNav navRight={navRight}/>, document.querySelector('#react-nav'));
})();
