import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CardList from './card-list';
import Badge from 'material-ui/lib/badge';
import Colors from 'material-ui/lib/styles/colors';

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
      value: 'incomplete',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
    window.dispatchEvent(new CustomEvent("updateCurrentCardType", { detail: { cardType: value}}));
  }
  render() {
    let label1 = (
      <Badge
            badgeContent={this.props.data.incomplete.total}
            secondary={true}
            badgeStyle={{top: 10, right: -8, backgroundColor: Colors.orangeA700, width: '28px', height: '28px'}}
          >
          <div>Incomplete</div>
      </Badge>
      );
    let label2 = (
      <Badge
            badgeContent={this.props.data.complete.total}
            secondary={true}
            badgeStyle={{top: 10, right: -8, backgroundColor: Colors.lightBlueA700, width: '28px', height: '28px'}}
          >
          <div>Complete</div>
      </Badge>
      );

    return (
      <div>
        <Tabs
          value={this.props.value}
          onChange={this.handleChange}
        >
          <Tab value="incomplete" label={label1} />
          <Tab value="complete" label={label2}/>
          <Tab label="All" value="all"/>
        </Tabs>
        <div className="col-sm-12" ref="tab-content">
          <CardList cards={this.props.cards} activeLanguage={this.props.activeLanguage} />
        </div>
      </div>
    );
  }
}