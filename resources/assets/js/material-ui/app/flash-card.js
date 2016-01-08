//Import statement:
let React = require ('react');
let mui = require('material-ui');
let injectTapEventPlugin = require('react-tap-event-plugin');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let CustomColors = require('./styles/colors');
let CustomTheme = require('./styles/themes/custom1');
let IconButton = reqiore('material-ui/lib/icon-button');

injectTapEventPlugin();

let FlashCard = React.createClass({
  render: function() {
    var rawLatinMarkup = marked(this.props.data.latin.toString(), {sanitize: true});
    var rawWordOrigin = marked(this.props.data.origin.toString(), {sanitize: true});
    var editLink = '/cards/' + this.props.data.id;

    return (
      <div className={"card col-sm-4" + (this.props.data.english == null || this.props.data.english === undefined ? " empty" : "")} data-id={this.props.data.id}>
        <div className="row">
          <div className="latin {{ $show_latin ? '' : 'not-showing' }} col-sm-4">
            <a href={editLink} dangerouslySetInnerHTML={{__html: rawLatinMarkup}}></a>
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="lesson-number col-sm-12">
              <div className="pull-left">
                {this.props.data.lesson_num}
              </div>
            </div>
            </div>
            <div className={"english" + (this.state.currentLanguage === "latin" ? " not-showing" : "" + " row")}>
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
            <button className="btn btn-xs btn-success-inverse mark-complete" 
                  data-action="complete" 
                  data-id="{{ $card->id }}" 
                  data-current-page="{{$cards->currentPage()}}">&check;
            </button>
            <button className="btn btn-xs btn-danger btn-22 mark-incomplete" 
                  data-action="incomplete" 
                  data-id="{{ $card->id }}" 
                  data-current-page="{{$cards->currentPage()}}">&times;
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FlashCard;