import * as React from 'react';

// UI
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, RefreshControl } from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';
import { OutletCard } from './components/OutletCard';
import Channels from './components/Channels';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { typos, colors } from '@styles';
import { SkypeIndicator } from 'react-native-indicators';

// Misc
import _ from 'lodash'

interface IOwnProps {
  onlyOutlets?: boolean;
  forHomeScreen?: boolean;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IOutlet.StateToProps &
  IOutlet.DispatchFromProps;

interface IState {
  selectedTab: string,
  outletList: Array<IOutlet.IOutletData>,
  channels: string[],
  sectionOneOutlet: Array<IOutlet.IOutletData>,
  sectionTwoOutlet: Array<IOutlet.IOutletData>,
  loading: boolean,
  refreshing: boolean
}

const mapStateToProps = function (state: any) {
  return {
    outlets: state.outlet.outlets,
    channels: state.outlet.channels,
    loading: state.outlet.loading,
  }
}

class OutletScreen extends React.Component<IProps, IState> {
  viewabilityConfig: Record<string, any>;
  channelListRef: React.RefObject<any>;
  outletListRef: React.RefObject<any>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedTab: '',
      outletList: [],
      channels: [],
      sectionOneOutlet: [],
      sectionTwoOutlet: [],
      loading: true,
      refreshing: false
    };

    this.fetchOutlets();
    this.viewabilityConfig = {
      itemVisiblePercentThreshold: 35,
      minimumViewTime: 0,
    };
    this.channelListRef = React.createRef();
    this.outletListRef = React.createRef();
  }

  getGroupedOutlets = (outlets: IOutlet.IOutletData[]) => _.sortBy(outlets, ['channelName']);
  
  async fetchOutlets(onRefresh?: boolean) {
    await this.props.fetchOutlets();
    this.setState({
      channels: (this.props.channels ? this.props.channels : []),
      selectedTab: (this.props.channels ? this.props.channels[0] : ''),
      loading: false,
      refreshing: onRefresh ? false : this.state.refreshing,
      outletList: this.props.outlets ? this.getGroupedOutlets(this.props.outlets) : [],
    });
    if (this.props.forHomeScreen) {
      this.setOutletsForHomeScreen();
    }
  }

  setOutletsForHomeScreen = () => {
    let outletList: Array<IOutlet.IOutletData>;
    if (!this.props.outlets) {
        outletList = [];
    } else {
      outletList = this.props.outlets ? 
          (this.props.outlets.length > 10 ? this.props.outlets.slice(0, 10) : this.props.outlets) : [];
    }
    let sectionOneOutlet: IOutlet.IOutletData[] = outletList.filter((item, index) => {
      if (!(index & 1)) {
        return item;
      }
    })

    let sectionTwoOutlet: IOutlet.IOutletData[] = outletList.filter((item, index) => {
      if (index & 1) {
        return item;
      }
    })
    this.setState({
      sectionOneOutlet,
      sectionTwoOutlet
    })
  };

  scrollToOutLet(channel: string) {
    let outletIndex = 0;
    let outletFound =  false;
    this.state.outletList.map((outlet, i) => {
      if (outlet.channelName === channel && !outletFound) {
        outletIndex = i;
        outletFound = true;
        return;
      }
    })
    this.outletListRef?.current?.scrollToIndex({
      index: outletIndex
    });
  }

  onItemPress = (outlet: IOutlet.IOutletData) => {
    this.props.navigation.navigate('ShopperScreen', {
      outlet
    });
  }

  onActionButtonPress = (buttonText: string) => {
    this.setState({
      selectedTab: buttonText,
    });
    this.scrollToOutLet(buttonText);
  }

  onRefresh = () => {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true });
      this.fetchOutlets(true);
    }
  }

  scrollToChannel = (selectedChannel: string) => {
    let itemIndex = 0;
    this.state.channels.map((channel, i) => {
      if (channel === selectedChannel) itemIndex = i;
      return;
    })
    this.channelListRef?.current?.scrollToIndex({
      index: itemIndex
    });
  };

  getSelectedChannel = (itemsInViewPort: Record<string, any>[]) => {
    return itemsInViewPort[0]?.item?.channelName;
  };

  onViewableItemsChanged = ({ viewableItems, changed }: { viewableItems: Record<string, any>[]; changed: Record<string, any>[] }) => {
    this.getSelectedChannel(viewableItems)
    this.setState({ selectedTab: this.getSelectedChannel(viewableItems) })
    this.scrollToChannel(this.getSelectedChannel(viewableItems));
  }

  getListLayout = () => {
    if (this.props.forHomeScreen) {
      return (
        <View style={styles.row}>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.sectionOneOutlet}
            keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
            renderItem={({ item }) => <OutletCard outlet={item} onItemPress={this.onItemPress} />}
            enableEmptySections={true}
            extraData={this.state.sectionOneOutlet.toString()} />
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.sectionTwoOutlet}
            keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
            renderItem={({ item }) => <OutletCard outlet={item} onItemPress={this.onItemPress} />}
            enableEmptySections={true}
            extraData={this.state.sectionOneOutlet.toString()} />
        </View>
      )
    } else {
      return (
        <FlatList
          ref={this.outletListRef}
          contentContainerStyle={styles.list}
          data={this.state.outletList}
          keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
          renderItem={({ item }) => <OutletCard outlet={item} onItemPress={this.onItemPress} />}
          enableEmptySections={true}
          viewabilityConfig={this.viewabilityConfig}
          onViewableItemsChanged={this.onViewableItemsChanged}
          extraData={this.state.outletList.toString()}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="rgba(0,0,0,0.5)" />
          )}
        />
      )
    }
  };

  public render() {
    const { onlyOutlets, loading } = this.props;
    const containerStyle: any = {};
    if (onlyOutlets) {
      containerStyle.marginTop = 0
      containerStyle.paddingTop = 0
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, containerStyle]}>
          {!onlyOutlets && <HeaderBar title={'OUTLETS'} />}
          {onlyOutlets && this.state.loading && <SkypeIndicator color={colors.PRIMARY} />}
          <View style={styles.mainContainer}>
            {!onlyOutlets && <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Channels
                listRef={this.channelListRef}
                channels={this.state.channels}
                selectedTab={this.state.selectedTab}
                onChannelSelect={this.onActionButtonPress}
              />
              {this.state.outletList.length ?
                <Text style={styles.itemCountContainer}>
                  <Text
                    style={styles.itemCount}
                  >
                    {`${this.state.outletList.length} ITEM${this.state.outletList.length > 1 ? 'S' : ''}`}
                  </Text>
                </Text> : null}
            </View>}
            <View style={styles.wrapper}>
                {this.getListLayout()}
            </View>
          </View>
        </View>
        {loading && !onlyOutlets && !this.state.refreshing && <LoadingScreen />}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    flex: 1,
    backgroundColor: colors.LIGHTEST_GRAY
  },
  mainContainer: {
    paddingHorizontal: '4%',
    flex: 1
  },
  itemCountContainer: {
    ...typos.PRIMARY_MEDIUM,
    color: colors.TEXT_PRIMARY,
    marginTop: 10,
    paddingLeft: 5
  },
  itemCount: {
    ...typos.TITLE,
    color: colors.TEXT_PRIMARY,
  },
  wrapper: {
    maxHeight: '85%',
    overflow: 'scroll',
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  }
});

const OutletScreenWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(OutletScreen));
export { OutletScreenWrapper as OutletScreen }