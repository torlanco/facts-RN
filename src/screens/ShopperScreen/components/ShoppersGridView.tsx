import * as React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { IShopper } from '@interfaces/shopper';
import { ShoppersGridItem } from './ShoppersGridItem';
import { FlatGrid } from 'react-native-super-grid';

interface IOwnProps {
  shopperList: Array<IShopper.IShopperData>
}
type IProps = IOwnProps;
const ShoppersGridView: React.SFC<IProps> = (props: IProps) => {
  const width = (Dimensions.get('window').width >> 1) - 12;
  return (
    <FlatGrid
      itemDimension={width}
      spacing={1}
      items={props.shopperList}
      renderItem={({ item, index }) => (<ShoppersGridItem shopper={item} key={index}></ShoppersGridItem>)}
      itemContainerStyle={styles.itemContainerStyle} />
  );
};

const styles = StyleSheet.create({
  itemContainerStyle: {
    paddingBottom: 10
  }
});

export { ShoppersGridView };
