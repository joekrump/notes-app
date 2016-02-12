import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let SelectableList = SelectableContainerEnhance(List);
let GridOnIcon   = require('material-ui/lib/svg-icons/image/grid-on'); // svg icon
let EditIcon   = require('material-ui/lib/svg-icons/action/assignment'); // svg icon
let ListIcon   = require('material-ui/lib/svg-icons/action/list'); // svg icon

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {
        selectedIndex: window.location.pathname
      };
    },
    goToPage(url){
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
        leftIcon={<EditIcon color={Colors.deepOrange400} />}
        value={'/notes'}
        primaryText="Notes"
        style={{color: Colors.white}}/>
      <ListItem value={'/cards'}
        leftIcon={<GridOnIcon color={Colors.blueA200} />}
        primaryText="Cards"
        style={{color: Colors.white}}/>
      <ListItem value={'/courses'}
        leftIcon={<ListIcon color={Colors.amber400} />}
        primaryText="Courses"
        style={{color: Colors.white}}/>
    </SelectableList>
);

export default SelectableMenuList;