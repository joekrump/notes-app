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
      value: 'complete',
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
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Complete" value="complete">
          <div className="col-sm-12">
            <CardList data={this.props.data.complete} />
          </div>
        </Tab>
        <Tab label="Incomplete" value="incomplete">
          <div className="col-sm-12">
            <CardList data={this.props.data.incomplete}  />
          </div>
        </Tab>
        <Tab label="All" value="all">
          <div className="col-sm-12">
            <CardList data={this.props.data.all}  />
          </div>
        </Tab>
      </Tabs>
    );
  }
}