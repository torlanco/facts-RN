import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { typos, colors, responsive } from '@styles';

// Component
import { HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";

// Models
import { IAdvertisement } from '@interfaces/advertisement';
import { IShopper } from '@interfaces/shopper';
import { IOutlet } from '@interfaces/outlet';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { Text, Divider, Icon, Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { formatDate } from '@utils';
import { mapDispatchToProps } from '@actions/advertisement';
import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

// props
interface ParamType {
  outlet?: IOutlet.IOutletData;
  shopper?: IShopper.IShopperData;
  advertisement: IAdvertisement.IAdvertisementData;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
  isLoggedIn?: boolean;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  featureImage: any,
  outletImage: any,
  isFavorite: boolean | undefined,
  loading: boolean
}

const mapStateToProps = function(state: any){
  return {
    isLoggedIn: !!state.user.loggedInUser,
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
}

class AdvertisementDetailScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  outletImage: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      featureImage: require('@assets/images/placeholder.png'),
      outletImage: require('@assets/images/placeholder.png'),
      isFavorite: props.navigation.state.params.advertisement.isFavorite,
      loading: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { advertisement, outlet } = this.props.navigation.state.params;
    if (advertisement.image) {
      Image.getSize(advertisement.image, (width: number, height: number) => {
          this.setState({
              featureImage: advertisement.image
          });
      }, err => {});
    }

    this.outletImage =  outlet && outlet.outletImage
       ? outlet.outletImage : advertisement.outletImage
    if (this.outletImage) {
        Image.getSize(this.outletImage, (width: number, height: number) => {
            this.setState({
                outletImage: this.outletImage
            });
        }, err => {});
    }
    this.incrementFeatureViewCount();
  }

  incrementFeatureViewCount = async () => {
    const { advertisement } = this.props.navigation.state.params;
    const response = await this.props.incrementFeaturesViewCount(advertisement.id || '');
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleFavourite = async () => {
      const { advertisement } = this.props.navigation.state.params;
      if (this.props.isLoggedIn) {
        this.setState({
          loading: true
        });
        const response : any = await this.props.toggleFavoriteFeature(advertisement.id);
        if (response.isFavorite != undefined) {
          this.setState({
              isFavorite: response.isFavorite,
              loading: false
          });
        }
      }
  }

  public render() {
    const { outlet, advertisement } = this.props.navigation.state.params;
    const { type, brand, sprice, rprice, sizeMeasure } = advertisement;

    const favouriteContainer: any = {};
    if (this.state.isFavorite) {
      favouriteContainer.backgroundColor = colors.PRIMARY;
    } else {
      favouriteContainer.backgroundColor = 'rgba(235, 235, 235, 0.9)';
    }

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHTEST_GRAY }}>
        <View style={styles.container}>
          <HeaderBar title={'DETAIL'}></HeaderBar>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card containerStyle={[styles.mainContainer]}>
              <Card containerStyle={[styles.imageContainer]}>
                <Card containerStyle={styles.outletImage}>
                 { this.state.outletImage == this.outletImage ?
                    <FullWidthImage style={ styles.image } source={{ uri: this.state.outletImage }}/> :
                    <Image style={[styles.image, { height: 40 }]} source={ this.state.outletImage } resizeMode="stretch"/> }
                </Card>

                { this.state.featureImage == advertisement.image ?
                  <FullWidthImage style={[styles.image, styles.featureImage]} source={{ uri: this.state.featureImage }}/> :
                  <Image style={[styles.image, { minHeight: 200 }]} source={ this.state.featureImage } resizeMode="stretch"/> }

                { this.props.isLoggedIn ? <TouchableOpacity onPress={this.toggleFavourite} style={[styles.favouriteContainer, favouriteContainer]}>
                  <Icon
                      name={'heart'}
                      type={this.state.isFavorite ? 'font-awesome' : 'feather'}
                      color={colors.BLACK}
                      size={16}/>
                  </TouchableOpacity> : null }
              </Card>
              <View style={styles.details}>
                <Text style={[styles.brand, styles.flex, styles.horizontalPadding]}>{brand}</Text>
                <View style={[styles.row, { alignSelf: 'flex-end' }]}>
                  <Text style={[styles.outlet, styles.link]}>{outlet ? outlet.outlet : advertisement.outlet}</Text>
                  <Icon
                    name='map-pin'
                    type='feather'
                    color={colors.LIGHT_ORANGE}
                    size={14}
                    containerStyle={styles.iconContainer} />
                </View>
                <Text style={[styles.text, styles.flex, styles.horizontalPadding]}>{sizeMeasure}</Text>
                <Text style={[styles.text, styles.horizontalPadding]}>{type}</Text>

                <Divider style={styles.divider}/>
                <View style={[styles.row]}>
                  <View style={{marginRight: 20}}>
                    <Text style={[styles.label, {width: 100}]}>Special Price</Text>
                  </View>
                  <View>
                    <Text style={styles.label}>Regular Price</Text>
                  </View>
                </View>
                <Divider style={styles.divider}/>
                <View style={[styles.row]}>
                  <View style={{marginRight: 20}}>
                    <Text style={[styles.prices, {width: 100}]}>${sprice}</Text>
                  </View>
                  <Divider style={styles.divider}/>
                  <View>
                    <Text style={[styles.prices, styles.disabled]}>${rprice}</Text>
                  </View>
                </View>

                <Divider style={styles.divider}/>
                <View style={styles.horizontalPadding}>
                  <Text style={[styles.label]}>Outlet</Text>
                  <Text style={[styles.text, styles.link]}>{outlet ? outlet.outlet : advertisement.outlet}</Text>
                  { outlet &&
                    <View>
                      <Text style={styles.label}>Validity</Text>
                      <Text style={[styles.text]}>Valid from <Text style={styles.bold}>{formatDate(outlet.earliestStartDate)} until</Text> {formatDate(outlet.latestEndDate)}</Text>
                    </View>
                  }
                </View>
              </View>
            </Card>
          </ScrollView>
        </View>
        { this.state.loading && <LoadingScreen/> }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    },
  mainContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0,
    shadowOpacity: 0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: colors.LIGHTEST_GRAY,
    elevation: 0,
    shadowRadius: 0,
    padding: 0,
  },
  imageContainer: {
    position: "relative",
    flexDirection: "column",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    margin: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    minHeight: 200,
  },
  padding: {
    paddingVertical: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  featureImage: {
    minHeight: 200,
  },
  boldText: {
    ...typos.HEADLINE,
    color: colors.TEXT_PRIMARY
  },
  type: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY,
  },
  prices: {
    ...typos.HEADLINE,
    color: colors.TEXT_PRIMARY
  },
  disabled: {
    color: colors.TEXT_SECONDARY
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15 ,
  },
  flex: {
    flex: 1
  },
  details: {
    backgroundColor: colors.LIGHTEST_GRAY,
    paddingVertical: 15,
  },
  label: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    ...typos.PRIMARY_LIGHT,
    color: colors.BLACK,
  },
  bold: {
    fontWeight: 'bold'
  },
  divider: {
    marginTop: 10,
  },
  iconContainer: {
    width: responsive(30),
    marginRight: -5,
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  },
  outlet: {
    ...typos.PRIMARY_MEDIUM
  },
  horizontalPadding: {
    paddingHorizontal: 15,
  },
  brand: {
    ...typos.SUBHEADLINE,
  },
  outletImage: {
      height: 40,
      width: 40,
      borderRadius: 5,
      shadowColor: colors.WHITE,
      padding: 0,
      margin: 0,
      marginRight: 5,
      justifyContent: 'center',
      position: "absolute",
      zIndex: 3,
      elevation: 3,
      right: 0,
      top: 5,
  },
  favouriteContainer: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const AdvertisementDetailScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(AdvertisementDetailScreen);
export { AdvertisementDetailScreenWrapper as AdvertisementDetailScreen }
