import * as React from 'react';

// ui
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { View, NetInfo, StatusBar, Platform } from 'react-native';
import { AppNavigator } from '@router';

// redux
import { store, persistor } from './src/redux/store';
import { Creators as OnlineActions } from '@actions/online';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

// interfaces
interface Props {}

interface State {
  isReady: boolean;
  // timer: NodeJS.Timeout | undefined;
}

export default class App extends React.Component<Props, State> {
  state = {
    isReady: false //timer: undefined
  };

  async componentDidMount() {
    // add event listener to catch connectivity changes
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);

    await Font.loadAsync({
      'Montserrat-Black': require('./assets/fonts/Montserrat-Black.otf'),
      'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.otf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.otf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.otf'),
    });

    // const timer = setInterval(this.tick, 1000);
    this.setState({
      isReady: true //timer
    });
  }

  // remove connectivity event listener when unmounting
  componentWillUnmount() {
    // if (this.state.timer) {
    // clearInterval(this.state.timer);
    // }
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  // tick = () => {
  //   Events.emit('tick');
  // };

  // handle connectivity changes and fire action to update store
  handleConnectivityChange(reach) {
    if (reach.type === 'none') {
      store.dispatch(OnlineActions.offline());
    } else {
      store.dispatch(OnlineActions.online());
    }
  }

  async _cacheResourcesAsync() {
    await Asset.loadAsync([
      require('./assets/images/background.png'),
      require('./assets/images/logo.png'),
      require('./assets/images/placeholder.png')
    ]);

    return Font.loadAsync({
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
              <View style={{ flex: 1 }}>
                <ActionSheetProvider>
                  <AppNavigator />
                  {/*TODO: Set Overlay screen here*/}
                </ActionSheetProvider>
              </View>
          </PersistGate>
        </Provider>
      )
    );
  }
}
