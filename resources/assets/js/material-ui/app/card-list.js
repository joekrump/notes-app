let React = require ('react');
let FlashCard = require('./flash-card');

let CardList = React.createClass({
	getInitialState: function() {
	  return {};
	},
	componentDidMount: function() {
	  // this.setState({
	  //   cards: this.props.data
	  // });
	},
	render: function(){
		var flashCards = null;
		var activeLanguage = this.props.activeLanguage;

		if(this.props.cards !== [] && this.props.cards !== undefined){
			// DEBUG:
			// console.log("data: ");
			// console.log(this.props.data.data);
			flashCards = this.props.cards.map(function (card, index) {
			  return (
			    <FlashCard data={card} key={card.id} activeLanguage={activeLanguage} cardNum={index + 1}/>
			  );
			}.bind(this));
		}

		return (
			<div className="row">
				{flashCards}
			</div>
		);
	}
});

module.exports = CardList;