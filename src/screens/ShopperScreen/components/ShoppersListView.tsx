import * as React from 'react';
import {
    FlatList
} from 'react-native';
import { IShopper } from '@interfaces/shopper';
import { ShoppersListItem } from './ShoppersListItem';

interface IOwnProps {
  shopperList: Array<IShopper.IShopperData>
}
type IProps = IOwnProps;
const ShoppersListView: React.SFC<IProps> = (props: IProps) => {
  return (
    <FlatList
      data={props.shopperList}
      renderItem={({ item }) => <ShoppersListItem shopper={item}></ShoppersListItem>} 
      keyExtractor={(item, index) => index.toString()}/>
  );
};

export { ShoppersListView };
