let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let RaisedButton = mui.RaisedButton;
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

  render() {
    let menuItems = [
      // { route: 'get-started', text: 'Get Started' },
      // { route: 'customization', text: 'Customization' },
      // { route: 'components', text: 'Components' },
      // { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: MenuItem.Types.LINK,
         payload: '/notes',
         text: 'Notes'
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/cards/category/all',
         text: 'Cards'
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/courses',
         text: 'Courses'
      },
      {
         type: MenuItem.Types.LINK,
         payload: '/rob-roy-graph',
         text: 'Rob Roy Graph'
      },
      // {
      //    text: 'Disabled',
      //    disabled: true
      // },
      // {
      //    type: MenuItem.Types.LINK,
      //    payload: 'https://www.google.com',
      //    text: 'Disabled Link',
      //    disabled: true
      // },
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
            title=""
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            onLeftIconButtonTouchTap={this.toggleNav}
            isInitiallyOpen={true}
            zDepth={4} 
            style={{backgroundColor:ThemeManager.getCurrentTheme().component.appBar.backgroundColor}} />
        </header>
      </div>
    );
  }
});

module.exports = TopLeftNav;