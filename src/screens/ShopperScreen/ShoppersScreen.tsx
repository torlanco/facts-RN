import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView } from 'react-native';
import { typos } from '@styles';

// Component
import { HeaderBar } from '@components';
import { ShoppersGridView } from './components/ShoppersGridView';
import { ShoppersListView } from './components/ShoppersListView';
import { ShoppersFilter } from './components/ShoppersFilter';

// Models
import { IShopper } from '@interfaces/shopper';
import { ViewType } from './enums/ViewType';

// props 
interface IOwnProps {}
type IProps = IOwnProps;

// state
interface State {
  shopperList: Array<IShopper.IShopperData>,
  viewType: ViewType,
  typeList: string[],
  type: string,
}

class ShoppersScreen extends React.Component<IProps, State> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      shopperList: this.loadData(),
      viewType: ViewType.Grid,
      typeList: ['Beer', 'Vodka', 'Visky'],
      type: 'Beer'
    };

    this.onViewTypeChange = this.onViewTypeChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  loadData(): Array<IShopper.IShopperData> {
    const shopperList: Array<IShopper.IShopperData> = [
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

    return shopperList;
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
      ? <ShoppersGridView shopperList={this.state.shopperList}></ShoppersGridView>
      : <ShoppersListView shopperList={this.state.shopperList}></ShoppersListView>
  }
 
  public render() {
    return (
      <SafeAreaView style={styles.container}>
          <HeaderBar title={'Econo'}></HeaderBar>
          <ShoppersFilter viewType={this.state.viewType}
            handleViewTypeChange={this.onViewTypeChange}
            typeList={this.state.typeList} type={this.state.type}
            handleTypeChange={this.onTypeChange}></ShoppersFilter>
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

export { ShoppersScreen };
