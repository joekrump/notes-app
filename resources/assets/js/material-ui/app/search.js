import TextField from 'material-ui/lib/text-field';
let React = require ('react');
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let SearchAction = require('material-ui/lib/svg-icons/action/search'); // search svg icon (not currently used)

var isSearching = false;

var SearchField = React.createClass({
    doSearch:function(){
      // trigger event to get new page with details for prev page
      window.dispatchEvent(new CustomEvent("newSearch"));
      
      var query = this.refs.searchInput.getValue(); // this is the search text
      if(query.length > 1 && query.trim().length > 1){
        this.props.doSearch(query);
      } else if(query.length < 1 || query.trim().length < 1){
        this.props.doSearch(query);
      }
    },
    render:function(){
      return (
        <div>
          <TextField
            ref="searchInput"
            floatingLabelText="Search"
            floatingLabelStyle={{top: "10px", marginBottom: "0px", color: Colors.white}}
            inputStyle={{paddingTop: "0px"}}
            style={{height: "44px", marginRight: '10px'}}
            underlineFocusStyle={{borderColor: Colors.tealA700}} 
            underlineStyle={{borderColor: Colors.white}} 
            onChange={this.doSearch} />
        </div>
      );
    }
});

module.exports = SearchField;