import * as React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { IAdvertisement } from '@interfaces/advertisement';
import { AdvertisementGridItem } from './AdvertisementGridItem';
import { FlatGrid } from 'react-native-super-grid';

interface IOwnProps {
  advertisementList: Array<IAdvertisement.IAdvertisementData>
}
type IProps = IOwnProps;
const AdvertisementGridView: React.SFC<IProps> = (props: IProps) => {
  const width = (Dimensions.get('window').width >> 1) - 12;
  return (
    <FlatGrid
      itemDimension={width}
      spacing={1}
      items={props.advertisementList}
      renderItem={({ item, index }) => (<AdvertisementGridItem advertisement={item} key={index}></AdvertisementGridItem>)}
      itemContainerStyle={styles.itemContainerStyle} />
  );
};

const styles = StyleSheet.create({
  itemContainerStyle: {
    paddingBottom: 10
  }
});

export { AdvertisementGridView };
