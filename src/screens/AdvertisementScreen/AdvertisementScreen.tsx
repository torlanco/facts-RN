import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { typos } from '@styles';

// Component
import { HeaderBar } from '@components';
import { AdvertisementGridView } from './components/AdvertisementGridView';
import { AdvertisementListView } from './components/AdvertisementListView';
import { AdvertisementFilter } from './components/AdvertisementFilter';

// Models
import { IAdvertisement } from '@interfaces/advertisement';
import { ViewType } from './enums/ViewType';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";
import { Text } from 'react-native-elements';
import { stat } from 'fs';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

// props
interface ParamType {
  shopperId: string | undefined;
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
      category: ''
    };

    this.fetchAdvertisements();
  }

  async fetchAdvertisements() {
    const { shopperId } = this.props.navigation.state.params;
    await this.props.fetchAdvertisements(shopperId);
    const category = this.props.categories ? this.props.categories[0] : '';
    this.setState({
      category: category,
      advertisementList: this.filterAdvertisements(category),
    });
  }

  filterAdvertisements(category: string) {
    let advertisements: Array<IAdvertisement.IAdvertisementData>;
    if (!this.props.advertisements) {
      advertisements = [];
    } else if (category == '') {
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

  getView() {
    return this.state.viewType === ViewType.Grid
      ? <AdvertisementGridView advertisementList={this.state.advertisementList}></AdvertisementGridView>
      : <AdvertisementListView advertisementList={this.state.advertisementList}></AdvertisementListView>
  }

  public render() {
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <HeaderBar title={'Features'}></HeaderBar>
            <AdvertisementFilter viewType={this.state.viewType}
              handleViewTypeChange={this.onViewTypeChange}
              typeList={this.props.categories || []} type={this.state.category}
              handleTypeChange={this.onTypeChange}></AdvertisementFilter>
            <View style={styles.itemCountContainer}>
              <Text style={styles.itemCount}>{this.state.advertisementList.length} </Text>
              <Text> ITEM</Text>
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
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementScreen);
