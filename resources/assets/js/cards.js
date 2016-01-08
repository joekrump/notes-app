let CardPage = require('./material-ui/app/card-page');
let React = require('react');

(function() {
  React.render(<CardPage src={"/react/cards/latin"} />, document.querySelector('#card-page'));
})();