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
let SearchField = require('./search');
let CardActionMenu = require('./card-action-menu');


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function sortEnglishByNameASC(a,b) {
  if (a.english < b.english)
    return -1;
  if (a.english > b.english)
    return 1;
  return 0;
}

function sortEnglishByNameDESC(a,b) {
  if (a.english > b.english)
    return -1;
  if (a.english < b.english)
    return 1;
  return 0;
}

function sortLatinByNameASC(a,b) {
  if (a.latin < b.latin)
    return -1;
  if (a.latin > b.latin)
    return 1;
  return 0;
}

function sortLatinByNameDESC(a,b) {
  if (a.latin > b.latin)
    return -1;
  if (a.latin < b.latin)
    return 1;
  return 0;
}

let CardPage = React.createClass({
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},
	getInitialState: function() {
	  return {
	  	cards: {
	  		all: {total: 0, data:[]},
	  		complete: {total: 0, data:[]},
	  		incomplete: {total: 0, data:[]}
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
	    currentCardType: 'complete',
	    language: 'latin'
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
  doSearch: function(queryText, cards){
      var matchingCards = [];
      var cardsToSearch = cards === undefined ? this.state.cards[this.state.currentCardType].data : cards;
      var currentLanguage = this.state.language;

      console.log(currentLanguage);
      console.log(cardsToSearch);
      console.log(queryText);

      if(queryText !== undefined && cardsToSearch !== undefined){
        cardsToSearch.forEach(function(card){
        	console.log(card.latin.toLowerCase())
        	console.log(queryText.toLowerCase())
        	// console.log(card.english.toLowerCase().indexOf(queryText.toLowerCase) );
        	// console.log(card.latin.toLowerCase().indexOf(queryText.toLowerCase) );
            if((currentLanguage === 'english' && card.english.toLowerCase().indexOf(queryText.toLowerCase()) != -1)
            	|| (currentLanguage === 'latin' && card.latin.toLowerCase().indexOf(queryText.toLowerCase()) != -1)){
            	matchingCards.push(card);
            }
        });
      }
      console.log("matching Cards:");
      console.log(matchingCards);

      if(this.state.cards[this.state.currentCardType].total > 0 && matchingCards.length > 0){
    		var currentCards = this.state.cards;
    		currentCards[this.state.currentCardType].data = matchingCards;
        this.setState({
          searchQuery: queryText, 
          cards: currentCards 
        });
      } 

      // return {
      //   searchQuery: queryText,
      //   cards: matchingCards
      // };
  },
  cardFilter: function(){

  },
  filterCards: function(cards) {
    // this.setState({
    //   fetchingCards: true
    // });
  },
  sortCards: function(cards) {
  	// TODO: Sort alphabetically 
  	//       - Latin & Enlish depending on current language set.
  	//       Sort by Lesson #
  	//       Sort by Category
  	//       
    var matchedCards;
    var hasQuery = false;

    if(!this.state.fetchingCards){
      this.setState({
        fetchingCards: true
      });
    }

    if(this.state.searchQuery !== undefined && this.state.searchQuery.trim()){
      var searchResults = this.doSearch(this.state.searchQuery, cards);
      hasQuery = true;
      matchedCards = searchResults.cards;

    } else if(this.state.cards[this.state.currentCardType].total === 0) {
      matchedCards = cards;
    } else {
      matchedCards = this.state.cards[this.state.currentType];
    }

    if(matchedCards.length > 0 && this.state.cards[this.state.currentType].total > 0){
      // TODO: UPDATE FROM HERE DOWN!!!!!!
      switch(this.state.sortOrder){
        case 'name_asc':
        	if(language === 'latin')
        		cards = matchedCards.sort(sortLatinByNameASC);
        	else
          	cards = matchedCards.sort(sortEnglishByNameASC);
          break;
        case 'name_desc':
          if(language === 'latin')
        		cards = matchedCards.sort(sortLatinByNameDESC);
        	else
          	cards = matchedCards.sort(sortEnglishByNameDESC);
          break;
        default:
          break;
      }
    } else {
      cards = matchedCards;
    }

    this.setState({
      fetchingCards: false,
      cards: cards,
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
									<SearchField query={this.state.searchQuery} doSearch={this.doSearch}/>
								</div>
								<div className="col-sm-6">
									<CardActionMenu />
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="row">
					<div className="col-sm-4">
						<h4>{this.state.cards.all.total + " cards"} <i>({this.state.cards.incomplete.total + " blank"})</i></h4>
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