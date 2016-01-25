let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;
let Menu = mui.Menu;
let MenuItem = mui.MenuItem;
let ThemeManager =mui.Styles.ThemeManager;
let Colors = mui.Styles.Colors;
let CustomColors = require('./styles/colors');
let CustomTheme = require('./styles/themes/custom1');
let SelectableMenuList = require('./selectable-menu-list');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let TopLeftNav = React.createClass({
  getInitialState: function() {
    return {
      novelValue: 'Rob Roy',
      currentPage: 'notes',
      muiTheme: this.context.muiTheme
    };
  },
  loadDefaultView: function(){

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
  handleNovelDropdownChange() {

  },
  render() {
    let currentPath = window.location.pathname;
    let navRight = this.props.navRight === undefined ? null : this.props.navRight;

    return (
      <div id="top-nav">
        <LeftNav 
          ref="leftNav" 
          docked={false} 
          zDepth={4}
          style={{backgroundColor: Colors.teal700, color: Colors.darkWhite}}
          >
          <SelectableMenuList />
        </LeftNav>
        <header>
          <AppBar
            title="Seminarium Adstator"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.toggleNav}
            isInitiallyOpen={false}
            zDepth={4} 
            style={{backgroundColor: Colors.tealA700, color: Colors.darkWhite}} />
            <div id="nav-top-right">
              {navRight}
            </div>
        </header>
      </div>
    );
  }
});

module.exports = TopLeftNav;