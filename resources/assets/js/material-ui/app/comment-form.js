let React = require('react');
let mui = require('material-ui');
let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

let CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
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
        <RaisedButton label="Post" secondary={true} />
      </form>
    );
  }
});

module.exports = CommentForm;