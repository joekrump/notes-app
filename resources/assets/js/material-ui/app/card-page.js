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
let Pagination = require('./pagination');

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
	  	cards: {
	  		all: [],
	  		complete: [],
	  		incomplete: []
	  	},
	    fetchingCards: false,
	    paginationPages: {
	    	all: {
	    		curr: 1,
	    		prev: null,
	    		first: null,
	    		next: null,
	    		last: null
	    	},
	    	complete: {
	    		curr: 1,
	    		prev: null,
	    		first: null,
	    		next: null,
	    		last: null
	    	},
	    	incomplete: {
	    		curr: 1,
	    		prev: null,
	    		first: null,
	    		next: null,
	    		last: null
	    	}
	    },
	    currentCardType: 'complete'
	  };
	},
	setListeners: function(){
    window.addEventListener("getNewCardPage", this.handleGetNewPage, false);
    window.addEventListener("updateCurrentCardType", this.updateCurrentCardType, false);
  },
  componentWillUnmount: function(){
    window.removeEventListener("getNewCardPage", this.handleGetNewPage, false);
    window.removeEventListener("updateCurrentCardType", this.updateCurrentCardType, false);
  },
  updateCurrentCardType: function(){
  	// console.log(event.detail.cardType);
  	this.setState({currentCardType: event.detail.cardType});
  	this.setPageNums(event.detail.cardType);
  },
  calcPageNums: function(cardType){
  	var stateCurrentPage = this.state.cards[cardType].current_page;
  	var stateLastPage = this.state.cards[cardType].last_page
  	var curr  = stateCurrentPage === undefined ? 1 : stateCurrentPage;
  	var last  = stateLastPage === undefined ? 1 : stateLastPage;
  	var next  = null;
  	var first = null;
  	var prev  = null;
  	// if current page is equal to last page then next page num is null and last page num is null
  	// 
  	if(curr == last){
  		last = null;
  	} else {
  		next = curr + 1;
  	}
  	
  	if(curr > 1) {
  		prev = curr - 1;
  		first = 1;
  	}
  	// // if current page # is 1 then previous page is null and first page is null
  	// else first page is 1 and previous page # is current page - 1
  	// 
  	return {
  		curr: curr,
  		prev: prev,
  		first: first,
  		next: next,
  		last: last 
  	};
  },
  setPageNums: function(cardType){
  	var currentPagination = this.state.paginationPages;
  	currentPagination[cardType] = this.calcPageNums(cardType);
  	this.setState({
  		paginationPages: currentPagination
  	});
  },
  // shouldComponentUpdate: function(nextProps, nextState){
  //   // No need to re-render the view when loading state changes.
  //   // if(nextState.loadingProjects !== this.state.loadingProjects){
  //   //   return false;
  //   // }
  //   return false;
  // },
  updateSortOrder: function(event){
    this.setState({
      sortOrder: event.detail.sortOrder
    });
    this.filterProjects();
  },
  doSearch: function(queryText, projects){

      var matchingProjects=[];
      var projectsToSearch  = projects === undefined ? this.state.filteredProjects : projects

      if(queryText !== undefined && projectsToSearch !== undefined){
        projectsToSearch.forEach(function(project){
            if(project.title.toLowerCase().indexOf(queryText.toLowerCase)!=-1)
            matchingProjects.push(project);
        });
      } else {
        matchingProjects = projectsToSearch;
      }

      if(this.state.filteredProjects.length > 0){
        this.setState({
          searchQuery: queryText, 
          projects: matchingProjects === undefined ? this.state.projects : matchingProjects 
        });
      } 

      return {
        searchQuery: queryText,
        projects: matchingProjects
      };
  },
  filterCards: function(cards) {
    this.setState({
      fetchingCards: true
    });
    var projectList = this;
    if(this.state.projects.length === 0){
      projects = projects.filter(function(project){ return projectList.projectFilter(project) });
    } else {
      projects = this.state.projects.filter(function(project){ return projectList.projectFilter(project) });
    }
   
    this.sortProjects(projects);
  },
  sortCards: function(projects) {
    var matchedProjects;
    var setFilteredProjects = false;
    var hasQuery = false;

    if(!this.state.loadingProjects){
      this.setState({
        loadingProjects: true
      });
    }

    if(this.state.searchQuery !== undefined && this.state.searchQuery.trim()){
      var searchResults = this.doSearch(this.state.searchQuery, projects);
      hasQuery = true;
      matchedProjects = searchResults.projects;

    } else if(this.state.filteredProjects.length === 0) {
      matchedProjects = projects;
      setFilteredProjects = true;
    } else {
      matchedProjects = this.state.projects
    }

    if(matchedProjects.length > 0 && this.state.filteredProjects.length > 0){
      switch(this.state.sortOrder){
        case 'name_asc':
          projects = matchedProjects.sort(sortByNameASC);
          break;
        case 'name_desc':
          projects = matchedProjects.sort(sortByNameDESC);
          break;
        default:
          break;
      }
    } else {
      projects = matchedProjects;
    }

    this.setState({
      loadingProjects: false,
      projects: projects,
      filteredProjects: setFilteredProjects ? matchedProjects : this.state.filteredProjects,
      searchQuery: hasQuery ? searchResults.searchQuery: this.state.searchQuery
    }); 
  },
	handleGetNewPage: function(){
		// console.log('clicked');
		if(!this.state.fetchingCards){
		  this.setState({fetchingCards: true});
		  var pageNum = this.state.paginationPages[this.state.currentCardType][event.detail.button_type];
		  // console.log("Page Num: " + pageNum);
		  $.ajax({
		    url: (this.props.src + '?tab_filter=' + this.state.currentCardType + '&page=' + pageNum),
		    dataType: 'json',
		    cache: false,
		    success: function(newPageOfCards) {
		    	// TODO: route needs to return just one set based on the card type. Right now all 3 (all, complete and incomplete are being returned.)
		    	var currentCards = this.state.cards;
		    	currentCards[this.state.currentCardType] = newPageOfCards;
		      this.setState({cards: currentCards});
		      // console.log(this.state.cards);
		      this.setState({fetchingCards: false});
		      this.setPageNums(this.state.currentCardType); // update what the current page is.
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
	        this.setState({
	        	cards: {
	        		all: JSON.parse(cards.all), 
	        		complete: JSON.parse(cards.complete), 
	        		incomplete: JSON.parse(cards.incomplete)
	        	},
	        	fetchingCards: false
	        });
	        this.setPageNums(this.state.currentCardType);
	        // console.log(this.state.cards);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.src, status, err.toString());
	        this.setState({fetchingCards: false});
	      }.bind(this) // bind(this) allows 'this' to keep it's context when being accessed within ajax callbacks.
	    });
	  }
	},
	componentDidMount: function() {
	  this.setListeners();
	  this.fetchCards();
	  // if (this.props.pollInterval !== undefined && this.props.pollInterval > 0) {
	    // setInterval(this.fetchCards, 5000);
	  // }
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
	render: function() {
		// console.log(this.state);
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
						<h3>{this.state.cards.all.length} cards</h3>
						<h3>{this.state.cards.incomplete.length} blank cards</h3>
					</div>
					<div className="col-sm-4 text-center">
						<Pagination />
					</div>
					<div className="col-sm-4 toggle-actions text-right">
						<button id="latin-english-btn" type="button" className="btn btn-primary" data-showing="latin">Latin</button>
					</div>
					<div className="col-sm-12">
						<SwipeableCardTabs data={this.state.cards}/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = CardPage;