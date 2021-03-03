import * as React from 'react';

// ui
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View, StatusBar, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { AppNavigator } from '@router';

// redux
import { store, persistor } from './src/redux/store';
import { Creators as OnlineActions } from '@actions/online';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { colors } from '@styles';

// interfaces
interface Props {}

interface State {
  isReady: boolean;
  // timer: NodeJS.Timeout | undefined;
  type: any;
  isConnected: boolean;
}

export default class App extends React.Component<Props, State> {
  netInfoSubscribe: any;

  state = {
    isReady: false, //timer: undefined
    type: null,
    isConnected: false
  };

  async componentDidMount() {
    // add event listener to catch connectivity changes
    this.netInfoSubscribe = NetInfo.addEventListener(netinfostate => {
        this.handleConnectivityChange();
    });    
    
    // await Font.loadAsync({
    //   'Montserrat-Black': require('./assets/fonts/Montserrat-Black.otf'),
    //   'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.otf'),
    //   'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
    //   'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
    //   'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.otf'),
    //   'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
    //   'Montserrat-Light': require('./assets/fonts/Montserrat-Light.otf'),
    // });

    // // const timer = setInterval(this.tick, 1000);
    // this.setState({
    //   isReady: true //timer
    // });
  }

  // remove connectivity event listener when unmounting
  componentWillUnmount() {
    // if (this.state.timer) {
    // clearInterval(this.state.timer);
    // }

    // Unsubscribe Net Info Listener
    this.netInfoSubscribe();
  }

  // tick = () => {
  //   Events.emit('tick');
  // };

  // handle connectivity changes and fire action to update store
  handleConnectivityChange() {
    if (this.state.isConnected) {
      store.dispatch(OnlineActions.online());
    } else {
      store.dispatch(OnlineActions.offline());
    }
  }

  async _cacheResourcesAsync() {
    await Asset.loadAsync([
      require('./assets/images/background.png'),
      require('./assets/images/logo.png'),
      require('./assets/images/placeholder.png')
    ]);

    await Font.loadAsync({
      'Montserrat-Black': require('./assets/fonts/Montserrat-Black.otf'),
      'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.otf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.otf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.otf'),
    });
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      isReady && (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
              <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}/>
              <View style={{ flex: 1}}>
                <ActionSheetProvider>
                  <AppNavigator />
                </ActionSheetProvider>
              </View>
          </PersistGate>
        </Provider>
      )
    );
  }
}
