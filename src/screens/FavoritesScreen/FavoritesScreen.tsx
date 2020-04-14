import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";
import { AdvertisementGridView } from '../AdvertisementScreen/components/AdvertisementGridView';

// Models
import { IAdvertisement } from '@interfaces/advertisement';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

// props
interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  page: number
}

const mapStateToProps = function(state: any){
  return {
    favoriteFeatures: state.advertisement.favoriteFeatures,
    totalFavorites: state.advertisement.totalFavorites,
    loading: state.advertisement.loading
  }
}

class FavoritesScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      page: 0
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  onScreenFocus = () => {
    this.setState({
      page: 0
    }, () => {
      this.fetchAdvertisements(true);
    });
  }

  async fetchAdvertisements(initialFetch?: boolean) {
    if ((initialFetch || this.props.totalFavorites < 0 || this.props.totalFavorites > this.props.favoriteFeatures.length) && !this.props.loading) {
      await this.props.fetchFavoriteFeatures(this.state.page, initialFetch);
      this.setState({
        page: this.state.page + 1
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });
  };

  public render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHTEST_GRAY}}>
      <NavigationEvents onDidFocus={this.onScreenFocus}/>
          <View style={styles.container}>
            <HeaderBar title={'FAVOURITES'}></HeaderBar>
            <AdvertisementGridView advertisementList={this.props.favoriteFeatures || []}
                onItemPress={this.onItemPress} onScrollEndReached={() => this.fetchAdvertisements(false)}/>
          </View>
          {this.props.loading && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    },
  text: {
    ...typos.TITLE,
    textAlign: 'center'
  },
  itemCountContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10
  },
  itemCount: {
    fontWeight: 'bold',
  },
});

const FavoritesScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
export { FavoritesScreenWrapper as FavoritesScreen }
