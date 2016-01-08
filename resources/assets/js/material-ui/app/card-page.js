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
let CardList = require('./card-list');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let CardPage = React.createClass({
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
	render() {
		return (
			<div className="card-page">
				<CardList />
			</div>
		);
	}
});

module.exports = CardPage;