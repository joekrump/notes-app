/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let FlatButton = mui.FlatButton;
let Dialog = mui.Dialog;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let Theme = mui.Theme;

let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  // childContext() {
  //   muiTheme: ThemeManager.types.LIGHT
  // },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  render() {

    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />
    ];

    return (
      <div>
        <Dialog
          title="Super Secret Password"
          actions={customActions}
          ref="superSecretPasswordDialog"
          openImmediately={true}>
          The actions in this window were passed in as an array of react objects.
        </Dialog>

        <h1 className="title">material-ui</h1>

        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;