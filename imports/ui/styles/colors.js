import {
cyan500, cyan700,
grey100, grey300, grey400, grey500,
pinkA200,
darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

export const dark_primary_color = '#7b1fa2';
export const primary_color = '#9c27b0';
export const light_primary_color = '#e1bee7';
export const pure_white = '#ffffff';
export const accent_color = '#7c4dff';
export const primary_text = '#212121';
export const secondary_text = '#727272';
export const divider_color = '#b6b6b6';
export const white = '#eeeeee';

export const muiTheme = {
    palette: {
      primary1Color: primary_color,
      primary2Color: dark_primary_color,
      primary3Color: light_primary_color,
      accent1Color: accent_color,
      accent2Color: secondary_text,
      accent3Color: divider_color,
      textColor: primary_text,
      alternateTextColor: pure_white,
      canvasColor: pure_white,
      borderColor: divider_color,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: primary_color,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
    appBar: {
    	height: 60,
  	},
  };
