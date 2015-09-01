let React = require('react');
let mui = require('material-ui');
let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let CustomColors = require('./styles/colors');

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
          <TextField 
            floatingLabelText="Name" 
            hintText="Your name" 
            underlineStyle={{borderColor:CustomColors.primary1}}
            ref="author" />
        </div>
        <div>
          <TextField 
            floatingLabelText="Comment" 
            hintText="Say something..." 
            underlineStyle={{borderColor:CustomColors.primary1}}
            ref="text" />
        </div>
        <div>
          <RaisedButton 
            type="submit" 
            label="Submit Comment" 
            zDepth={3} 
            primary={true} />
        </div>
      </form>
    );
  }
});

module.exports = CommentForm;