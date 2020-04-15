import * as React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Dimensions,
    RefreshControl
} from 'react-native';
import { IAdvertisement } from '@interfaces/advertisement';
import { AdvertisementGridItem } from './AdvertisementGridItem';
import { IOutlet } from '@interfaces/outlet';
import { colors } from '@styles';

interface IOwnProps {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  onItemPress?: Function
  outlet?: IOutlet.IOutletData;
  listkey?: string;
  onItemToggleFavourite?: Function;
  onScrollEndReached?: Function;
  refreshing: boolean;
  onRefresh?: Function;
}
type IProps = IOwnProps;

interface IState {}
class AdvertisementGridView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {}
  }

  sectionOneAdvertisement = () => this.props.advertisementList ? this.props.advertisementList.filter((item, index) => {
    if (!(index & 1)) {
      return item;
    }
  }) : [];

  sectionTwoAdvertisement = () => this.props.advertisementList ? this.props.advertisementList.filter((item, index) => {
    if (index & 1) {
      return item;
    }
  }) : [];

  onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    if (this.props.onItemPress)
        this.props.onItemPress(advertisement);
  }

  onToggleFavourite = (data: any) => {
    if (this.props.onItemToggleFavourite) {
      this.props.onItemToggleFavourite(data);
    }
  }

  onScrollEndReached = (event: any) => {
    let windowHeight = Dimensions.get('window').height,
        height = event.nativeEvent.contentSize.height,
        offset = event.nativeEvent.contentOffset.y;
    if( windowHeight + offset >= height && this.props.onScrollEndReached) {
      this.props.onScrollEndReached();
    }
  }

  onRefresh = () => {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  render() {
    return (
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false} onMomentumScrollEnd={this.onScrollEndReached}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.onRefresh}
            tintColor="rgba(0,0,0,0.5)"
          />
        }>
        <View style={styles.container}>
          <FlatList
            listKey={(this.props.listkey ? this.props.listkey : '') + '_section1'}
            contentContainerStyle={styles.list}
            data={this.sectionOneAdvertisement()}
            keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id ? item.id.toString() + item.isFavorite : item.dummyId?.toString() }
            renderItem={({item}) => <AdvertisementGridItem advertisement={item} onItemPress={this.onItemPress}
              outlet={this.props.outlet} onToggleFavourite={this.onToggleFavourite}/>}
            enableEmptySections={true}/>
          <FlatList
            listKey={(this.props.listkey ? this.props.listkey : '') + '_section2'}
            contentContainerStyle={styles.list}
            data={this.sectionTwoAdvertisement()}
            keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id ? item.id.toString() + item.isFavorite : item.dummyId?.toString()}
            renderItem={({item}) => <AdvertisementGridItem advertisement={item} onItemPress={this.onItemPress}
              outlet={this.props.outlet} onToggleFavourite={this.onToggleFavourite}/>}
            enableEmptySections={true}/>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  }
});

export { AdvertisementGridView };
