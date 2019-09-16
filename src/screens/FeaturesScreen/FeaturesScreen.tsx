import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { typos } from '@styles';

// Component
import { HeaderBar, EmptyListMessage } from '@components';
import { StatusBar, Platform } from "react-native";
import { AdvertisementGridView } from '../AdvertisementScreen/components/AdvertisementGridView';
import { AdvertisementListView } from '../AdvertisementScreen/components/AdvertisementListView';
import { AdvertisementFilter } from '../AdvertisementScreen/components/AdvertisementFilter';

// Models
import { IAdvertisement } from '@interfaces/advertisement';
import { ViewType } from '../AdvertisementScreen/enums/ViewType';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";
import { LoadingScreen } from '@screens';

// props
interface ParamType {
  brand?: string
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
  viewType: ViewType
}

const mapStateToProps = function(state: any){
  return {
    advertisements: state.advertisement.featuresByBrands,
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
}

class FeaturesScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      advertisementList: [],
      viewType: ViewType.Grid,
    };

    this.fetchAdvertisements();
  }

  async fetchAdvertisements() {
    const { brand } = this.props.navigation.state.params;
    await this.props.fetchFeaturesByBrand(brand);
    this.setState({
      advertisementList: this.props.advertisements || [],
    });
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

  onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });
  };

  getView() {
    return this.state.viewType === ViewType.Grid
      ? <AdvertisementGridView advertisementList={this.state.advertisementList} onItemPress={this.onItemPress}></AdvertisementGridView>
      : <AdvertisementListView advertisementList={this.state.advertisementList} onItemPress={this.onItemPress}></AdvertisementListView>
  }

  public render() {
    const { brand } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <HeaderBar title={'Features'} titleStyle={{textAlign: 'left'}}></HeaderBar>
            <AdvertisementFilter viewType={this.state.viewType}
              handleViewTypeChange={this.onViewTypeChange} totalItems={this.state.advertisementList.length}></AdvertisementFilter>
            { this.state.advertisementList.length ? this.getView() : 
              <EmptyListMessage message={`No features found for brand ${brand}`}/>  }
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    ...typos.TITLE,
    textAlign: 'center'
  },
  
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesScreen);
