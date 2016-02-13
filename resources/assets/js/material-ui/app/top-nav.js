let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let AppBar = mui.AppBar;
let ThemeManager = mui.Styles.ThemeManager;
let Colors = mui.Styles.Colors;
let CustomTheme = require('./styles/themes/custom1');
let LeftNavUndocked = require('./left-nav');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let TopNav = React.createClass({
  getInitialState: function() {
    return {
      novelValue: 'Rob Roy',
      currentPage: 'notes',
      leftNavOpen: false,
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
  toggleLeftNav(e) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("toggleLeftNav"));
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },
  render() {
    let currentPath = window.location.pathname;
    let navRight = this.props.navRight === undefined ? null : this.props.navRight;

    return (
      <div id="top-nav">
        <LeftNavUndocked/>
        <header>
          <AppBar
            title="Adiūtor"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.toggleLeftNav}
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

module.exports = TopNav;