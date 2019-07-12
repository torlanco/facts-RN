import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';
import { SafeAreaView } from 'react-navigation';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData,
  onItemPress?: Function
}
type IProps = IOwnProps;

interface IState {
  featureImage: any,
}
class AdvertisementDeckSwiperCard extends React.Component<IProps, IState> {
 
  constructor(props: IProps) {
      super(props);
      this.state = {
          featureImage: require('@assets/images/placeholder.png')
      };
  }
  
  componentDidMount() {
    if (this.props.advertisement.image) {
        Image.getSize(this.props.advertisement.image, (width: number, height: number) => {
            this.setState({ 
                featureImage: this.props.advertisement.image
            });
        }, err => {});
    }
  }

  onItemPress = () => {
    if (this.props.onItemPress) 
      this.props.onItemPress(this.props.advertisement);
  }

  public render() {
    const {id, type, brand, sprice, rprice, sizeMeasure } = this.props.advertisement;
    return (
      <SafeAreaView>
        <Card containerStyle={[styles.container]}>
          <Card containerStyle={[styles.container, styles.imageContainer]}>
            { this.state.featureImage == this.props.advertisement.image ?
              <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
              <Image style={[styles.image, { height: 200 }]} source={ this.state.featureImage } resizeMode="stretch"/> }  
          </Card>
          <Text style={[styles.type, styles.padding]}>{type}</Text>
          <Text style={[styles.name, styles.padding]}>{brand}</Text>
          <Text style={[styles.pieces, styles.padding]}>{sizeMeasure}</Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, styles.padding]}>${sprice}</Text>
            <Text style={[styles.originalPrice, styles.padding]}>${rprice}</Text>  
          </View>
        </Card>
      </SafeAreaView>
    );
  }
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
    marginTop: 20
  },
  price: {
    ...typos.PRIMARY_BOLD,
    color: colors.TEXT_SECONDARY  
  },
  originalPrice: {
    ...typos.SMALL,
    color: colors.LIGHT_ORANGE  
  },
});

export { AdvertisementDeckSwiperCard };
