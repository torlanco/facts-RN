import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import {
  OutletScreen,
  AdvertisementScreen,
  ShoppersScreen
} from '@screens';
import { colors } from '@styles';

const AppNavigator = createAppContainer(
    createStackNavigator(
        {
            OutletScreen: {screen: OutletScreen},
            ShopperScreen: {screen: ShoppersScreen},
            AdvertisementScreen: {screen: AdvertisementScreen},
        },
        {
            initialRouteName: 'OutletScreen',
            defaultNavigationOptions: {
                headerLeft: null,
                headerBackTitle: null,
                headerTransparent: true,
                headerStyle: {
                    borderBottomWidth: 0, // remove the bottom line
                    height: 0,
                    elevation: 0
                },
                headerTintColor: colors.WHITE
            }
        }
    )
);

export { AppNavigator };
