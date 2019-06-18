import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, SelectPicker } from '@components';
import { IShopper } from '@interfaces/shopper';
import { ShopperCard } from './components/ShopperCard';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { NavigationInjectedProps } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/shopper';

// props 
interface IOwnProps {}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IShopper.DispatchFromProps;

// state
interface IState {
    shoppersTypeList: string[],
    shoppersType: string,
    shoppersList: Array<IShopper.IShopperData>
}

class ShoppersScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
        shoppersTypeList: ['Econo', 'Econo1', 'Econo2'],
        shoppersType: 'Econo',
        shoppersList: []
    };

    this.fetchShoppers();
  }

  async fetchShoppers() {
      const shoppers: any = await this.props.fetchShoppers();
      this.setState({
        shoppersList: shoppers
      })
  }

  onShopperChange = (shopperType: any) => {
    this.setState({
        shoppersType: shopperType
    })
  }
  
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.state.shoppersList.length} 
        dotStyle={styles.dotStyle} selectedDotStyle={styles.selectedDotStyle}/>;
  }

  
  onItemPress = (outletId: string) => {
    this.props.navigation.navigate('AdvertisementScreen', { outletId: outletId});
  }
 
  public render() {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar title={'Shoppers'}></HeaderBar>
            <SelectPicker options={this.state.shoppersTypeList} value={this.state.shoppersType} 
                handleValueChange={this.onShopperChange}></SelectPicker>
            <Text style={styles.text}><Text style={styles.textBold}>{this.state.shoppersList.length} </Text>SHOPPERS</Text>

            <IndicatorViewPager
                style={{ height: 550 }}
                indicator={this._renderDotIndicator()}>
                {
                    this.state.shoppersList.map((shopper, index) => {
                        return <ShopperCard shopper={shopper} key={index} onItemPress={this.onItemPress}></ShopperCard>;
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

export default connect(null, mapDispatchToProps)(ShoppersScreen);
