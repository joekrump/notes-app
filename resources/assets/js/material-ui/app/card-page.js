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
let RadioButton = require('material-ui/lib/radio-button');
let RadioButtonGroup =require('material-ui/lib/radio-button-group');


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
	  		incomplete: {total: 0, data:[]},
	  		currentPage: []
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
	    currentCardType: 'incomplete',
	    activeLanguage: 'latin',
	    cardsPerPage: 9
	  };
	},
	setListeners: function(){
    window.addEventListener("getNewCardPage", this.updatePagination, false);
    window.addEventListener("updateCurrentCardType", this.updateCurrentCardType, false);
  },
  componentWillUnmount: function(){
    window.removeEventListener("getNewCardPage", this.updatePagination, false);
    window.removeEventListener("updateCurrentCardType", this.updateCurrentCardType, false);
  },
  updatePagination: function(){
    var buttonType = event.detail.buttonType;
    var newCurrentPageNum = this.state.paginationPages[this.state.currentCardType].curr;

    if(buttonType == 'next'){
      newCurrentPageNum += 1;
      if(newCurrentPageNum > this.state.cards[this.state.currentCardType].last_page){
        newCurrentPageNum = 1;
      }
    } else if(buttonType == 'prev'){
      newCurrentPageNum -= 1;
      if(newCurrentPageNum === 0){
        newCurrentPageNum = this.state.cards[this.state.currentCardType].last_page;
      }
    }

    this.setPageNums(this.state.currentCardType, newCurrentPageNum);
    // Get new currentPage contents
    this.updateCurrentPage(this.state.currentCardType, newCurrentPageNum);
  },
  updateCurrentCardType: function(){
  	// console.log(event.detail.cardType);
  	this.setState({currentCardType: event.detail.cardType});
    // A type update will also involve changing the set of cards displayed on the page.
    this.updateCurrentPage(event.detail.cardType, this.state.paginationPages[event.detail.cardType].curr);
  },
  updateCurrentPage: function(cardType, currentPageNum){
    var stateCards = this.state.cards;
    var cardsForCurrentType = stateCards[cardType];
    var cardRangeStart = (currentPageNum * this.state.cardsPerPage) - this.state.cardsPerPage;
    var cardRangeEnd = currentPageNum * this.state.cardsPerPage;
    
    // If the lastCard is high than the total number of cards, then just grab all cards from the starting card to the end.
    if(cardRangeEnd > cardsForCurrentType.total){
      stateCards.currentPage = stateCards[cardType].data.slice(cardRangeStart);
    } else {
      stateCards.currentPage = stateCards[cardType].data.slice(cardRangeStart, cardRangeEnd);
    }

    this.setState({
      cards: stateCards
    });
  },
  calcPageNums: function(cardType, currentPageNum){
  	var stateCurrentPage = currentPageNum;
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
  setPageNums: function(cardType, currentPageNum){
  	var currentPagination = this.state.paginationPages;
  	currentPagination[cardType] = this.calcPageNums(cardType, currentPageNum);
  	this.setState({
  		paginationPages: currentPagination
  	});
  },
  updateSortOrder: function(event){
    this.setState({
      sortOrder: event.detail.sortOrder
    });
    this.filterProjects();
  },
  doSearch: function(queryText, cards){
      var matchingCards = [];
      var cardsToSearch = cards === undefined ? this.state.cards[this.state.currentCardType].data : cards;
      var currentLanguage = this.state.activeLanguage;

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
	fetchCards: function(){

	  if(!this.state.fetchingCards){
	    this.setState({fetchingCards: true});

	    $.ajax({
	      url: this.props.src,
	      dataType: 'json',
	      cache: false,
	      success: function(cards) {
	      	var incompleteCards = cards.incomplete;

	        this.setState({
	        	cards: {
	        		all: cards.all, 
	        		complete: cards.complete, 
	        		incomplete: incompleteCards,
	        		currentPage: incompleteCards.data.slice(0,9)
	        	},
	        	fetchingCards: false
	        });
	        this.setPageNums(this.state.currentCardType, this.state.paginationPages[this.state.currentCardType].curr);
	        // console.log(this.state.cards);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.src, status, err.toString());
	        this.setState({fetchingCards: false});
	      }.bind(this) // bind(this) allows 'this' to keep it's context when being accessed within ajax callbacks.
	    });
	  }
	},
	toggleActiveLanguage(event, selectedValue){
		this.setState({
			activeLanguage: selectedValue
		});
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
						<Pagination cardsPerPage={this.state.cardsPerPage} />
					</div>
					<div className="col-sm-4">
							<RadioButtonGroup name="activeLanguage" defaultSelected="latin" onChange={this.toggleActiveLanguage}>
									<RadioButton
									  value="latin"
									  label="Latin"
									  style={{marginBottom:16}}/>
									<RadioButton
									  value="english"
									  label="English"
									  style={{marginBottom:16}} />
							</RadioButtonGroup>
					</div>
					<div className="col-sm-12">
						<SwipeableCardTabs cards={this.state.cards.currentPage} activeLanguage={this.state.activeLanguage} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = CardPage;