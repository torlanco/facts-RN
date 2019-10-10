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
import { responsive, colors, typos } from '@styles';
import { mapDispatchToProps } from '@actions/advertisement';
import { IAdvertisement } from '@interfaces/advertisement';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Text } from 'react-native-elements';
import { capitalize } from '@utils';

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
  advertisements: IAdvertisement.IAdvertisementData[],
  totalAdvertisments: number,
  loading: boolean
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.advertisement.loading,
  }
};

class AdvertisementDeckSwiperScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  page: number = 1;
  limit: number = 2;
  nextAdvertisements: IAdvertisement.IAdvertisementData[] = [];
  currentCard: any = {};
  _swiper: any;
  currentIndex: number = 0;

  constructor(props: IProps) {
    super(props);
    this.nextAdvertisements = [];
    this.state = {
      advertisements: [],
      totalAdvertisments: -1,
      loading: false
    };
  }

  componentDidMount() {
    this.fetchAdvertisementsForReview();
  }

  async fetchAdvertisementsForReview() {
    const { category } = this.props.navigation.state.params;
    const data: any = await this.props.fetchAdvertisementsForReview(category, this.page, this.limit);
    if (data.features.length) {
      this.currentCard = data.features[0]
    }
    this.setState({
      advertisements: data.features,
      totalAdvertisments: data.total
    });
  }

  updateAdvertisementsForReview = async (prevCardIndex: number) => {
    const advertisement = this.currentCard;
    this.onSwipedChangeCurrentData(prevCardIndex);
    await this.props.updateAdvertisementsForReview(advertisement);
  }

  onSwipedChangeCurrentData = (prevCardIndex: number) => {
    // When a new card is loaded in the front of the deck. Use onSwiped event and set the next card index
    this.currentIndex = prevCardIndex + 1;
    if (prevCardIndex + 1 < this.state.advertisements.length) {
      this.onUpdateCurrentCardData(this.state.advertisements[prevCardIndex+1]);  
    } 
    if (this.currentIndex >= this.state.advertisements.length && this.state.totalAdvertisments) {
      this.setState({
        loading: true
      }, () => {
        this.fetchNextAdvertisementsForReview();
      });
    } else if (this.state.totalAdvertisments != 0) {
      this.fetchNextAdvertisementsForReview();
    }
  }

  fetchNextAdvertisementsForReview = async () => {
    const { category } = this.props.navigation.state.params;
    const data: any = await this.props.fetchAdvertisementsForReview(category, this.page, this.limit - 1, true);
    if (data.features) {
      data.features.forEach((advertisement: IAdvertisement.IAdvertisementData) => {
        this.state.advertisements.push(advertisement);
      });  
      this.setState({
        totalAdvertisments: data.total
      })
      this._swiper.jumpToCardIndex(this.currentIndex);
      setTimeout(() => {
        this.setState({
          loading: false
        });         
      }, 200);
    }
  }

  onUpdateCurrentCardData = (updatedData: IAdvertisement.IAdvertisementData) => {
    this.currentCard = updatedData;
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

  onHeaderRightIconClick = () => {
    this.props.navigation.navigate('SelectCategoryScreen', { isExternalCall: true });
  };

  getNoReviewMessage = () => {
    let {category} = this.props.navigation.state.params;
    return `No more review for \ncategory "${capitalize(category)}"`;
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <HeaderBar title={'Review Features'} style={{paddingHorizontal: '4%'}}
              rightIcon="filter" onRightIconClick={this.onHeaderRightIconClick}></HeaderBar>
            { this.state.advertisements && this.state.advertisements.length && this.state.totalAdvertisments > 0 ? 
              <View style={styles.flex}>
                <Swiper
                    ref={(swiper: any) => this._swiper = swiper}
                    useViewOverflow={Platform.OS === 'ios'}
                    cards={this.state.advertisements}
                    renderCard={(card: any) => {
                        return (
                          <AdvertisementDeckSwiperCard advertisement={card}
                            onDataChange={this.onUpdateCurrentCardData}></AdvertisementDeckSwiperCard>
                        )
                    }}
                    onSwipedLeft={this.onSwipedLeft}
                    onSwipedRight={this.onSwipedRight}
                    cardIndex={0}
                    stackSize= {2}
                    verticalThreshold={100000}
                    showSecondCard={true}
                    backgroundColor={colors.WHITE}
                    cardVerticalMargin={5}
                    cardHorizontalMargin={0} 
                    overlayLabels={{
                      left: {
                        title: 'SKIP',
                        style: {
                          label: {
                            backgroundColor: 'white',
                            borderColor: colors.ERROR,
                            color: colors.ERROR,
                            borderWidth: 3,
                            fontSize: 17,
                            textAlign: 'center'
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            marginTop: 40,
                            marginLeft: -40
                          }
                        }
                      },
                      right: {
                        title: 'APPROVE',
                        style: {
                          label: {
                            backgroundColor: 'white',
                            borderColor: colors.SUCCESS,
                            color: colors.SUCCESS,
                            borderWidth: 3,
                            fontSize: 17,
                            textAlign: 'center'
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginTop: 40,
                            marginLeft: 40
                          }
                        }
                      }
                  }}
                  animateOverlayLabelsOpacity>
                </Swiper>
                <Text style={styles.text}>{`${this.state.totalAdvertisments} Remaining`}</Text>
              </View> : 
              <View style={styles.noMoreReviewView}> 
                <Text style={styles.noMoreReview}>{this.getNoReviewMessage()}</Text>
              </View> }
          </View>
          {(this.props.loading || this.state.loading) && <LoadingScreen />}
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
  text: {
    ...typos.HEADLINE,
    color: colors.LIGHT_ORANGE,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  noMoreReviewView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noMoreReview: {
    ...typos.HEADLINE,
    color: colors.TEXT_SECONDARY,
    textAlign: 'center',
    padding: 25,
  }
});

const AdvertisementDeckSwiperScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(AdvertisementDeckSwiperScreen);
export { AdvertisementDeckSwiperScreenWrapper as AdvertisementDeckSwiperScreen }