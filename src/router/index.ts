import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import {
  HomeScreen
} from '@screens';
import { colors } from '@styles';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTransparent: true,
        headerStyle: {
          borderBottomWidth: 0, // remove the bottom line
          elevation: 0
        },
        headerTintColor: colors.WHITE
      }
    }
  )
);

export { AppNavigator };
