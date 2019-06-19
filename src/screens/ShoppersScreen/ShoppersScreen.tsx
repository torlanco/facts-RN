import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, SelectPicker } from '@components';
import { IShopper } from '@interfaces/shopper';
import { ShopperCard } from './components/ShopperCard';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/shopper';
import { IOutlet } from '@interfaces/outlet';
import { fetchShoppers } from '@services';

// props 
interface ParamType {
  outlet: IOutlet.IOutletData;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
  outlets: string[] | undefined;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IShopper.DispatchFromProps;

// state
interface IState {
  outlet: string,
  shoppersList: Array<IShopper.IShopperData>
}

const mapStateToProps = function(state: any){
  return {
    outlets: state.outlet.outletNames,
  }
}

class ShoppersScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    const { outlet } = this.props.navigation.state.params;
    this.state = {
      outlet: outlet.outlet || '',
      shoppersList: [],
    };

    this.fetchShoppers();
  }

  async fetchShoppers() {
      const { outlet } = this.props.navigation.state.params;
      const shoppers: any = await this.props.fetchShoppers(outlet.latestStartDate, outlet.latestEndDate, this.state.outlet);
      this.setState({
        shoppersList: shoppers
      });
  }

  onShopperChange = (outlet: any) => {
    this.setState({
      outlet: outlet
    });
    this.fetchShoppers();
  }
  
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.state.shoppersList.length} 
        dotStyle={styles.dotStyle} selectedDotStyle={styles.selectedDotStyle}/>;
  }

  
  onItemPress = (shopperId: string) => {
    this.props.navigation.navigate('AdvertisementScreen', { shopperId: shopperId});
  }
 
  public render() {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar title={'Shoppers'}></HeaderBar>
            <SelectPicker options={this.props.outlets} value={this.state.outlet} 
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
    marginTop: 30,
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppersScreen);
