let React = require('react');
let Comment = require('./comment')

let CommentList = React.createClass({
  render: function() {
    let count = 1;
    let commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment key={count++} author={comment.author}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

module.exports = CommentList;