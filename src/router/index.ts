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
  RegisterScreen,
  ResetPasswordScreen,
  FeaturesByCategoryScreen,
  CameraScreen,
  CustomCameraScreen,
  DocsScreen,
  FullImageScreen,
  ProfileScreen,
  WelcomeScreen,
  VerifyOTPScreen,
  HomeScreen,
  ChangePasswordScreen,
  ForgotPasswordScreen,
  WebViewScreen,
  FavoritesScreen
} from '@screens';
import { colors } from '@styles';
import { createDrawerNavigator } from 'react-navigation';
import { SideMenu } from './SideMenu';

const HomeNavigator = createStackNavigator(
    {
        HomeScreen: {screen: HomeScreen},
        OutletScreen: {screen: OutletScreen},
        ShopperScreen: {screen: ShoppersScreen},
        AdvertisementScreen: {screen: AdvertisementScreen},
        AdvertisementDetailScreen: {screen: AdvertisementDetailScreen},
        FeaturesByCategoryScreen: {screen: FeaturesByCategoryScreen},
        FullImageScreen: {screen: FullImageScreen},
        WebViewScreen: {screen: WebViewScreen}
    },
    {
        initialRouteName: 'HomeScreen',
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

const OutletNavigator = createStackNavigator(
    {
        OutletScreen: {screen: OutletScreen},
        ShopperScreen: {screen: ShoppersScreen},
        AdvertisementScreen: {screen: AdvertisementScreen},
        AdvertisementDetailScreen: {screen: AdvertisementDetailScreen},
        FullImageScreen: {screen: FullImageScreen}
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
        FeaturesByCategoryScreen: {screen: FeaturesByCategoryScreen},
        AdvertisementDetailScreen: {screen: AdvertisementDetailScreen},
    },
    {
        initialRouteName: 'FeaturesByCategoryScreen',
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

const DocsNavigator = createStackNavigator(
    {
        DocsScreen: {screen: DocsScreen},
        CustomCameraScreen: {screen: CustomCameraScreen},
        CameraScreen: {screen: CameraScreen},
        FullImageScreen: {screen: FullImageScreen}
    },
    {
        initialRouteName: 'DocsScreen',
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

const FavoritesNavigator = createStackNavigator(
    {
        FavoritesScreen: {screen: FavoritesScreen },
        AdvertisementDetailScreen: {screen: AdvertisementDetailScreen},
    },
    {
        initialRouteName: 'FavoritesScreen',
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

const ProfileNavigator = createStackNavigator(
    {
        ProfileScreen: {screen: ProfileScreen},
        ChangePasswordScreen: {screen: ChangePasswordScreen},
        FullImageScreen: {screen: FullImageScreen},
    },
    {
        initialRouteName: 'ProfileScreen',
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
      Home: { screen: HomeNavigator },
      Outlet: { screen: OutletNavigator },
      // Work: { screen: WorkNavigator },
      // Features: {screen: FeaturesNavigator},
      // Docs: { screen: DocsNavigator },
      Favorites: { screen: FavoritesNavigator },
      Profile: { screen: ProfileNavigator }
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
        WelcomeScreen: {screen: WelcomeScreen},
        LoginScreen: {screen: LoginScreen},
        ForgotPasswordScreen: {screen: ForgotPasswordScreen},
        RegisterScreen: {screen: RegisterScreen},
        VerifyOTPScreen: {screen: VerifyOTPScreen},
        ResetPasswordScreen: {screen: ResetPasswordScreen},
    },
    {
        initialRouteName: 'WelcomeScreen',
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
