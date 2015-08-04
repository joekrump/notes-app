/* resources/assets/js/material-ui/app/comment-box.js */
let React = require('react');
let CommentList = require('./comment-list');
let CommentForm = require('./comment-form');

let CommentBox = React.createClass({
  loadCommentsFromServer: function(action, url) {
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
  handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
  },
  componentDidMount: function() {
    this.loadCommentsFromServer('GET', this.props.url);
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

module.exports = CommentBox;