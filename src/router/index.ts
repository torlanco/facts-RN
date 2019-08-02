import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import {
  OutletScreen,
  AdvertisementScreen,
  ShoppersScreen,
  AdvertisementDetailScreen,
  AdvertisementDeckSwiperScreen,
  SelectCategoryScreen
} from '@screens';
import { colors } from '@styles';
import { createDrawerNavigator } from 'react-navigation';
import { SideMenu } from './SideMenu';

const OutletNavigator = createStackNavigator(
    {
        OutletScreen: {screen: OutletScreen},
        ShopperScreen: {screen: ShoppersScreen},
        AdvertisementScreen: {screen: AdvertisementScreen},
        AdvertisementDetailScreen: {screen: AdvertisementDetailScreen},
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

const WorkNavigator = createStackNavigator(
    {
        SelectCategoryScreen: {screen: SelectCategoryScreen},
        AdvertisementDeckSwiperScreen: {screen: AdvertisementDeckSwiperScreen},
    },
    {
        initialRouteName: 'SelectCategoryScreen',
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

const AppNavigator = createAppContainer(
    createDrawerNavigator(
        {
          Outlet: { screen: OutletNavigator },
          Work: { screen: WorkNavigator },
        },
        {
          contentComponent: SideMenu,
          defaultNavigationOptions: {
            drawerLockMode: 'locked-closed'
          },
        }
    )
);

export { AppNavigator };
