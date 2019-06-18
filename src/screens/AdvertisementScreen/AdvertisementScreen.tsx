import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView } from 'react-native';
import { typos } from '@styles';

// Component
import { HeaderBar } from '@components';
import { AdvertisementGridView } from './components/AdvertisementGridView';
import { AdvertisementListView } from './components/AdvertisementListView';
import { AdvertisementFilter } from './components/AdvertisementFilter';

// Models
import { IAdvertisement } from '@interfaces/advertisement';
import { ViewType } from './enums/ViewType';

import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';


// props 
interface IOwnProps {}
type IProps = IOwnProps &
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
      advertisementList: this.loadData(),
      viewType: ViewType.Grid,
      typeList: ['Beer', 'Vodka', 'Visky'],
      type: 'Beer'
    };

  }

  loadData(): Array<IAdvertisement.IAdvertisementData> {
    const advertisementList: Array<IAdvertisement.IAdvertisementData> = [
      { 
        type: 'Beer',
        name: 'Corona',
        piecePerKg: '1-2 pcs/kg',
        price: '$ 17.94',
        originalPrice: '$ 17.94',
        minQuantity: 'MIN. 2KG',
        itemUrl: 'https://www.ericnisall.com/wp-content/uploads/3-Reasons-I-Wont-Use-Instacart-For-Grocery-Delivery.jpg',
      },
      { 
        type: 'Beer',
        name: 'Corona',
        piecePerKg: '1-2 pcs/kg',
        price: '$ 17.94',
        originalPrice: '$ 17.94',
        minQuantity: 'MIN. 2KG',
        itemUrl: 'https://www.marketforce.com/sites/default/files/grocery.jpg',
      },
      { 
        type: 'Beer',
        name: 'Corona',
        piecePerKg: '1-2 pcs/kg',
        price: '$ 17.94',
        originalPrice: '$ 17.94',
        minQuantity: 'MIN. 2KG',
        itemUrl: 'https://www.marketforce.com/sites/default/files/grocery.jpg',
      },
      { 
        type: 'Beer',
        name: 'Corona',
        piecePerKg: '1-2 pcs/kg',
        price: '$ 17.94',
        originalPrice: '$ 17.94',
        minQuantity: 'MIN. 2KG',
        itemUrl: 'https://www.ericnisall.com/wp-content/uploads/3-Reasons-I-Wont-Use-Instacart-For-Grocery-Delivery.jpg',
      },{ 
        type: 'Beer',
        name: 'Corona',
        piecePerKg: '1-2 pcs/kg',
        price: '$ 17.94',
        originalPrice: '$ 17.94',
        minQuantity: 'MIN. 2KG',
        itemUrl: 'https://www.ericnisall.com/wp-content/uploads/3-Reasons-I-Wont-Use-Instacart-For-Grocery-Delivery.jpg',
      }
    ];

    return advertisementList;
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
  }
});

export default connect(null, mapDispatchToProps)(AdvertisementScreen);
