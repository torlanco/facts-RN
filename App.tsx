import * as React from 'react';

// ui
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { View, NetInfo } from 'react-native';
import { AppNavigator } from '@router';

// redux
import { store, persistor } from './src/redux/store';
import { Creators as OnlineActions } from '@actions/online';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
      'SFProText-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf'),
      'SFProText-Semibold': require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf')
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
      'SFProText-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf'),
      'SFProText-Semibold': require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf')
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
            <View style={{ flex: 1 }}>
              <AppNavigator />
              {/*TODO: Set Overlay screen here*/}
            </View>
          </PersistGate>
        </Provider>
      )
    );
  }
}
