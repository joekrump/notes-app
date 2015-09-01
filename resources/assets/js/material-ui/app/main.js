/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let RaisedButton = mui.RaisedButton;
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let CommentBox = require('./comment-box')

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

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
  toggleNav(e) {
    e.preventDefault();
    // Show/Hide the LeftMenu
    console.log('clicked');
    this.refs.leftNav.toggle();
  },

  render() {

    let menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Disabled',
         disabled: true
      },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://www.google.com',
         text: 'Disabled Link',
         disabled: true
      },
    ];

    return (
      <div>
        <LeftNav 
          ref="leftNav" 
          docked={false} 
          menuItems={menuItems} />
        <header>
          <AppBar
            title="Joe's App"
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            onLeftIconButtonTouchTap={this.toggleNav}
            isInitiallyOpen={true} />
        </header>

        <div className="container">
          <h1 className="title">
            Welcome!
          </h1>
          <CommentBox url="/comments" pollInterval={2000}/>
        </div>
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;