import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData
}
type IProps = IOwnProps;
const AdvertisementGridItem: React.SFC<IProps> = (props: IProps) => {

  const {id, type, brand, sprice, rprice, sizeMeasure, image } = props.advertisement;
  
  return (
    <Card containerStyle={styles.container}>
      <Card containerStyle={[styles.container, styles.imageContainer]}>
        <FullWidthImage style={styles.image} source={{ uri: image }} />
      </Card>
      <Text style={[styles.type, styles.padding]}>{type}</Text>
      <Text style={[styles.name, styles.padding]}>{brand}</Text>
      <Text style={[styles.pieces, styles.padding]}>{sizeMeasure}</Text>
      <View style={styles.priceContainer}>
        <Text style={[styles.price, styles.padding]}>${sprice}</Text>
        <Text style={[styles.originalPrice, styles.padding]}>${rprice}</Text>  
      </View>
      <Text style={[styles.quantity, styles.padding]}>MIN. 1KG</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowOffset: {
        width: 0,
        height: 5
    },
    shadowColor: colors.LIGHT_BLUE,
    elevation: 3,
    shadowRadius: 10,
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

export { AdvertisementGridItem };
