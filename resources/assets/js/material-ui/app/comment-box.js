/* resources/assets/js/material-ui/app/comment-box.js */
let React = require('react');
let CommentList = require('./comment-list');
let CommentForm = require('./comment-form');

let CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    var r = new XMLHttpRequest();
    r.open('GET', this.props.url, true);
    r.onreadystatechange = function () {
      if(r.response){
        this.setState({data: JSON.parse(r.response)});
      }
    }.bind(this);
    r.send(); // Send request
  },
  getInitialState: function() {
    return {data: []};
  },
  handleCommentSubmit: function(comment) {
    // Optimistic update
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    // Set Token
    var csrfToken = document.querySelector('meta[name="_token"]').getAttribute("content");
    var r = new XMLHttpRequest();
    console.log(csrfToken);
    r.open('POST', this.props.url, true);
    r.setRequestHeader('X-CSRF-Token',csrfToken);
    r.setRequestHeader('Content-Type', "application/json; charset=UTF-8");
    r.onreadystatechange = function () {
      this.setState({data: JSON.parse(r.response)});
    }.bind(this);

    r.send(JSON.stringify(comment)); // Send request
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
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