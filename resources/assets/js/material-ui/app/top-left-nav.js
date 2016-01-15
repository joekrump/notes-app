let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;

let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let CustomColors = require('./styles/colors');
let CustomTheme = require('./styles/themes/custom1');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let TopLeftNav = React.createClass({
  getInitialState: function() {
    return {
      novelValue: 'Rob Roy',
      currentPage: 'notes'
    };
  },
  loadDefaultView: function(){

  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    ThemeManager.setTheme(CustomTheme);
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount() {
    ThemeManager.setTheme(CustomTheme);
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

    let menuItems = [
      {
         type: MenuItem.Types.LINK,
         payload: '/notes',
         text: 'Notes',
         active: (currentPath == '/notes')
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/cards/category/all',
         text: 'Cards',
         active: (currentPath == '/cards/category/all')
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/cards',
         text: 'React Cards',
         active: (currentPath == '/cards')
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/courses',
         text: 'Courses',
         active: (currentPath == '/courses')
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/rob-roy-graph',
         text: 'Rob Roy',
         active: (currentPath == '/rob-roy-graph')
      }
    ];

    return (
      <div>
        <LeftNav 
          ref="leftNav" 
          docked={false} 
          zDepth={4}
          menuItems={menuItems} />
        <header>
          <AppBar
            title="Seminarium Adstator"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.toggleNav}
            isInitiallyOpen={false}
            zDepth={4} 
            style={{backgroundColor:ThemeManager.getCurrentTheme().component.appBar.backgroundColor}} />
        </header>
      </div>
    );
  }
});

module.exports = TopLeftNav;