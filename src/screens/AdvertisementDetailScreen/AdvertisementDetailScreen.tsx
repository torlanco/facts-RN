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

import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";
import { Text, Divider, Icon } from 'react-native-elements';
import { LoadingScreen } from '@screens';
import FullWidthImage from 'react-native-fullwidth-image';
import { formatDate } from '@utils';

// props
interface ParamType {
  outlet: IOutlet.IOutletData;
  shopper: IShopper.IShopperData;
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

}

class AdvertisementDetailScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const { outlet, shopper, advertisement } = this.props.navigation.state.params;
    const { category, type, brand, sprice, rprice, sizeMeasure, image } = advertisement;
    const imageSource = require('@assets/images/placeholder.png');
    const dateRange = new DateRange(outlet.earliestStartDate, outlet.latestEndDate);

    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <HeaderBar title={'Features'} dateRange={dateRange} titleStyle={{textAlign: 'left'}}></HeaderBar>
            <Text style={[styles.name, styles.padding]}>{brand}</Text>
            <View style={[styles.detail, styles.flexContainer]}>
              <Text style={[styles.pieces, styles.flex]}>{sizeMeasure}</Text>
              <View>
                <Text style={[styles.price]}>${sprice}</Text>
                <Text style={[styles.originalPrice]}>${rprice}</Text>  
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.imageContainer}>
              {image ? <FullWidthImage style={ styles.image } source={{ uri: image }} /> 
                : <FullWidthImage style={ styles.image } source={imageSource} /> }          
              <Divider style={[styles.divider, styles.categoryDividerPadding]} />
              <View style={styles.flexContainer}>
                <View style={styles.flex}>
                  <Text style={styles.category}>{category}</Text>
                  <Text style={styles.type}>{type}</Text>
                </View>
                <Icon
                  name='map-pin'
                  type='feather'
                  color={colors.LIGHT_ORANGE}
                  size={14}
                  containerStyle={styles.iconContainer} />
                <Text style={[styles.outlet]}>{outlet.outlet}</Text>
              </View>
            </View>
            <Text style={[styles.note]}>* Valid {formatDate(outlet.earliestStartDate)} - {formatDate(outlet.latestEndDate)}</Text>
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
  },
  text: {
    ...typos.HEADLINE,
    textAlign: 'center'
  },
  padding: {
    padding: 2,
  },
  detail: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  name: {
    ...typos.HEADLINE,
    color: colors.TEXT_PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  pieces: {
      ...typos.SECONDARY,
      color: colors.TEXT_SECONDARY
  },
  price: {
    ...typos.TITLE,
    color: colors.TEXT_SECONDARY, 
    textAlign: 'right', 
    lineHeight: 28,
    marginTop: -5,
    marginRight: -10 
  },
  originalPrice: {
    ...typos.SMALL,
    color: colors.LIGHT_ORANGE,  
    textAlign: 'right', 
    marginRight: -10 
  },
  imageContainer: {
    padding: 20,
    backgroundColor: colors.LIGHTEST_GRAY,
  },
  image: {
    borderRadius: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flex: {
    flex: 1
  },
  category: {
    ...typos.SECONDARY,
    fontWeight: 'bold',  
  },
  type: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY
  }, 
  iconContainer: {
    width: responsive(30),
  },
  categoryDividerPadding: {
    marginTop: 20,
    marginBottom: 20
  },
  outlet: {
    ...typos.SECONDARY,
  },
  divider: {
    backgroundColor: colors.LIGHTER_GRAY,
    height: 2,
    marginHorizontal: -10,
  },
  note: {
    ...typos.SECONDARY,
    color: colors.TEXT_NOTE,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
});

export { AdvertisementDetailScreen };
