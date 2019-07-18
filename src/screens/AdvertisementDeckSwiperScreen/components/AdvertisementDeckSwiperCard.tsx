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
    const { image, brand, type, units, capacity, size, rprice, sprice } = this.props.advertisement;
 
    return (
      <SafeAreaView> 
        <Card containerStyle={[styles.container]}>
          <Card containerStyle={[styles.container, styles.imageContainer]}>
            { this.state.featureImage == this.props.advertisement.image ?
              <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
              <Image style={[styles.image, { height: 200 }]} source={ this.state.featureImage } resizeMode="stretch"/> }  
          </Card>
          <Text style={styles.label}>Brand</Text>
          <Text style={[styles.text]}>{brand}</Text>

          <Text style={styles.label}>Classification</Text>
          <Text style={[styles.text]}>{type}</Text>

          <View style={styles.row}>  
            <View style={styles.flex}>
              <Text style={styles.label}>Units</Text>
              <Text style={[styles.text]}>{units}</Text>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Capacity</Text>
              <Text style={[styles.text]}>{capacity}</Text>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Size</Text>
              <Text style={[styles.text]}>{size}</Text>
            </View>
          </View>

          <View style={styles.row}>  
            <View style={styles.flex}>
              <Text style={styles.label}>Regular Price</Text>
              <Text style={[styles.text]}>{rprice}</Text>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Special Price</Text>
              <Text style={[styles.text]}>{sprice}</Text>
            </View>
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
  text: {
    ...typos.PRIMARY,
    borderRadius: 2,
    borderColor: colors.LIGHT_GRAY,
    height: 30,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  label: {
    ...typos.PRIMARY,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2
  },
  row: {
    flexDirection: 'row'
  },
  flex: {
    flex: 1,
  },
  empty: {
    width: 20,
    height: 20,
  }
});

export { AdvertisementDeckSwiperCard };
