import { responsive } from './helper';
import {Platform} from 'react-native';

export const typos = Platform.OS === "android" ? {
  // LARGE_TITLE: { fontSize: responsive(34), fontFamily: 'Montserrat-Black' },
  // TITLE: { fontSize: responsive(28), fontFamily: 'Montserrat-Black' },
  TITLE_REGULAR: { fontSize: responsive(28), fontFamily: 'Montserrat-Regular' },
  // HEADLINE: { fontSize: responsive(17), fontFamily: 'Montserrat-Black' },
  BODY: { fontSize: responsive(17), fontFamily: 'Montserrat-Regular' },
  CALLOUT: { fontSize: responsive(16), fontFamily: 'Montserrat-Regular' },
  FOOTNOTE: { fontSize: responsive(13), fontFamily: 'Montserrat-Regular' },
  // CAPTION: { fontSize: responsive(12), fontFamily: 'Montserrat-Regular' },
  // SMALL: { fontSize: responsive(12), fontFamily: 'Montserrat-Regular' },
  TINY: { fontSize: responsive(12), fontFamily: 'Montserrat-Regular' },
  TITLE1: { fontSize: responsive(42), fontFamily: 'Montserrat-Medium' },
  HEADLINE1: { fontSize: responsive(26), fontFamily: 'Montserrat-Medium' },
  SECONDARY: { fontSize: responsive(14), fontFamily: 'Montserrat-Regular' },
  PRIMARY_BOLD: { fontSize: responsive(16), fontFamily: 'Montserrat-Medium' },

  BIGTEXT_BOLD: { fontSize: responsive(32), fontFamily: 'Montserrat-SemiBold' },
  BIGTEXT: { fontSize: responsive(32), fontFamily: 'Montserrat-Light' },
  HEADLINE: { fontSize: responsive(25), fontFamily: 'Montserrat-Medium' },
  SUBHEADLINE: { fontSize: responsive(20), fontFamily: 'Montserrat-ExtraBold' },
  LARGE_TITLE: { fontSize: responsive(18), fontFamily: 'Montserrat-ExtraBold' },
  TITLE: { fontSize: responsive(16), fontFamily: 'Montserrat-ExtraBold' },
  TITLE_SEMIBOLD: { fontSize: responsive(16), fontFamily: 'Montserrat-SemiBold' },
  TITLE_LIGHT: { fontSize: responsive(16), fontFamily: 'Montserrat-Light' },
  PRIMARY: { fontSize: responsive(14), fontFamily: 'Montserrat-ExtraBold' },
  PRIMARY_MEDIUM: { fontSize: responsive(14), fontFamily: 'Montserrat-Medium' },
  PRIMARY_LIGHT: { fontSize: responsive(14), fontFamily: 'Montserrat-Light' },
  CAPTION_BOLD: { fontSize: responsive(12), fontFamily: 'Montserrat-SemiBold' },
  CAPTION: { fontSize: responsive(12), fontFamily: 'Montserrat-Light' },
  SMALL_BOLD: { fontSize: responsive(10), fontFamily: 'Montserrat-Medium' },
  SMALL: { fontSize: responsive(10), fontFamily: 'Montserrat-Light' },
  TINY: { fontSize: responsive(8), fontFamily: 'Montserrat-SemiBold' },
} : {
  // LARGE_TITLE: { fontSize: responsive(34), fontFamily: 'Montserrat-Black' },
  // TITLE: { fontSize: responsive(28), fontFamily: 'Montserrat-Black' },
  TITLE_REGULAR: { fontSize: responsive(28), fontFamily: 'Montserrat-Regular' },
  // HEADLINE: { fontSize: responsive(17), fontFamily: 'Montserrat-Black' },
  BODY: { fontSize: responsive(17), fontFamily: 'Montserrat-Regular' },
  CALLOUT: { fontSize: responsive(16), fontFamily: 'Montserrat-Regular' },
  FOOTNOTE: { fontSize: responsive(13), fontFamily: 'Montserrat-Regular' },
  // CAPTION: { fontSize: responsive(12), fontFamily: 'Montserrat-Regular' },
  // SMALL: { fontSize: responsive(12), fontFamily: 'Montserrat-Regular' },
  TINY: { fontSize: responsive(12), fontFamily: 'Montserrat-Regular' },
  TITLE1: { fontSize: responsive(42), fontFamily: 'Montserrat-Medium' },
  HEADLINE1: { fontSize: responsive(26), fontFamily: 'Montserrat-Medium' },
  SECONDARY: { fontSize: responsive(14), fontFamily: 'Montserrat-Regular' },
  PRIMARY_BOLD: { fontSize: responsive(16), fontFamily: 'Montserrat-Medium' },

  BIGTEXT_BOLD: { fontSize: responsive(28), fontFamily: 'Montserrat-SemiBold' },
  BIGTEXT: { fontSize: responsive(28), fontFamily: 'Montserrat-Light' },
  HEADLINE: { fontSize: responsive(22), fontFamily: 'Montserrat-Medium' },
  SUBHEADLINE: { fontSize: responsive(18), fontFamily: 'Montserrat-ExtraBold' },
  LARGE_TITLE: { fontSize: responsive(16), fontFamily: 'Montserrat-ExtraBold' },
  TITLE: { fontSize: responsive(14), fontFamily: 'Montserrat-ExtraBold' },
  TITLE_SEMIBOLD: { fontSize: responsive(14), fontFamily: 'Montserrat-SemiBold' },
  TITLE_LIGHT: { fontSize: responsive(14), fontFamily: 'Montserrat-Light' },
  PRIMARY: { fontSize: responsive(12), fontFamily: 'Montserrat-ExtraBold' },
  PRIMARY_MEDIUM: { fontSize: responsive(12), fontFamily: 'Montserrat-Medium' },
  PRIMARY_LIGHT: { fontSize: responsive(12), fontFamily: 'Montserrat-Light' },
  CAPTION_BOLD: { fontSize: responsive(10), fontFamily: 'Montserrat-SemiBold' },
  CAPTION: { fontSize: responsive(10), fontFamily: 'Montserrat-Light' },
  SMALL_BOLD: { fontSize: responsive(8), fontFamily: 'Montserrat-Medium' },
  SMALL: { fontSize: responsive(8), fontFamily: 'Montserrat-Light' },
  TINY: { fontSize: responsive(7), fontFamily: 'Montserrat-SemiBold' },
};
