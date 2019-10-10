import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import {
  OutletScreen,
  AdvertisementScreen,
  ShoppersScreen,
  AdvertisementDetailScreen,
  AdvertisementDeckSwiperScreen,
  SelectCategoryScreen,
  LoginScreen,
  ForgetPasswordScreen,
  RegisterScreen,
  ResetPasswordScreen,
  AutoSuggestScreen,
  FeaturesScreen,
  CameraScreen,
  CustomCameraScreen
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

const FeaturesNavigator = createStackNavigator(
    {
        AutoSuggestScreen: {screen: AutoSuggestScreen},
        FeaturesScreen: {screen: FeaturesScreen},
        AdvertisementDetailScreen: {screen: AdvertisementDetailScreen},
    },
    {
        initialRouteName: 'AutoSuggestScreen',
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

const CameraNavigator = createStackNavigator(
    {
        CustomCameraScreen: {screen: CustomCameraScreen},
        CameraScreen: {screen: CameraScreen},
    },
    {
        initialRouteName: 'CustomCameraScreen',
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

const MainNavigator = createDrawerNavigator(
    {
      Outlet: { screen: OutletNavigator },
      Work: { screen: WorkNavigator },
      Features: {screen: FeaturesNavigator},
      Camera: { screen: CameraNavigator },
    },
    {
      contentComponent: SideMenu,
      defaultNavigationOptions: {
        drawerLockMode: 'locked-closed'
      },
    }
)

const AuthNavigator = createStackNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        RegisterScreen: {screen: RegisterScreen},
        ForgetPasswordScreen: {screen: ForgetPasswordScreen},
        ResetPasswordScreen: {screen: ResetPasswordScreen},
    },
    {
        initialRouteName: 'LoginScreen',
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
    createSwitchNavigator(
        {
            Auth: {screen: AuthNavigator},
            Main: {screen: MainNavigator},
        },
        {   initialRouteName: 'Auth', }
    )
);

export { AppNavigator };
