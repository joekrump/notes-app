let React = require('react');

let CommentList = React.createClass({
  render: function() {
    return (
      var commentNodes = this.props.data.map(function (comment) {
        return (
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    );
  }
});

module.exports = CommentList;