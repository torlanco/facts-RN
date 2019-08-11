import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    ListView, FlatList
} from 'react-native';
import { IAdvertisement } from '@interfaces/advertisement';
import { AdvertisementGridItem } from './AdvertisementGridItem';

interface IOwnProps {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  onItemPress?: Function
}
type IProps = IOwnProps;
const AdvertisementGridView: React.SFC<IProps> = (props: IProps) => {

  const sectionOneAdvertisement = props.advertisementList.filter((item, index) => {
    if (!(index & 1)) {
      return item;
    }
  });

  const sectionTwoAdvertisement = props.advertisementList.filter((item, index) => {
    if (index & 1) {
      return item;
    }
  });

  const datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  const onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    if (props.onItemPress)
        props.onItemPress(advertisement);
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={datasource.cloneWithRows(sectionOneAdvertisement)}
          keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id}
          renderRow={(item) => <AdvertisementGridItem advertisement={item} onItemPress={onItemPress}/>}
          enableEmptySections={true}/>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={datasource.cloneWithRows(sectionTwoAdvertisement)}
          keyExtractor={(item: IAdvertisement.IAdvertisementData) => item.id}
          renderRow={(item) => <AdvertisementGridItem advertisement={item} onItemPress={onItemPress}/>}
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
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  }
});

export { AdvertisementGridView };
