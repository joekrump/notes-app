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

    return (
      <div>
        <RaisedButton secondary={true} onClick={this.fetchPrevPage}>
          <NavigationArrowBack ref={"pagination-next"} />
        </RaisedButton>
        <RaisedButton secondary={true} onClick={this.fetchNextPage}>
          <NavigationArrowForward ref={"pagination-prev"} />
        </RaisedButton>
      </div>
    );
  }
});

module.exports = Pagination;