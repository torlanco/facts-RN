import * as React from 'react';
import {
    FlatList
} from 'react-native';
import { IAdvertisement } from '@interfaces/advertisement';
import { AdvertisementListItem } from './AdvertisementListItem';

interface IOwnProps {
  advertisementList: Array<IAdvertisement.IAdvertisementData>,
  onItemPress?: Function
}
type IProps = IOwnProps;
const AdvertisementListView: React.SFC<IProps> = (props: IProps) => {

  const onItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
    if (props.onItemPress) 
        props.onItemPress(advertisement);
  }

  return (
    <FlatList
      data={props.advertisementList}
      renderItem={({ item }) => <AdvertisementListItem advertisement={item} onItemPress={onItemPress}></AdvertisementListItem>} 
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}/>
  );
};

export { AdvertisementListView };
