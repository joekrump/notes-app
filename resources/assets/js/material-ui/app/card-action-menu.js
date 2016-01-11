import TextField from 'material-ui/lib/text-field';
let React = require ('react');
let mui = require('material-ui');
let Colors = mui.Styles.Colors;

var CardActionMenu = React.createClass({
    render:function(){
        return (
          <div className="btn-group pull-right">
            <a href='/cards/new' className="btn btn-success-inverse">New Card</a>
          </div>
        );
    }
});

module.exports = CardActionMenu;