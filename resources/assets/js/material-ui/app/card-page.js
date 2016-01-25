let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;
let ThemeManager = mui.Styles.ThemeManager;
let Colors = mui.Styles.Colors;
let CustomColors = require('./styles/colors');
let CustomTheme = require('./styles/themes/custom1');
let SwipeableCardTabs = require('./swipeable-card-tabs');
let Pagination = require('./pagination');
let SearchField = require('./search');
let CardActionMenu = require('./card-action-menu');
let RadioButton = require('material-ui/lib/radio-button');
let RadioButtonGroup = require('material-ui/lib/radio-button-group');
let TopLeftNav = require('./top-left-nav');
let RaisedButton = mui.RaisedButton;
let SortBar = require('./sort-bar');
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

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
	childContextTypes : {
    muiTheme: React.PropTypes.object,
  },
  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },
	getInitialState() {
	  return {
	  	cards: {
	  		all: {total: 0, data:[]},
	  		complete: {total: 0, data:[]},
	  		incomplete: {total: 0, data:[]},
	  		currentPage: [],
        savedPage: [] // Stores a backup copy of the current page to quickly restore a previous page.
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
	    cardsPerPage: 9,
      muiTheme: ThemeManager.getMuiTheme(CustomTheme)
	  };
	},
	setListeners(){
    window.addEventListener("getNewCardPage", this.updatePagination, false);
    window.addEventListener("updateCurrentCardType", this.updateCurrentCardType, false);
    window.addEventListener("newSearch", this.updateIsSearching, false);
    window.addEventListener("cardStatusUpdated", this.updateDecks, false);
  },
  componentWillUnmount(){
    window.removeEventListener("getNewCardPage", this.updatePagination, false);
    window.removeEventListener("updateCurrentCardType", this.updateCurrentCardType, false);
    window.removeEventListener("newSearch", this.updateIsSearching, false);
    window.removeEventListener("cardStatusUpdated", this.updateDecks, false);
  },
  updateIsSearching(){
    // isSearching = !isSearching;
    // console.log('searching...');
  },
  updateDecks(){
    var deckNames = ['complete', 'incomplete', 'all'];
    var cardsCopy = this.state.cards;
    var index = cardsCopy[this.state.currentCardType].data.indexOf(event.detail.card);
    var cardCopy = event.detail.card;
    var allCardsIndex = cardsCopy['all'].data.indexOf(cardCopy);
    cardCopy.marked_complete = event.detail.newStatusNumber;
    var currentDeck = cardsCopy[this.state.currentCardType];
    var indexOfCurrentDeckName = deckNames.indexOf(this.state.currentCardType);

    if(indexOfCurrentDeckName < (deckNames.length - 1)){
      var temp = deckNames.slice(0, indexOfCurrentDeckName);
      deckNames = temp.concat(deckNames.slice(indexOfCurrentDeckName + 1));
    } else {
      deckNames.slice(0, indexOfCurrentDeckName);
    }
    // update the current deck
    if(index != -1){
      console.log(index);
      if(this.state.currentCardType !== 'all'){
        var newCards;
        if(index < (cardsCopy[this.state.currentCardType].data.length - 1)){
          var tempArray = currentDeck.data.slice(0,index);
          newCards = tempArray.concat(currentDeck.data.slice(index+1)); 
        } else {
          console.log('was last card');
          newCards = currentDeck.data.slice(0,index);
        }
        cardsCopy[this.state.currentCardType].data = newCards;
      } else {
        cardsCopy['all'].data.push(cardCopy);
      }
    } else {
      console.warn("couldn't find the card... that is weird.");
    }
    // update the other decks
    deckNames.map(function (name, index) {
      if(name !== 'all'){
        cardsCopy[name].data.push(cardCopy);
      } else {
        
        if(allCardsIndex != -1){
          cardsCopy['all'].data[allCardsIndex] = cardCopy;
        } else {
          console.warn("Couldn't find the card :(");
        } 
      }
      return 0;
    });
    // set updated total counts
    cardsCopy.incomplete.total = cardsCopy.incomplete.data.length;
    cardsCopy.complete.total = cardsCopy.complete.data.length;

    console.log(this.state.paginationPages[this.state.currentCardType].curr);
    this.updateCurrentPage(this.state.currentCardType, this.state.paginationPages[this.state.currentCardType].curr, cardsCopy);
  },
  updatePagination(){
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
  updateCurrentCardType(){
  	// console.log(event.detail.cardType);
  	this.setState({currentCardType: event.detail.cardType});
    // A type update will also involve changing the set of cards displayed on the page.
    this.updateCurrentPage(event.detail.cardType, this.state.paginationPages[event.detail.cardType].curr);
  },
  updateCurrentPage(cardType, currentPageNum, currentCards){
    var stateCards = currentCards === undefined ? this.state.cards : currentCards;
    var cardsForCurrentType = stateCards[cardType];
    var cardRangeStart = (currentPageNum * this.state.cardsPerPage) - this.state.cardsPerPage;
    var cardRangeEnd = currentPageNum * this.state.cardsPerPage;
    
    // If the lastCard is high than the total number of cards, then just grab all cards from the starting card to the end.
    if(cardRangeEnd > cardsForCurrentType.total){
      stateCards.currentPage = stateCards[cardType].data.slice(cardRangeStart);
    } else {
      stateCards.currentPage = stateCards[cardType].data.slice(cardRangeStart, cardRangeEnd);
    }
    // Update the saved page as well in case we need to return to it.
    stateCards.savedPage = stateCards.currentPage;

    this.setState({
      cards: stateCards
    });
  },
  calcPageNums(cardType, currentPageNum){
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
  setPageNums(cardType, currentPageNum){
  	var currentPagination = this.state.paginationPages;
  	currentPagination[cardType] = this.calcPageNums(cardType, currentPageNum);
  	this.setState({
  		paginationPages: currentPagination
  	});
  },
  updateSortOrder(event){
    this.setState({
      sortOrder: event.detail.sortOrder
    });
    this.filterProjects();
  },
  doSearch(queryText, cards){
    var matchingCards = [];
    var cardsToSearch = cards === undefined ? this.state.cards[this.state.currentCardType].data : cards;
    var currentLanguage = this.state.activeLanguage;

    // console.log(currentLanguage);
    // console.log(cardsToSearch);
    console.log(queryText);
    console.log(queryText.trim().length);

    if(queryText !== undefined && cardsToSearch !== undefined){
      if(queryText.trim().length < 1){
        var cardsCopy = this.state.cards;
        cardsCopy.currentPage = this.state.cards.savedPage;
        this.setState({cards: cardsCopy});
        return 0;
      }
      cardsToSearch.forEach(function(card){
        if((currentLanguage === 'english' && card.english.toLowerCase().indexOf(queryText.toLowerCase()) != -1)){
          matchingCards.push(card);
        } else if((currentLanguage === 'latin' && card.latin.toLowerCase().indexOf(queryText.toLowerCase()) != -1)) {
          matchingCards.push(card);
        }
      });

      if(this.state.cards[this.state.currentCardType].total > 0 && matchingCards.length > 0){
        var cardsCopy = this.state.cards;
        if(currentLanguage == 'latin'){
          cardsCopy.currentPage = matchingCards.sort(sortLatinByNameASC);
        } else if(currentLanguage == 'english'){
          cardsCopy.currentPage = matchingCards.sort(sortEnglishByNameASC);
        }
        
        this.setState({
          searchQuery: queryText, 
          cards: cardsCopy 
        });
      } 
    }
  },
  cardFilter(){

  },
  filterCards(cards) {
    // this.setState({
    //   fetchingCards: true
    // });
  },
  sortCards(cards) {
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
	fetchCards(){

	  if(!this.state.fetchingCards){
	    this.setState({fetchingCards: true});

	    $.ajax({
	      url: this.props.src,
	      dataType: 'json',
	      cache: false,
	      success: function(cards) {
	      	var incompleteCards = cards.incomplete;
          var currentPageCards =  incompleteCards.data.slice(0,9);
	        this.setState({
	        	cards: {
	        		all: cards.all, 
	        		complete: cards.complete, 
	        		incomplete: incompleteCards,
	        		currentPage: currentPageCards,
              savedPage: currentPageCards
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
  shuffleArray(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  shuffleCards(){
    console.log('shuffling cards');
    var cards = this.state.cards;
    cards[this.state.currentCardType].data = this.shuffleArray(this.state.cards[this.state.currentCardType].data);
    this.setState({
      cards: cards
    });
    this.updateCurrentPage(this.state.currentCardType, 1, cards);
  },
	componentDidMount() {
	  this.setListeners();
	  this.fetchCards();
	},
	render() {
    
    var tabsData = {
      incomplete: {
        total: this.state.cards.incomplete.total
      },
      complete: {
        total: this.state.cards.complete.total
      }
    };
    var navRight = (
      <div key="top-right-nav">
        <a href='/cards/new' key="new-card-button-top" className="btn btn-success pull-right">New Card</a>
        <div className="pull-right">
          <SearchField key="top-search-input" query={this.state.searchQuery} doSearch={this.doSearch}/>
        </div>
      </div>
    );
		return (
      <div>
        <TopLeftNav navRight={navRight} />
        <div className="background"></div>
  			<div id="card-page" className="container container-fluid">
  				<div className="row">
            <div className="col-sm-4">
              <h1>Cards</h1>
            </div>
  					<div className="col-sm-4 text-center">
  						<Pagination cardsPerPage={this.state.cardsPerPage} />
  					</div>
            <div className="col-sm-4">
              <RadioButtonGroup name="activeLanguage" defaultSelected="latin" onChange={this.toggleActiveLanguage} style={{marginTop: "5px", width:"default", float: 'right'}}>
                  <RadioButton
                    value="latin"
                    label="Latin"
                    style={{marginBottom:16, marginRight: "15px", width: "default", display: "inline-block"}}/>
                  <RadioButton
                    value="english"
                    label="English"
                    style={{marginBottom:16, width: "default", display: "inline-block"}} />
              </RadioButtonGroup>
              <RaisedButton label="Shuffle Cards" primary={true} onTouchTap={this.shuffleCards} style={{float:'right', marginRight: '15px'}}/>
            </div>
  					<div className="col-sm-12">
  						<SwipeableCardTabs cards={this.state.cards.currentPage} data={tabsData} activeLanguage={this.state.activeLanguage}/>
  					</div>
  				</div>
  			</div>
      </div>
		);
	}
});

module.exports = CardPage;