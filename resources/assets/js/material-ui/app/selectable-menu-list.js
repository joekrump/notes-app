import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let mui = require('material-ui');
let Colors = mui.Styles.Colors;

let SelectableList = SelectableContainerEnhance(List);

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {
        selectedIndex: window.location.pathname
      };
    },
    goToPage(url){
      console.log(url);
      window.location = url;
    },
    handleUpdateSelectedIndex(e, index) {
      this.goToPage(index);
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent {...this.props} {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}} />
      );
    },
  });
  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

const SelectableMenuList = () => (
    <SelectableList
      value={window.location.pathname}
      style={{backgroundColor: Colors.transparent }}>
      <ListItem
        value={'/notes'}
        primaryText="Notes"
        style={{color: Colors.white}}/>
      <ListItem value={'/cards'}
        primaryText="Cards"
        style={{color: Colors.white}}/>
      <ListItem value={'/courses'}
        primaryText="Courses"
        style={{color: Colors.white}}/>
    </SelectableList>
);

export default SelectableMenuList;