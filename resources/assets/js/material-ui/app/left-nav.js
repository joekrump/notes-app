let React              = require('react');
let mui                = require('material-ui');
let Colors             = mui.Styles.Colors;
let CustomTheme        = require('./styles/themes/custom1');
let LeftNav            = require('material-ui/lib/left-nav');
let SelectableMenuList = require('./selectable-menu-list');
let List               = require('material-ui/lib/lists/list');
let ListItem           = require('material-ui/lib/lists/list-item');
let ExitIcon           = require('material-ui/lib/svg-icons/action/exit-to-app'); // svg icon

export default class LeftNavUndocked extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  componentDidMount = () => {
    window.addEventListener("toggleLeftNav", this.handleToggle, false);
  }
  handleToggle = () => this.setState({open: !this.state.open});

  // handleClose = () => {
  //   this.setState({open: false});
  // }

  render() {

    return (
      <LeftNav
        docked={false}
        width={200}
        ref="leftNav" 
        className="left-nav"
        zDepth={4}
        open={this.state.open}
        onRequestChange={open => this.setState({open})}
        style={{backgroundColor: Colors.teal700, color: Colors.darkWhite}}
        >
        <SelectableMenuList />
        <List className="logout" style={{backgroundColor: Colors.teal700, width: '100%'}}>
          <ListItem 
            leftIcon={<ExitIcon color={Colors.darkWhite} />}
            value={'/logout'}
            primaryText="Logout"
            style={{backgroundColor: Colors.teal700, color: Colors.darkWhite}} />
        </List>
      </LeftNav>
    );
  }
}