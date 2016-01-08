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
let SwipeableCardTabs = require('./swipeable-card-tabs');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let CardPage = React.createClass({
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},
	getInitialState: function() {
	  return {
	    cards: [],
	    filteredProjects: [],
	    fetchingCards: false,
	    paginationPages: {
	    	all: 1,
	    	complete: 1,
	    	incomplete: 1
	    }
	  };
	},
	setListeners: function(){
    window.addEventListener("getNewPage", this.handleGetNewPage, false);
  },
  componentWillUnmount: function(){
    window.removeEventListener("getNewPage", this.handleGetNewPage, false);
  },
  updatePageNum: function(tabFilter, pageNum){
  	var specificPageCount;
  	var currentPagination = this.state.paginationPages;
  	console.log(currentPagination);
  	currentPagination[tabFilter] = pageNum;
  	this.setState(
			{
				paginationPages: currentPagination
			}
  	);
  	console.log(this.state.paginationPages);
  },
  getNextPage: function(){
  	console.log('clicked');
  	window.dispatchEvent(new CustomEvent("getNewPage", { detail: { tabFilter: 'all', pageNum: 2 } }));
  },
	handleGetNewPage: function(){
		console.log('clicked');
		if(!this.state.fetchingCards){
		  this.setState({fetchingCards: true});
		  this.updatePageNum(event.detail.tabFilter, event.detail.pageNum);
		  var tabFilter = event.detail.tabFilter;
		  $.ajax({
		    url: (this.props.src + '/' + event.detail.tabFilter + '?page=' + event.detail.pageNum),
		    dataType: 'json',
		    cache: false,
		    success: function(cards) {
		    	var currentCards = this.state.cards;
		    	currentCards[tabFilter] = cards;
		      this.setState({cards: currentCards});
		      console.log(this.state.cards);
		      this.setState({fetchingCards: false});
		    }.bind(this),
		    error: function(xhr, status, err) {
		      console.error(this.props.src, status, err.toString());
		      this.setState({fetchingCards: false});
		    }.bind(this) // bind(this) allows this to keep it's context when being accessed within ajax callbacks.
		  });
		}
	},
	fetchCards: function(){

	  if(!this.state.fetchingCards){
	    this.setState({fetchingCards: true});

	    $.ajax({
	      url: this.props.src,
	      dataType: 'json',
	      cache: false,
	      success: function(cards) {
	        this.setState({cards: {all: JSON.parse(cards.all), complete: JSON.parse(cards.complete), incomplete: JSON.parse(cards.incomplete)}});
	        console.log(this.state.cards);
	        this.setState({fetchingCards: false});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.src, status, err.toString());
	        this.setState({fetchingCards: false});
	      }.bind(this) // bind(this) allows this to keep it's context when being accessed within ajax callbacks.
	    });
	  }
	},
	componentDidMount: function() {
	  this.setListeners();
	  this.fetchCards();
	  if (this.props.pollInterval !== undefined && this.props.pollInterval > 0) {
	    setInterval(this.fetchCards, this.props.pollInterval);
	  }
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
			<div>
				<header className="page-header">
				    <div className="row">
				        <div className="col-sm-6">
				            <h1>Cards</h1>
				        </div>
				        
				        <div className="col-sm-6">

				            <div className="row pull-right">

				                <div className="col-sm-6">
				                    <input id="search" className="form-control" name='search' placeholder="Search" data-url="/cards/search/" />
				                </div>
				                <div className="col-sm-6">
				                    <div className="btn-group pull-right">
				                        
				                        <a href="/cards/category/all" className="btn btn-default">All Cards</a>
				                        <a href='/cards/new' className="btn btn-success-inverse">New Card</a>
				                    </div>
				                </div>
				            </div>
				            
				        </div>
				    </div>
				    
				</header>
				<div className="row">
				    <div className="col-sm-4">
				        <h3># cards total</h3>
				        <h3># blank cards</h3>
				    </div>
				    <div className="col-sm-4 text-center">
				        Pagination links...
				        <div onClick={this.getNextPage}>
				        	TEST NEXT PAGINATE BUTTON
				        </div>
				    </div>
				    <div className="col-sm-4 toggle-actions text-right">
				        <button id="latin-english-btn" type="button" className="btn btn-primary" data-showing="latin">Latin</button>
				    </div>
				    <div className="col-sm-12">
				    	<SwipeableCardTabs />
				    </div>
				</div>
			</div>
		);
	}
});

module.exports = CardPage;