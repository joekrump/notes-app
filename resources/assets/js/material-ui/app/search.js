import TextField from 'material-ui/lib/text-field';

let SearchAction = require('material-ui/lib/svg-icons/action/search'); // svg icon

var SearchField = React.createClass({
    doSearch:function(){
        var query= this.refs.searchInput.getValue(); // this is the search text
        console.log(query);
        this.props.doSearch(query);
    },
    render:function(){
        return (
          <div>
            <SearchAction ref={"top-search-icon"} />
            <TextField
              ref="searchInput"
              floatingLabelText="Search"
              floatingLabelStyle={{color: Colors.amber900}}
              underlineFocusStyle={{borderColor: Colors.amber900}} 
              onChange={this.doSearch}/>
          </div>
        );
    }
});

module.exports = SearchField;