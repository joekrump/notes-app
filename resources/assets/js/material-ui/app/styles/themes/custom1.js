let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ColorManipulator = mui.Utils.ColorManipulator;
let CustomColors = require('../colors');
let Spacing = mui.Styles.Spacing;

let Custom1 = {
  spacing: Spacing,
  contentFontFamily: 'Roboto, sans-serif',
  palette: {
    textColor: Colors.fullWhite,
    canvasColor: '#303030',
    borderColor:  ColorManipulator.fade(Colors.fullWhite, 0.3), //Colors.grey300
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    primary1Color: Colors.lightBlue600,
    primary2Color: Colors.lightBlue500,
    primary3Color: Colors.lightBlue600,
    secondary1Color: Colors.cyanA700,
    secondary2Color: Colors.cyan900,
    secondary3Color: Colors.cyanA700,
    accent1Color: Colors.amber900,
    accent2Color: Colors.amber900,
    accent3Color: Colors.amber900,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
  },
  appBar: {
    color: Colors.blue600,
    textColor: Colors.darkWhite,
    height: Spacing.desktopKeylineIncrement,
    backgroundColor: Colors.transparent
  },
  avatar: {
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  floatingActionButton: {
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
  },
  leftNav: {
    color: Colors.white,
  },
  paper: {
    backgroundColor: 'rgba(240, 217, 187, 0.9)',
  },
  raisedButton: {
    color: Colors.grey500,
  },
  toggle: {
    thumbOnColor: Colors.cyan400,
    thumbOffColor: Colors.grey400,
    thumbDisabledColor: Colors.grey800,
    thumbRequiredColor: Colors.cyan400,
    trackOnColor: ColorManipulator.fade(Colors.cyan400, 0.6),
    trackOffColor: 'rgba(255, 255, 255, 0.3)',
    trackDisabledColor: 'rgba(255, 255, 255, 0.1)',
  },
  refreshIndicator: {
    strokeColor: Colors.grey700,
    loadingStrokeColor: Colors.teal300,
  },
  slider: {
    trackColor: Colors.minBlack,
    selectionColor: Colors.cyan400,
  }
};

module.exports = Custom1;
