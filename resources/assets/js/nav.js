let React = require('react');
let TopLeftNav = require('./material-ui/app/top-left-nav');
let ReactDOM = require('react-dom');

(function() {
	var navRight = (
		<div key="top-right-nav">
		  <a href='/notes/new' key="new-card-button-top" className="btn btn-success pull-right">New Note</a>
		</div>
	);
  ReactDOM.render(<TopLeftNav navRight={navRight}/>, document.querySelector('#react-nav'));
})();
