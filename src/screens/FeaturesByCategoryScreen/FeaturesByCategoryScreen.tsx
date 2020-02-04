import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { HeaderBar, EmptyListMessage } from '@components';
import { StatusBar, Platform, SectionList } from "react-native";
import { AdvertisementGridView } from '../AdvertisementScreen/components/AdvertisementGridView';

// Models
import { IAdvertisement } from '@interfaces/advertisement';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { NavigationInjectedProps, ScrollView } from "react-navigation";
import { AutoSuggestComponent } from './components/AutoSuggestComponent';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { AdvertisementGridItem } from '../AdvertisementScreen/components/AdvertisementGridItem';

interface IOwnProps {}

type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  advertisementList: [],
  dummyAdvertismentList:[],
  brand: string,
  initial: boolean;
}

const mapStateToProps = function(state: any){
  return {
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
    const response: any = await this.props.fetchFeaturesByBrand(this.state.brand);
    this.setState({
      advertisementList: this.createMultiListWithOutlet(response)
    })
  }

  createMultiListWithOutlet(advertisements: IAdvertisement.IAdvertisementData[]) {
    const featuresWithOutetMap: any = {};
    advertisements.forEach((feature: IAdvertisement.IAdvertisementData) => {
      if (!featuresWithOutetMap[feature.outlet]) {
        featuresWithOutetMap[feature.outlet] = [];
      }
      featuresWithOutetMap[feature.outlet].push(feature);
    });
    const featuresWithOutletList: any = [];
    for (let key in featuresWithOutetMap) {
      const list = [];
      list.push({key, features: featuresWithOutetMap[key]});
      featuresWithOutletList.push({
        outlet: key,
        data: list
      })
    }
    console.log(featuresWithOutletList);
    return featuresWithOutletList;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.clearFeaturesByBrand();
  }

  onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });
  };

  getView() {
    return this.state.initial ? this.getInitialView() : this.getFeaturesView();
  }

  redirectToAdvertisementDetail = (advertisement: IAdvertisement.IAdvertisementData) => {
    this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement });
  }

  getFeaturesView() {
    return <SectionList
      sections={this.state.advertisementList}
      keyExtractor={(item, index) => item.key}
      renderItem={({ item }) => <View style={styles.flex}><AdvertisementGridView onItemPress={this.redirectToAdvertisementDetail} listkey={item.key} advertisementList={item.features}/></View>}
      renderSectionHeader={({ section: { outlet } }) => (
        <Text style={styles.outlet}>{outlet}</Text>
      )}
      ListEmptyComponent={() => <View style={{marginTop: 40}}>
        <EmptyListMessage message={`No features found for brand ${this.state.brand}`}/>
      </View>}/>
  }

  getInitialView() {
    return this.state.initial && <View style={[styles.flex, {marginTop: 40}]}>
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
            <HeaderBar title={'SEARCH'}></HeaderBar>
            <View style={styles.mainContainer}>
              <View style={styles.autoSuggestContainer}>
                <AutoSuggestComponent onBrandSelect={this.onBrandSelect}/>
              </View>
              <View style={[styles.flex, {marginTop: 40}]}>
                  { this.getView() }
              </View>
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
    zIndex: 5,
    elevation: 5
  },
  outlet: {
    marginTop: 30,
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
