import { Platform, PixelRatio, Dimensions } from 'react-native';

export const getContrastYIQ = hexColor => {
  let r, g, b;
  if (hexColor.indexOf('rgba') === 0) {
    hexColor = hexColor.replace('rgba', '').replace(/\(|\)| /g, '');
    let colors = hexColor.split(',');
    r = Number(colors[0]);
    g = Number(colors[1]);
    b = Number(colors[2]);
  } else if (hexColor.indexOf('#') === 0) {
    hexColor = hexColor.replace('#', '');
    r = parseInt(hexColor.substr(0, 2), 16);
    g = parseInt(hexColor.substr(2, 2), 16);
    b = parseInt(hexColor.substr(4, 2), 16);
  }

  let yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
};

export const responsive = size => {
  // based on iPhone X's scale
  const { width } = Dimensions.get('window');
  const SCALE_FACTOR = width / 375;

  const newSize = size * SCALE_FACTOR;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
