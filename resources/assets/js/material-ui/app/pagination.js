let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let RaisedButton = mui.RaisedButton;
let FloatingActionButton = mui.FloatingActionButton;
let NavigationArrowForward   = require('material-ui/lib/svg-icons/navigation/arrow-forward'); // svg icon
let NavigationArrowBack   = require('material-ui/lib/svg-icons/navigation/arrow-back'); // svg icon
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Pagination = React.createClass({
	getInitialState: function() {
	  return {
	    currentFilter: 'complete',
      muiTheme: this.context.muiTheme,
	  };
	},
	componentDidMount: function() {
	  this.setListeners();
	},
	componentDidUpdate: function() {
	  // Do something if this component is updated.
	},
	componentWillUnmount: function(){
	  
	},
  setListeners: function(){

  },
  fetchPrevPage: function(){
  	// trigger event to get new page with details for prev page
  	window.dispatchEvent(new CustomEvent("getNewCardPage", { detail: { buttonType: 'prev'} }));
  },
  fetchNextPage: function() {
  	window.dispatchEvent(new CustomEvent("getNewCardPage", { detail: { buttonType: 'next'} }));
  },
  render: function () {
    var projectNodes  = null;
    var rightArrow = (<NavigationArrowForward ref={"pagination-prev"} />);
    var leftArrow = (<NavigationArrowBack ref={"pagination-next"}  />);

    return (
      <div>
        <RaisedButton secondary={true} label={leftArrow} onClick={this.fetchPrevPage} labelStyle={{top: '5px'}}/>
        <RaisedButton secondary={true} label={rightArrow} onClick={this.fetchNextPage} labelStyle={{top: '5px'}}/>
      </div>
    );
  }
});

module.exports = Pagination;