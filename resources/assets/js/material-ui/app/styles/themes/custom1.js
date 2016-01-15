let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ColorManipulator = mui.Utils.ColorManipulator;
let CustomColors = require('../colors');
let Spacing = mui.Styles.Spacing;

let Custom1 = {
  spacing: Spacing,
  contentFontFamily: 'Roboto, sans-serif',
  getPalette() {
    return {
      textColor: Colors.fullWhite,
      canvasColor: '#303030',
      borderColor:  ColorManipulator.fade(Colors.fullWhite, 0.3), //Colors.grey300
      disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
      primary1Color: Colors.teal500,
      primary2Color: Colors.teal900,
      primary3Color: Colors.tealA700,
      accent1Color: CustomColors.highlightYellow,
      accent2Color: CustomColors.highlightYellow,
      accent3Color: CustomColors.highlightYellow,
    };
  },
  getComponentThemes(palette) {
    let cardColor = Colors.grey900;
    let spacing = spacing || Spacing;
    return {
      appBar: {
        color: palette.primary1Color,
        textColor: Colors.darkWhite,
        height: spacing.desktopKeylineIncrement,
        backgroundColor: Colors.transparent,
        containerBackgroundColor: cardColor
      },
      avatar: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      floatingActionButton: {
        disabledColor: ColorManipulator.fade(palette.textColor, 0.12),
      },
      leftNav: {
        color: cardColor,
      },
      menu: {
        backgroundColor: cardColor,
        containerBackgroundColor: cardColor,
      },
      menuItem: {
        hoverColor: 'rgba(255, 255, 255, .03)',
      },
      menuSubheader: {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      paper: {
        backgroundColor: 'rgba(240, 217, 187, 0.9)',
      },
      raisedButton: {
        color: Colors.grey500,
      },
      toggle: {
        thumbOnColor: Colors.cyan200,
        thumbOffColor: Colors.grey400,
        thumbDisabledColor: Colors.grey800,
        thumbRequiredColor: Colors.cyan200,
        trackOnColor: ColorManipulator.fade(Colors.cyan200, 0.5),
        trackOffColor: 'rgba(255, 255, 255, 0.3)',
        trackDisabledColor: 'rgba(255, 255, 255, 0.1)',
      },
      refreshIndicator: {
        strokeColor: Colors.grey700,
        loadingStrokeColor: Colors.teal300,
      },
      slider: {
        trackColor: Colors.minBlack,
        handleColorZero: cardColor,
        handleFillColor: cardColor,
        selectionColor: Colors.cyan200,
      },
    };
  },
};

module.exports = Custom1;
