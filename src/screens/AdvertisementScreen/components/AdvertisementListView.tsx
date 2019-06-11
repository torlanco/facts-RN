import * as React from 'react';
import {
    FlatList
} from 'react-native';
import { IAdvertisement } from '@interfaces/advertisement';
import { AdvertisementListItem } from './AdvertisementListItem';

interface IOwnProps {
  advertisementList: Array<IAdvertisement.IAdvertisementData>
}
type IProps = IOwnProps;
const AdvertisementListView: React.SFC<IProps> = (props: IProps) => {
  return (
    <FlatList
      data={props.advertisementList}
      renderItem={({ item }) => <AdvertisementListItem advertisement={item}></AdvertisementListItem>} 
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}/>
  );
};

export { AdvertisementListView };
