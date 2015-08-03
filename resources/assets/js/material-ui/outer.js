let React = require('react');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

let Outer = React.createClass ({
  // Important!
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  // Important!
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function() {
    return (
      <div className="title">
        Hello World!
      </div>
    );
  }
});

module.exports = Outer;