import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { typos, colors, responsive } from '@styles';

// Component
import { HeaderBar, DateRange } from '@components';
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
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.StateToProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  featureImage: any,
}

const mapStateToProps = function(state: any){
  return {
    loading: state.outlet.loading ||
      state.shopper.loading ||
      state.advertisement.loading
  }
}

class AdvertisementDetailScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      featureImage: require('@assets/images/placeholder.png')
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { advertisement } = this.props.navigation.state.params;
    if (advertisement.image) {
      Image.getSize(advertisement.image, (width: number, height: number) => {
          this.setState({ 
              featureImage: advertisement.image
          });
      }, err => {});
    }
    this.incrementFeatureViewCount();
  }

  incrementFeatureViewCount = async () => {
    const { advertisement } = this.props.navigation.state.params;
    const response = await this.props.incrementFeaturesViewCount(advertisement.id || '');
    console.log(response);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const { outlet, advertisement } = this.props.navigation.state.params;
    const { type, brand, sprice, rprice, sizeMeasure } = advertisement;
    let dateRange = undefined;
    if (outlet) {
      dateRange = new DateRange(outlet.earliestStartDate, outlet.latestEndDate);
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHTEST_GRAY }}>
        <View style={styles.container}>
          <HeaderBar title={'DETAIL'}></HeaderBar>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card containerStyle={[styles.mainContainer]}>
              <Card containerStyle={[styles.imageContainer]}>
                { this.state.featureImage == advertisement.image ?
                  <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
                  <Image style={[styles.image, { height: 200 }]} source={ this.state.featureImage } resizeMode="stretch"/> }  
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
                    <Text style={styles.label}>Special Price</Text>
                  </View>
                  <View>
                    <Text style={styles.label}>Regular Price</Text>
                  </View>
                </View>
                <Divider style={styles.divider}/>
                <View style={[styles.row]}>
                  <View style={{marginRight: 20}}>
                    <Text style={styles.prices}>${sprice}</Text>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    margin: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  padding: {
    paddingVertical: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
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
  }   
});

const AdvertisementDetailScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(AdvertisementDetailScreen);
export { AdvertisementDetailScreenWrapper as AdvertisementDetailScreen }