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

interface IOwnProps {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  onItemPress?: Function
  outlet?: IOutlet.IOutletData;
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

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={styles.list}
          data={sectionOneAdvertisement}
          keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id ? item.id.toString() : item.dummyId?.toString() }
          renderItem={({item}) => <AdvertisementGridItem advertisement={item} onItemPress={onItemPress} outlet={props.outlet}/>}
          enableEmptySections={true}/>
        <FlatList
          contentContainerStyle={styles.list}
          data={sectionTwoAdvertisement}
          keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id ? item.id.toString() : item.dummyId?.toString()}
          renderItem={({item}) => <AdvertisementGridItem advertisement={item} onItemPress={onItemPress} outlet={props.outlet}/>}
          enableEmptySections={true}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
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
