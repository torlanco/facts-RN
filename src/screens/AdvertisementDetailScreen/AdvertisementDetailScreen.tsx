import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { typos, colors, responsive } from '@styles';

// Component
import { HeaderBar, DateRange } from '@components';
import { StatusBar, Platform } from "react-native";

// Models
import { IAdvertisement } from '@interfaces/advertisement';
import { IShopper } from '@interfaces/shopper';
import { IOutlet } from '@interfaces/outlet';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";
import { Text, Divider, Icon, Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { formatDate } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';

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
  IAdvertisement.StateToProps;

// state
interface IState {
  featureImage: any,
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <HeaderBar title={'DETAIL'}></HeaderBar>
            <Card containerStyle={[styles.mainContainer]}>
              <Card containerStyle={[styles.imageContainer]}>
                { this.state.featureImage == advertisement.image ?
                  <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
                  <Image style={[styles.image, { height: 200 }]} source={ this.state.featureImage } resizeMode="stretch"/> }  
              </Card>
            </Card>
            <View style={styles.details}>
              <View style={{paddingHorizontal: 15}}>    
                <View style={styles.row}>
                  <Text style={[styles.headingText, styles.flex]}>{brand}</Text>
                  <Icon
                    name='map-pin'
                    type='feather'
                    color={colors.LIGHT_ORANGE}
                    size={14}
                    containerStyle={styles.iconContainer} />
                    <Text style={[styles.text, styles.bold]}>{outlet?.outlet}</Text>
                </View>
                <Text style={[styles.text, styles.padding, styles.flex]}>{sizeMeasure}</Text>
                <Text style={[styles.text, styles.padding]}>{type}</Text>
              </View> 

              <Divider style={styles.divider}/>
              <View style={[styles.row, {paddingHorizontal: 15}]}>
                <View style={{marginRight: 20}}>
                  <Text style={styles.label}>Special Price</Text>
                  <Text style={styles.headingText}>${sprice}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Regular Price</Text>
                  <Text style={[styles.headingText, styles.disabled]}>${rprice}</Text>
                </View>
              </View>

              { outlet &&  
                <View>
                  <Divider style={styles.divider}/>
                    <View style={{paddingHorizontal: 15}}>
                    <Text style={styles.label}>Outlet</Text>
                    <Text style={styles.text}>{outlet.outlet}</Text>
                    <Text style={styles.label}>Validity</Text>
                    <Text style={[styles.text]}>Valid from <Text style={styles.bold}>{formatDate(outlet.earliestStartDate)} until</Text> {formatDate(outlet.latestEndDate)}</Text>
                  </View> 
                </View> }
            </View>
          </View>
        </ScrollView>
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
    borderRadius: 10,
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
    borderRadius: 0,
    padding: 15,
    margin: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    borderTopRightRadius: 10, 
    borderTopLeftRadius: 10,
    shadowOpacity: 0,
    elevation: 0,
  },
  padding: {
    paddingVertical: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
  },
  boldText: {
    ...typos.HEADLINE,
    color: colors.TEXT_PRIMARY
  },
  type: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY,
  },
  pieces: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY
  },
  headingText: {
    ...typos.HEADLINE1,
    color: colors.TEXT_PRIMARY  
  },
  disabled: {
    color: colors.TEXT_SECONDARY
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1
  },
  details: {
    backgroundColor: colors.LIGHTEST_GRAY, 
    paddingVertical: 15, 
    paddingHorizontal: 20 ,
    borderBottomRightRadius: 10, 
    borderBottomLeftRadius: 10
  },
  label: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    ...typos.PRIMARY,
    color: colors.BLACK,
  },
  bold: {
    fontWeight: 'bold'
  },
  divider: {
    marginTop: 10 
  },
  iconContainer: {
    width: responsive(40),
  },    
});

export { AdvertisementDetailScreen };
