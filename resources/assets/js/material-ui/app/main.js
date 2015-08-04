/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require ('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let CommentBox = require('./comment-box')

let Main = React.createClass({

  loadDefaultView: function(){

  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.cyan600
    });
  },

  render() {

    return (
      <div>
        <h1 className="title">
          Welcome!
        </h1>
        <CommentBox url="/comments" />
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} onClick={this.loadDefaultView}/>
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;