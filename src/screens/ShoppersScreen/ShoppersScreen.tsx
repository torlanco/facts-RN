import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, ScrollView, RefreshControl } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, SelectPicker } from '@components';
import { IShopper } from '@interfaces/shopper';
import { ShopperCard } from './components/ShopperCard';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, FlatList } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/shopper';
import { IOutlet } from '@interfaces/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

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
  shoppersList: Array<IShopper.IShopperData>,
  refreshing: boolean
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
      refreshing: false
    };

    this.fetchShoppers();
  }

  async fetchShoppers(onRefresh?: boolean) {
      const { outlet } = this.props.navigation.state.params;
      const shoppers: any = await this.props.fetchShoppers(outlet.earliestStartDate, outlet.latestEndDate, this.state.outlet);
      this.setState({
        shoppersList: shoppers,
        refreshing: onRefresh ? false : this.state.refreshing
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

  onRefresh = () => {
    if (!this.state.refreshing) {
      this.setState({refreshing: true});
      this.fetchShoppers(true);
    }
  }

  public render() {
    const { outlet } = this.props.navigation.state.params;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHTEST_GRAY}}>
          <View style={styles.container}>
            <HeaderBar title={'SHOPPERS'}></HeaderBar>
            <View style={styles.content}>    
              <SelectPicker label="Outlet" options={this.props.outlets} value={this.state.outlet}
                placeholder={'Select an outlet'}
                handleValueChange={this.onShopperChange}>
              </SelectPicker>
              <Text style={styles.text}><Text style={styles.textBold}>{this.state.shoppersList.length} </Text>SHOPPERS</Text>
            </View>
            <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  tintColor="rgba(0,0,0,0.5)"/>
              }>
                <FlatList
                  data={this.state.shoppersList}
                  keyExtractor={(item: IShopper.IShopperData) => item.id}
                  renderItem={({item}) => <ShopperCard shopper={item} onItemPress={this.onItemPress} outlet={outlet}></ShopperCard>}
                  showsVerticalScrollIndicator={false}/>
            </ScrollView>     
          </View>
          {this.props.loading && !this.state.refreshing && <LoadingScreen />}
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    },
  content: {
    paddingHorizontal: 10,
  },
  text: {
    ...typos.PRIMARY,
    padding: 10,
  },
  flex: {
    flex: 1
  },
  textBold: {
    ...typos.PRIMARY,
    fontWeight: 'bold'
  },
});

const ShoppersScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(ShoppersScreen);
export { ShoppersScreenWrapper as ShoppersScreen }