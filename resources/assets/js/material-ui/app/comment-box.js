/* resources/assets/js/material-ui/app/comment-box.js */
let React = require('react');
let CommentList = require('./comment-list');
let CommentForm = require('./comment-form');

let CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

module.exports = CommentBox;