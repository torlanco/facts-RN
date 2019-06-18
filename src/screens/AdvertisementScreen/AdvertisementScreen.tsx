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
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  viewType: ViewType,
  typeList: string[],
  type: string,
}

class AdvertisementScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      advertisementList: [],
      viewType: ViewType.Grid,
      typeList: ['Beer', 'Vodka', 'Visky'],
      type: 'Beer'
    };

    this.fetchAdvertisements();
  }

  async fetchAdvertisements() {
      const { shopperId } = this.props.navigation.state.params;
      const advertisements: any = await this.props.fetchAdvertisements(shopperId);
      this.setState({
          advertisementList: advertisements
      })
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
  }

  onTypeChange = (type: string) => {
    this._isMounted && this.setState({
      type: type
    });
  }

  getView() {
    return this.state.viewType === ViewType.Grid 
      ? <AdvertisementGridView advertisementList={this.state.advertisementList}></AdvertisementGridView>
      : <AdvertisementListView advertisementList={this.state.advertisementList}></AdvertisementListView>
  }
 
  public render() {
    return (
      <SafeAreaView style={styles.container}>
          <HeaderBar title={'Econo'}></HeaderBar>
          <AdvertisementFilter viewType={this.state.viewType}
            handleViewTypeChange={this.onViewTypeChange}
            typeList={this.state.typeList} type={this.state.type}
            handleTypeChange={this.onTypeChange}></AdvertisementFilter>
          <View style={styles.itemCountContainer}>
            <Text style={styles.itemCount}>{this.state.advertisementList.length} </Text>
            <Text> ITEM</Text>
          </View>
          { this.getView() }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
    marginLeft: 20
  },
  itemCount: {
    fontWeight: 'bold',
  },
});

export default connect(null, mapDispatchToProps)(AdvertisementScreen);
