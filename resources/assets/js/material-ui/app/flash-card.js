// Import components
let React                = require ('react');
let mui                  = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let Colors               = mui.Styles.Colors;
let CustomColors         = require('./styles/colors');
let CustomTheme          = require('./styles/themes/custom1');
let FontIcon             = require('material-ui/lib/font-icon');
let IconButton           = require('material-ui/lib/icon-button');
let IconMenu             = require('material-ui/lib/menus/icon-menu');
let MenuItem             = require('material-ui/lib/menus/menu-item');
let Paper                = require('material-ui/lib/paper');
let NavigationMoreVert   = require('material-ui/lib/svg-icons/navigation/more-vert'); // svg icon

injectTapEventPlugin();

let ThemeManager         = new mui.Styles.ThemeManager();

let FlashCard = React.createClass({
  getInitialState: function() {
    return {
      id: 1,
      english: "test English",
      latin: "<ul><li>test Latin</li></ul>",
      origin: null,
      lesson_num: 3,
      current_language: 'latin'
    };
  },
  componentDidMount: function() {
    this.setState(
      {
        id: this.props.data.id,
        english: this.props.data.english,
        latin: this.props.data.latin,
        origin: this.props.data.origin,
        lesson_num: this.props.data.lesson_num
      }
    );
    window.addEventListener("toggleShowRecentOnly", this.handleShowRecentlyOnly, false);
  },
  render: function() {
    var rawLatinMarkup = this.props.data.latin;
    var rawWordOrigin = this.props.data.origin;
    var editLink = '/cards/' + this.props.data.id;
    var iconMenuButton = (
        <IconButton>
          <NavigationMoreVert ref={"menu-1"} />
        </IconButton>
    );
    
    return (
      <Paper zDepth={5} className={"card col-sm-4" + (this.props.data.english == null || this.props.data.english === undefined ? " empty" : "")} data-id={this.props.data.id}>
          <div className="row">
            <div className={"latin" + (this.state.current_language !== "latin" ? " not-showing" : "" + " col-sm-4")}>
              <a href={editLink} dangerouslySetInnerHTML={{__html: rawLatinMarkup}}></a>
            </div>
            <div className="col-sm-8">
              <div className="row">
                <div className="lesson-number col-sm-12">
                  <div className="pull-right">
                    {this.props.data.lesson_num}
                  </div>
                </div>
              </div>
              <div className={"english" + (this.state.current_language === "latin" ? " not-showing" : "" + " row")}>
                <div className="col-sm-12">
                  <div className="definition">
                    { this.props.data.english }
                  </div>
                </div>
              <div className="col-sm-12">
                  <div className="origin" dangerouslySetInnerHTML={{__html: rawWordOrigin}}></div>
                </div>
              </div>
            </div>
            <div className="actions">
              <IconMenu className="card-menu" color={Colors.black500} iconButtonElement={iconMenuButton} anchorOrigin={{vertical: "bottom", horizontal: "right"}} targetOrigin={{vertical: "top", horizontal: "left"}}>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
              </IconMenu>
            </div>
          </div>
      </Paper>
    );
  }
});

module.exports = FlashCard;