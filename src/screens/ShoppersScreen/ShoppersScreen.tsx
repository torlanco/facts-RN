import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, SelectPicker } from '@components';
import { IShopper } from '@interfaces/shopper';
import { ShopperCard } from './components/ShopperCard';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

// Models

// props 
interface IOwnProps {}
type IProps = IOwnProps;

// state
interface IState {
    shoppersTypeList: string[],
    shoppersType: string,
    shoppers: Array<IShopper.IShopperData>
}

class ShoppersScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
        shoppersTypeList: ['Econo', 'Econo1', 'Econo2'],
        shoppersType: 'Econo',
        shoppers: this.loadShoppers()
    };
  }

  loadShoppers(): Array<IShopper.IShopperData> {
    const shoppersList: Array<IShopper.IShopperData> = [
        {
            startDate: '25 May',
            endDate: '30 May',
            features: 10,
            imageUrl: 'https://www.ericnisall.com/wp-content/uploads/3-Reasons-I-Wont-Use-Instacart-For-Grocery-Delivery.jpg',
        },
        {
            startDate: '25 May',
            endDate: '30 May',
            features: 10,
            imageUrl: 'https://www.marketforce.com/sites/default/files/grocery.jpg',
        },
        {
            startDate: '25 May',
            endDate: '30 May',
            features: 10,
            imageUrl: 'https://www.ericnisall.com/wp-content/uploads/3-Reasons-I-Wont-Use-Instacart-For-Grocery-Delivery.jpg',
        },
    ];
    return shoppersList;
  }

  onShopperChange = (shopperType: any) => {
    this.setState({
        shoppersType: shopperType
    })
  }
  
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.state.shoppers.length} 
        dotStyle={styles.dotStyle} selectedDotStyle={styles.selectedDotStyle}/>;
  }
 
  public render() {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar title={'Shoppers'}></HeaderBar>
            <SelectPicker options={this.state.shoppersTypeList} value={this.state.shoppersType} 
                handleValueChange={this.onShopperChange}></SelectPicker>
            <Text style={styles.text}><Text style={styles.textBold}>10 </Text>SHOPPERS</Text>

            <IndicatorViewPager
                style={{ height: 550 }}
                indicator={this._renderDotIndicator()}>
                {
                    this.state.shoppers.map((shopper, index) => {
                        return <ShopperCard shopper={shopper} key={index}></ShopperCard>;
                    })
                }
            </IndicatorViewPager>
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
    ...typos.PRIMARY,
    padding: 10,  
  },
  textBold: {
    ...typos.PRIMARY,
    fontWeight: 'bold'  
  },
  dotStyle: {
    backgroundColor: colors.LIGHT_ORANGE,
    opacity: 0.4,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  selectedDotStyle: {
    backgroundColor: colors.LIGHT_ORANGE,
    opacity: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export { ShoppersScreen };
