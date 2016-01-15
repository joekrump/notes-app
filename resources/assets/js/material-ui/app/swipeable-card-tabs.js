import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CardList from './card-list';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class SwipeableCardTabs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 'incomplete'
    };
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
    window.dispatchEvent(new CustomEvent("updateCurrentCardType", { detail: { cardType: value}}));
  }
  render() {
    return (
      <div>
        <Tabs
          value={this.props.value}
          onChange={this.handleChange}
        >
          <Tab label="Incomplete" value="incomplete"/>
          <Tab label="Complete" value="complete"/>
          <Tab label="All" value="all"/>
        </Tabs>
        <div className="col-sm-12" ref="tab-content">
          <CardList cards={this.props.cards} activeLanguage={this.props.activeLanguage} />
        </div>
      </div>
    );
  }
}