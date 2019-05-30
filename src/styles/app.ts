import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from './colors';

const button: ViewStyle = {
  width: '100%',
  height: 44,
  marginVertical: 24,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center'
};

export const app = StyleSheet.create({
  buttonLoud: {
    ...button,
    color: colors.WHITE,
    backgroundColor: colors.PRIMARY
  },
  border: {
    borderBottomColor: colors.LIGHT_GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.LIGHT_GRAY,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  buttonShy: {
    ...button,
    color: colors.DARK_BLUE_GRAY,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.LIGHT_GRAY
  }
});
