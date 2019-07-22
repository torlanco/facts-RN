import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';

// Component
import { HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";

// Models

import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import Swiper  from 'react-native-deck-swiper';
import { AdvertisementDeckSwiperCard } from './components/AdvertisementDeckSwiperCard';
import { colors } from '@styles';
import { mapDispatchToProps } from '@actions/advertisement';
import { IAdvertisement } from '@interfaces/advertisement';
import { LoadingScreen } from '@screens';

// props
interface ParamType {
  category: string;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IAdvertisement.DispatchFromProps;

// state
interface IState {
  page: number,
  limit: number,
  advertisements: IAdvertisement.IAdvertisementData[],
  currentCard: IAdvertisement.IAdvertisementData,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.advertisement.loading,
  }
};

class AdvertisementDeckSwiperScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
      advertisements: [],
      currentCard: {}
    };

    this.fetchAdvertisementsForReview();
  }

  async fetchAdvertisementsForReview() {
    const { category } = this.props.navigation.state.params;
    const advertisements: any = await this.props.fetchAdvertisementsForReview(category, this.state.page, this.state.limit);
    this.setState({
      advertisements: advertisements,
      currentCard: advertisements[0]
    });
  }

  async updateAdvertisementsForReview(prevCardIndex: number) {
    const advertisement = this.state.currentCard;
    this.onSwipedChangeCurrentData(prevCardIndex);
    await this.props.updateAdvertisementsForReview(advertisement);
  }

  onSwipedChangeCurrentData (prevCardIndex: number) {
    // When a new card is loaded in the front of the deck. Use onSwiped event and set the next card index
    if (prevCardIndex + 1 < this.state.advertisements.length) {
      this.onUpdateCurrentCardData(this.state.advertisements[prevCardIndex+1]);  
    }
  }

  onUpdateCurrentCardData = (updatedData: IAdvertisement.IAdvertisementData) => {
    this.setState({
      currentCard: updatedData
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSwipedLeft = (prevCardIndex: number) => {
    this.onSwipedChangeCurrentData(prevCardIndex);
  };

  onSwipedRight = (prevCardIndex: number) => {
    this.updateAdvertisementsForReview(prevCardIndex);
  };

  dragStart = (event : any) => {
    console.log(event);  
  }

  dragEnd = (event: any) => {
    console.log(event);    
  }

  onHeaderRightIconClick = () => {
    this.props.navigation.navigate('SelectCategoryScreen', { isExternalCall: true });
  };

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <HeaderBar title={'Review Features'} titleStyle={{textAlign: 'left'}}
                  rightIcon="filter" onRightIconClick={this.onHeaderRightIconClick}></HeaderBar>
            { this.state.advertisements && this.state.advertisements.length ?
              <View style={styles.flex}>
                <Swiper
                    useViewOverflow={Platform.OS === 'ios'}
                    cards={this.state.advertisements}
                    renderCard={(card: any) => {
                        return (
                          <AdvertisementDeckSwiperCard advertisement={card} onDataChange={this.onUpdateCurrentCardData}></AdvertisementDeckSwiperCard>
                        )
                    }}
                    onSwiped={this.onSwiped}
                    onSwipedLeft={this.onSwipedLeft}
                    onSwipedRight={this.onSwipedRight}
                    dragStart={(event) => this.dragStart(event)}
                    dragEnd={this.dragEnd}
                    cardIndex={0}
                    stackSize= {2}
                    verticalSwipe={false}
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    showSecondCard={true}
                    backgroundColor={colors.WHITE}
                    cardVerticalMargin={30}
                    cardHorizontalMargin={0}>
                </Swiper>
              </View> : null }
          </View>
          {(this.props.loading) && <LoadingScreen />}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementDeckSwiperScreen);
