let React = require ('react');
let FlashCard = require('./flash-card');

let CardList = React.createClass({
	render: function(){
		var fakeCardData = {
			id: 1,
			english: "test English",
			latin: "<ul><li>test Latin</li></ul>",
			origin: null,
			lesson_num: 3
		};
		return (
			<div>
				<FlashCard data={fakeCardData} />
			</div>
		);
	}
});

module.exports = CardList;