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

		if(this.props.data !== [] && this.props.data.data !== undefined){
			// DEBUG:
			// console.log("data: ");
			// console.log(this.props.data.data);
			flashCards = this.props.data.data.map(function (card, index) {
			  return (
			    <FlashCard data={card} key={card.id} />
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