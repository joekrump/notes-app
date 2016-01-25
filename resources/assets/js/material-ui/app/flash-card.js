// Import components
let React                = require ('react');
let mui                  = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let Colors               = mui.Styles.Colors;
let CustomColors         = require('./styles/colors');
let CustomTheme          = require('./styles/themes/custom1');
let FontIcon             = mui.FontIcon;
let IconButton           = mui.IconButton;
let FloatingActionButton = mui.FloatingActionButton;
let IconMenu             = require('material-ui/lib/menus/icon-menu');
let MenuItem             = require('material-ui/lib/menus/menu-item');
let Paper                = require('material-ui/lib/paper');
let NavigationMoreVert   = require('material-ui/lib/svg-icons/navigation/more-vert'); // svg icon
let AddIcon   = require('material-ui/lib/svg-icons/action/done'); // svg icon
let RemoveIcon   = require('material-ui/lib/svg-icons/content/remove'); // svg icon
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

injectTapEventPlugin();

let FlashCard = React.createClass({
  getInitialState: function() {
    return {
      id: 1,
      english: "test English",
      latin: "<ul><li>test Latin</li></ul>",
      origin: null,
      lesson_num: 3
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
  updateStatus: function(){
    var data = {
      _token: document.querySelector('meta[name="_token"]').getAttribute("content")
    };
    var statusNumber = this.props.data.marked_complete ? 0 : 1;
    // positive outcome assumption made
    window.dispatchEvent(new CustomEvent("cardStatusUpdated", { detail: { newStatusNumber: statusNumber, card: this.props.data }}));

    $.post('/cards/' + this.props.data.id + '/mark-as-complete/' + statusNumber, data, function(response){
      // fire event to say that marked_complete of this card has been changed to complete
    });
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
    var completeButton = (
      <FloatingActionButton onTouchTap={this.updateStatus} mini={true} backgroundColor={this.props.data.marked_complete ? Colors.redA700 : Colors.green600} tooltip="Incomplete">
        {this.props.data.marked_complete ? <RemoveIcon /> : <AddIcon />}
      </FloatingActionButton>
    );
    
    return (
      <ReactCSSTransitionGroup transitionName="cards" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500} transitionAppear={true}>
        <div className="col-sm-4">
          <div className="row">
            <Paper zDepth={5} className={"card col-sm-10 col-sm-offset-1 card-" + (this.props.cardNum % 4) + (this.props.data.english == null || this.props.data.english === undefined ? " empty" : "")} data-id={this.props.data.id}>
              <div className="row">
                <div className={"latin" + (this.props.activeLanguage !== "latin" ? " not-showing" : "") + " col-sm-4"}>
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
                  <div className={"english" + (this.props.activeLanguage === "latin" ? " not-showing" : "") + " row"}>
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
              </div>
                <div style={{position:'absolute', bottom: 10 + 'px', right: 10 + 'px'}}>
                  {completeButton}
                </div>
            </Paper>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = FlashCard;