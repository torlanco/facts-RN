import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, DateRange } from '@components';
import { StatusBar, Platform } from "react-native";
import { AdvertisementGridView } from './components/AdvertisementGridView';
import { AdvertisementListView } from './components/AdvertisementListView';
import { AdvertisementFilter } from './components/AdvertisementFilter';

// Models
import { IAdvertisement } from '@interfaces/advertisement';
import { IShopper } from '@interfaces/shopper';
import { IOutlet } from '@interfaces/outlet';
import { ViewType } from './enums/ViewType';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { CONSTANTS } from '@utils';

// props
interface ParamType {
  outlet: IOutlet.IOutletData;
  shopper: IShopper.IShopperData;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  viewType: ViewType,
  category: string,
  listRefreshToggler: boolean
}

const mapStateToProps = function(state: any){
  return {
    advertisements: state.advertisement.advertisements,
    categories: state.advertisement.categories,
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
}

class AdvertisementScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      advertisementList: [],
      viewType: ViewType.Grid,
      category: '',
      listRefreshToggler: false
    };
  }

  async fetchAdvertisements() {
    const { shopper } = this.props.navigation.state.params;
    await this.props.fetchAdvertisements(shopper.id);
    const category = this.props.categories ? this.props.categories[0].split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim() : '';
    this.setState({
      category: category,
      advertisementList: this.filterAdvertisements(category),
    });
  }

  filterAdvertisements(category: string) {
    category = category.split(CONSTANTS.PICKER_STRING_SEPARATOR)[0].trim();
    let advertisements: Array<IAdvertisement.IAdvertisementData>;
    if (!this.props.advertisements) {
      advertisements = [];
    } else if (category == '' || category == CONSTANTS.SHOW_ALL) {
      advertisements = this.props.advertisements;
    } else {
      advertisements = this.props.advertisements.filter((advertisement) => {
          return advertisement.category == category;
      });
    }
    return advertisements;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onViewTypeChange = (viewType: ViewType) => {
    this._isMounted && this.setState({
      viewType: viewType
    });
  };

  onTypeChange = (category: string) => {
    this._isMounted && this.setState({
      category: category,
      advertisementList: this.filterAdvertisements(category)
    });
  };

  onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    const { outlet, shopper } = this.props.navigation.state.params;
    this.props.navigation.navigate('AdvertisementDetailScreen', { outlet: outlet, shopper: shopper, advertisement: advertisement });
  };

  onScreenFocus = () => {
    if (this._isMounted) {
      this.setState({
        listRefreshToggler: !this.state.listRefreshToggler
      });
      this.fetchAdvertisements();      
    }
  }

  getView() {
    const { outlet } = this.props.navigation.state.params;
    return this.state.viewType === ViewType.Grid
      ? <AdvertisementGridView advertisementList={this.state.advertisementList} onItemPress={this.onItemPress} outlet={outlet} listRefreshToggler={this.state.listRefreshToggler}></AdvertisementGridView>
      : <AdvertisementListView advertisementList={this.state.advertisementList} onItemPress={this.onItemPress}></AdvertisementListView>
  }

  public render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHTEST_GRAY}}>
          <NavigationEvents onDidFocus={this.onScreenFocus}/>
          <View style={styles.container}>
            <HeaderBar title={'FEATURES'}></HeaderBar>
            <View style={{paddingHorizontal: 5}}>
              <AdvertisementFilter viewType={this.state.viewType}
                handleViewTypeChange={this.onViewTypeChange}
                typeList={this.props.categories || []} type={this.state.category}
                handleTypeChange={this.onTypeChange} totalItems={this.state.advertisementList.length}></AdvertisementFilter>
            </View>
            { this.getView() }
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

const AdvertisementScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(AdvertisementScreen);
export { AdvertisementScreenWrapper as AdvertisementScreen }
