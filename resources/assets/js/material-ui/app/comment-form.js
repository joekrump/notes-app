let React = require('react');
let mui = require('material-ui');
let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();


let CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.state.hasValue;
    var text = this.refs.text.state.hasValue;

    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});

    this.refs.author.setState({});
    this.refs.text.setState({});
    return;
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div>
          <TextField hintText="Your name" ref="author" />
        </div>
        <div>
          <TextField hintText="Say something..." ref="text" />
        </div>
        <button type="submit">Post</button>
      </form>
    );
  }
});

module.exports = CommentForm;