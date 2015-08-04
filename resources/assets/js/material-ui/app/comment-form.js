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

    this.refs.author.setValue('');
    this.refs.text.setValue('');
    return;
  },

  render: function() {

    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div>
          <TextField style={{color: '#ffffff'}} hintText="Your name" ref="author" />
        </div>
        <div>
          <TextField style={{color: '#ffffff'}} hintText="Say something..." ref="text" />
        </div>
        <button type="submit">Post</button>
      </form>
    );
  }
});

module.exports = CommentForm;