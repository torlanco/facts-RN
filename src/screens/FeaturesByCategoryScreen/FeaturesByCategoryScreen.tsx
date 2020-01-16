import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, EmptyListMessage } from '@components';
import { StatusBar, Platform } from "react-native";
import { AdvertisementGridView } from '../AdvertisementScreen/components/AdvertisementGridView';

// Models
import { IAdvertisement } from '@interfaces/advertisement';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { NavigationInjectedProps, ScrollView } from "react-navigation";
import { AutoSuggestComponent } from './components/AutoSuggestComponent';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

interface IOwnProps {}

type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  dummyAdvertismentList:[],
  brand: string,
  initial: boolean;
}

const mapStateToProps = function(state: any){
  return {
    advertisements: state.advertisement.featuresByBrands,
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
}

class FeaturesByCategoryScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      initial: true,
      brand: '',
      advertisementList: [],
      dummyAdvertismentList: this.getDummyAdvertismentList()
    };
  }

  getDummyAdvertismentList() {
    const dummyAdvertismentList: any = [{dummyId: 1}, {dummyId: 2}, {dummyId: 3, opacity: 0.5}, {dummyId: 4, opacity: 0.5}];
    return dummyAdvertismentList;
  }

  async fetchAdvertisements() {
    await this.props.fetchFeaturesByBrand(this.state.brand);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });
  };

  getView() {
    return this.props.advertisements &&
      this.props.advertisements.map((featureListWithOutlet: any) => {
        return <View key={featureListWithOutlet.outlet} style={[styles.flex, {paddingBottom: 20}]}>
          <Text style={styles.outlet}>{featureListWithOutlet.outlet}</Text>
          <AdvertisementGridView advertisementList={featureListWithOutlet.features} onItemPress={this.onItemPress}/> 
        </View>
      })
  }

  getInitialView() {
    return this.state.initial && <View style={[styles.flex]}>
      <Text style={styles.heading}>SEARCH SPECIALS BY BRAND NAME</Text>
      <Text style={styles.text}>Results per outlet will appear below</Text>
      <AdvertisementGridView advertisementList={this.state.dummyAdvertismentList}/>
    </View>
  }

  onBrandSelect = (brand: string) => {
    if (this._isMounted) {
      this.setState({
        initial: false,
        brand,
      }, () => {
        this.fetchAdvertisements();
      });  
    }
  }

  public render() {
    return (
      <SafeAreaView style={[styles.flex, {backgroundColor: colors.BACKGROUND_GRAY}]}>
          <View style={styles.container}>
            <HeaderBar title={'FEATURES'}></HeaderBar>
            <View style={styles.mainContainer}>
              <View style={styles.autoSuggestContainer}>
                <AutoSuggestComponent onBrandSelect={this.onBrandSelect}/>
              </View>
              <ScrollView style={[styles.flex, {marginTop: 80}]} showsVerticalScrollIndicator={false}>
                  { this.getInitialView() }
                  { this.getView() }
                  { !this.props.loading && this.state.brand && this.props.advertisements && !this.props.advertisements.length ? 
                    <EmptyListMessage message={`No features found for brand ${this.state.brand}`}/> : null }
              </ScrollView>
            </View>
          </View>
          { this.props.loading && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
  },
  autoSuggestContainer: {
    position: "absolute",
    top: 0, 
    left: 20, right: 20,
  },
  outlet: {
    paddingHorizontal: 20,
    ...typos.TITLE
  },
  heading: {
    ...typos.LARGE_TITLE,
    paddingHorizontal: 20,
  },
  text: {
    ...typos.PRIMARY_LIGHT,
    paddingHorizontal: 20,
  }
});

const FeaturesByCategoryScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(FeaturesByCategoryScreen);
export { FeaturesByCategoryScreenWrapper as FeaturesByCategoryScreen }