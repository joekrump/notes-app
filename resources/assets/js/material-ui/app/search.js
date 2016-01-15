import TextField from 'material-ui/lib/text-field';
let React = require ('react');
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let SearchAction = require('material-ui/lib/svg-icons/action/search'); // search svg icon (not currently used)

var SearchField = React.createClass({
    doSearch:function(){
        var query= this.refs.searchInput.getValue(); // this is the search text
        console.log(query);
        this.props.doSearch(query);
    },
    render:function(){
        return (
          <div>
            <TextField
              ref="searchInput"
              floatingLabelText="Search"
              floatingLabelStyle={{color: Colors.highlightYellow}}
              underlineFocusStyle={{borderColor: Colors.highlightYellow}} 
              onChange={this.doSearch}/>
          </div>
        );
    }
});

module.exports = SearchField;