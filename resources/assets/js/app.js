// let injectTapEventPlugin = require('./material-ui/react-tap-event-plugin');
let Main = require('./material-ui/app/main');
let React = require('react');
// injectTapEventPlugin();

(function() {
  React.render(<Main />, document.querySelector('#app'));
})();
