/* resources/assets/js/material-ui/app/comment-box.js */
let React = require('react');
let CommentList = require('./comment-list');
let CommentForm = require('./comment-form');

let CommentBox = React.createClass({
  makeRequest: function(action, url) {
    var r = new XMLHttpRequest();
    r.open(action, url, true);
    r.onreadystatechange = function () {
      this.setState({data: JSON.parse(r.response)});
    }.bind(this);
    r.send(); // Send request
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.makeRequest('GET', this.props.url);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

module.exports = CommentBox;