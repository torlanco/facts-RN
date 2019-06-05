import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import {
    OutletScreen
} from '@screens';
import { colors } from '@styles';

const AppNavigator = createAppContainer(
    createStackNavigator(
        {
            Outlet: {screen: OutletScreen},
        },
        {
            initialRouteName: 'Outlet',
            defaultNavigationOptions: {
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
