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

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.cyan600
    });
  },

  render: function() {

    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div>
          <TextField 
            style={{color:Colors.white600}} 
            floatingLabelText="Name" 
            hintText="Your name" 
            underlineStyle={{borderColor:Colors.cyan600}}
            inputStyle={{color:Colors.white600}}
            ref="author" />
        </div>
        <div>
          <TextField 
            style={{color:Colors.white600}} 
            floatingLabelText="Comment" 
            hintText="Say something..." 
            underlineStyle={{borderColor:Colors.cyan600}}
            inputStyle={{color:Colors.white600}}
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