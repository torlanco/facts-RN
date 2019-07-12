import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';

// Component
import { HeaderBar, DateRange } from '@components';
import { StatusBar, Platform } from "react-native";

// Models
import { IOutlet } from '@interfaces/outlet';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import Swiper  from 'react-native-deck-swiper';
import { AdvertisementDeckSwiperCard } from './components/AdvertisementDeckSwiperCard';
import { colors } from '@styles';

// props
interface ParamType {
  outlet: IOutlet.IOutletData;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps;

// state
interface IState {

}

const mapStateToProps = function(state: any){
  return {
    advertisements: state.advertisement.advertisements,
    categories: state.advertisement.categories,
  }
}

class AdvertisementDeckSwiperScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSwipedLeft = () => {
    console.log('Left Swipe');
  };

  onSwipedRight = () => {
    console.log('Right Swipe');
  };

  public render() {
    const { outlet } = this.props.navigation.state.params;
    const dateRange = new DateRange(outlet.earliestStartDate, outlet.latestEndDate);
    
    return (
      <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <HeaderBar title={'Features'} dateRange={dateRange} titleStyle={{textAlign: 'left'}}></HeaderBar>
            <View style={styles.flex}>
              <Swiper
                  useViewOverflow={Platform.OS === 'ios'}
                  cards={this.props.advertisements}
                  renderCard={(card: any) => {
                      return (
                        <AdvertisementDeckSwiperCard advertisement={card}></AdvertisementDeckSwiperCard> 
                      )
                  }}
                  onSwipedLeft={this.onSwipedLeft}
                  onSwipedRight={this.onSwipedRight}
                  cardIndex={0}
                  stackSize= {1}
                  verticalSwipe={false}
                  disableTopSwipe={true}
                  disableBottomSwipe={true}
                  backgroundColor={colors.WHITE}
                  cardVerticalMargin={30}
                  cardHorizontalMargin={10}>
              </Swiper>
          </View>
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
  flex: {
    flex: 1
  },
});

export default connect(mapStateToProps, null)(AdvertisementDeckSwiperScreen);
