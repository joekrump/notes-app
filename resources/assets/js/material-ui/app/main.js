/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let RaisedButton = mui.RaisedButton;
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;
let ActionSettings = require('material-ui/lib/svg-icons/action/settings');
let FloatingActionButton = mui.FloatingActionButton;
let MenuDivider = mui.MenuDivider;
let IconMenu = mui.IconMenu;
let IconButton = mui.IconButton;

let ThemeManager = mui.Styles.ThemeManager;
let Colors = mui.Styles.Colors;
let CommentBox = require('./comment-box')
let CustomColors = require('./styles/colors');
let CustomTheme = require('./styles/themes/custom1');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let Main = React.createClass({

  loadDefaultView: function(){

  },
  getInitialState () {
    return {
      muiTheme: this.context.muiTheme,
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    // ThemeManager.setTheme(CustomTheme);
    return {
      muiTheme: ThemeManager.getMuiTheme(CustomTheme),
    };
  },

  componentWillMount() {
    // ThemeManager.setTheme(CustomTheme);
  },
  toggleNav(e) {
    e.preventDefault();
    // Show/Hide the LeftMenu
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

    let iconButtonElement = (
      <FloatingActionButton 
        zDepth={5} 
        tooltip="Settings" 
        tooltipPosition="top-right"
        style={{position:'fixed',bottom:'50px',right:'50px',background:'none'}}>
        <ActionSettings ref={"settings-1"} />
      </FloatingActionButton>
    );

    return (
      <div>
        <LeftNav 
          ref="leftNav" 
          docked={false} 
          zDepth={4}
          menuItems={menuItems} />
        <header>
          <AppBar
            title="Joe's App"
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            onLeftIconButtonTouchTap={this.toggleNav}
            isInitiallyOpen={true}
            zDepth={4} 
            style={{backgroundColor: Colors.tealA700, color: Colors.darkWhite}} />
        </header>

        <div className="container">
          <h1 className="title">
            Welcome!
          </h1>
          <CommentBox url="/comments" pollInterval={5000}/>
      
          <IconMenu style={{position:'fixed',bottom:'100px',right:'145px'}} zDepth={0} iconButtonElement={iconButtonElement} openDirection={"top-center"}>
            <MenuItem index={1}>
              <FloatingActionButton 
                      zDepth={5} 
                      tooltip="Settings" 
                      tooltipPosition="top-right"
                      style={{marginBottom:'5px'}}>
                <ActionSettings ref={"settings-1"} />
              </FloatingActionButton>
            </MenuItem>
            <MenuItem index={2}>
              <FloatingActionButton 
                      zDepth={5} 
                      tooltip="Settings" 
                      tooltipPosition="top-right"
                      style={{marginBottom:'5px'}}>
                <ActionSettings ref={"settings-1"} />
              </FloatingActionButton>
            </MenuItem>
            <MenuItem index={3}>
              <FloatingActionButton 
                      zDepth={5} 
                      tooltip="Settings" 
                      tooltipPosition="top-right"
                      style={{marginBottom:'5px'}}>
                <ActionSettings ref={"settings-1"} />
              </FloatingActionButton>
            </MenuItem>
            <MenuItem index={4}>
              <FloatingActionButton 
                      zDepth={5} 
                      tooltip="Settings" 
                      tooltipPosition="top-right"
                      style={{marginBottom:'5px'}}>
                <ActionSettings ref={"settings-1"} />
              </FloatingActionButton>
            </MenuItem>
            <MenuItem index={5}>
              <FloatingActionButton 
                      zDepth={5} 
                      tooltip="Settings" 
                      tooltipPosition="top-right"
                      style={{marginBottom:'5px'}}>
                <ActionSettings ref={"settings-1"} />
              </FloatingActionButton>
            </MenuItem>
          </IconMenu>
        
        </div>
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});

module.exports = Main;