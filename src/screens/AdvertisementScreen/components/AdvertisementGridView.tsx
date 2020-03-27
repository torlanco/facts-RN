import * as React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList
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
}
type IProps = IOwnProps;
const AdvertisementGridView: React.SFC<IProps> = (props: IProps) => {

  const sectionOneAdvertisement = props.advertisementList ? props.advertisementList.filter((item, index) => {
    if (!(index & 1)) {
      return item;
    }
  }) : [];

  const sectionTwoAdvertisement = props.advertisementList ? props.advertisementList.filter((item, index) => {
    if (index & 1) {
      return item;
    }
  }) : [];

  const onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    if (props.onItemPress)
        props.onItemPress(advertisement);
  }

  const onToggleFavourite = (data: any) => {
    if (props.onItemToggleFavourite) {
      props.onItemToggleFavourite(data);
    }
  }

  return (
    <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FlatList
          listKey={(props.listkey ? props.listkey : '') + '_section1'}
          contentContainerStyle={styles.list}
          data={sectionOneAdvertisement}
          keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id ? item.id.toString() : item.dummyId?.toString() }
          renderItem={({item}) => <AdvertisementGridItem advertisement={item} onItemPress={onItemPress} outlet={props.outlet} onToggleFavourite={onToggleFavourite}/>}
          enableEmptySections={true}/>
        <FlatList
          listKey={(props.listkey ? props.listkey : '') + '_section2'}
          contentContainerStyle={styles.list}
          data={sectionTwoAdvertisement}
          keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id ? item.id.toString() : item.dummyId?.toString()}
          renderItem={({item}) => <AdvertisementGridItem advertisement={item} onItemPress={onItemPress} outlet={props.outlet} onToggleFavourite={onToggleFavourite}/>}
          enableEmptySections={true}/>
      </View>
    </ScrollView>
  );
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
