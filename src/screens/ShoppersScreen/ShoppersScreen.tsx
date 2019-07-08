import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, SelectPicker } from '@components';
import { IShopper } from '@interfaces/shopper';
import { ShopperCard } from './components/ShopperCard';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, FlatList } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/shopper';
import { IOutlet } from '@interfaces/outlet';
import { LoadingScreen } from '@screens';

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
  loading: string
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
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
};

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
      const shoppers: any = await this.props.fetchShoppers(outlet.earliestStartDate, outlet.latestEndDate, this.state.outlet);
      this.setState({
        shoppersList: shoppers
      });
  }

  onShopperChange = (outlet: any) => {
    this.setState({
      outlet: outlet
    }, this.fetchShoppers);
  };

  onItemPress = (shopper: IShopper.IShopperData) => {
    const { outlet } = this.props.navigation.state.params;
    this.props.navigation.navigate('AdvertisementScreen', { outlet: outlet, shopper: shopper });
  };

  public render() {
    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
              <HeaderBar title={'Shoppers'}></HeaderBar>
              <SelectPicker options={this.props.outlets} value={this.state.outlet}
                            placeholder={'Select an outlet'}
                            handleValueChange={this.onShopperChange}>
              </SelectPicker>
              <Text style={styles.text}><Text style={styles.textBold}>{this.state.shoppersList.length} </Text>SHOPPERS</Text>
              <FlatList
                data={this.state.shoppersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <ShopperCard shopper={item} onItemPress={this.onItemPress}></ShopperCard>}
                showsVerticalScrollIndicator={false}/>
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
