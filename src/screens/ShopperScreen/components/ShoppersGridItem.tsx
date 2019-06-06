import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { IShopper } from '@interfaces/shopper';

interface IOwnProps {
  shopper: IShopper.IShopperData
}
type IProps = IOwnProps;
const ShoppersGridItem: React.SFC<IProps> = (props: IProps) => {
  return (
    <Card containerStyle={styles.container}>
      <Card containerStyle={[styles.container, styles.imageContainer]}>
        <FullWidthImage style={styles.image} source={{ uri: props.shopper.itemUrl }} />
      </Card>
      <Text style={[styles.type, styles.padding]}>{ props.shopper.type }</Text>
      <Text style={[styles.name, styles.padding]}>{ props.shopper.name }</Text>
      <Text style={[styles.pieces, styles.padding]}>{ props.shopper.piecePerKg }</Text>
      <View style={styles.priceContainer}>
        <Text style={[styles.price, styles.padding]}>{ props.shopper.price }</Text>
        <Text style={[styles.originalPrice, styles.padding]}>{ props.shopper.originalPrice }</Text>  
      </View>
      <Text style={[styles.quantity, styles.padding]}>{ props.shopper.minQuantity }</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    elevation: 5,
    shadowRadius: 5,
    shadowColor: colors.LIGHT_GRAY,
    shadowOffset: {
      width: 2,
      height: 5
    },
    shadowOpacity: 0.5,
  },
  imageContainer: {
    padding: 0,
    margin: 0,
  },
  padding: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
  },
  type: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY,
    paddingTop: 10
  },
  name: {
    ...typos.HEADLINE,
    color: colors.TEXT_PRIMARY
  },
  pieces: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY
  },
  priceContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  price: {
    ...typos.PRIMARY_BOLD,
    color: colors.TEXT_SECONDARY  
  },
  originalPrice: {
    ...typos.SMALL,
    color: colors.LIGHT_ORANGE  
  },
  quantity: {
    ...typos.SECONDARY,
    color: colors.TEXT_SECONDARY
  }
});

export { ShoppersGridItem };
