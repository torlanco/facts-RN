import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';
import { IOutlet } from '@interfaces/outlet';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData,
  onItemPress?: Function,
  outlet?: IOutlet.IOutletData;
}
type IProps = IOwnProps;

interface IState {
  featureImage: any,
}
class AdvertisementGridItem extends React.Component<IProps, IState> {
 
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
    const { advertisement, outlet } = this.props;
    const {id, type, brand, sprice, rprice, sizeMeasure } = advertisement;
    const itemWidth = (Dimensions.get('window').width >> 1) - 22;
    const marginTopofSize = brand && brand.length > 9 ? 0 : -12;
    return (
      <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
        <View style={[styles.container, {width: itemWidth}]}>
          <Card containerStyle={[styles.imageContainer]}>
            { this.state.featureImage == this.props.advertisement.image ?
              <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
              <Image style={[styles.image, { height: 80 }]} source={ this.state.featureImage } resizeMode="stretch"/> }  
          </Card>
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={[styles.boldText, styles.flex]}>{brand}</Text>
            </View>
            <View style={[styles.row, {flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
                <Text style={[styles.sellprice]}>${sprice}</Text>
                <Text style={[styles.regularPrice]}>${rprice}</Text>  
            </View>
            <Text style={[styles.size, styles.flex, { marginTop: marginTopofSize }]}>{sizeMeasure}</Text>
            <Text style={[styles.type]}>{type}</Text>
            <Text style={[styles.outlet]}>{outlet ? outlet.outlet : advertisement.outlet}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
      height: 2
    },
    shadowColor: colors.LIGHT_BLUE,
    elevation: 1,
    shadowRadius: 3,
    padding: 0, 
    marginTop: 10,
    marginHorizontal: '2.5%',
  },
  imageContainer: {
    borderRadius: 0,
    // padding: 10,
    margin: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    borderTopRightRadius: 10, 
    borderTopLeftRadius: 10,
    shadowOpacity: 0,
    elevation: 0,
  },
  padding: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  boldText: {
    ...typos.TITLE,
    color: colors.TEXT_PRIMARY,
  },
  type: {
    ...typos.SMALL,
    color: colors.TEXT_PRIMARY
  },
  outlet: {
    ...typos.SMALL_BOLD,
    fontWeight: 'bold',
    color: colors.TEXT_PRIMARY
  },
  sellprice: {
    ...typos.TITLE,
    color: colors.TEXT_PRIMARY
  },
  regularPrice: {
    ...typos.SMALL,
    color: colors.TEXT_PRIMARY,
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    textAlign: 'right'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex: {
    flex: 1
  },
  details: {
    backgroundColor: colors.LIGHT_GRAY, 
    paddingVertical: 15, 
    paddingHorizontal: 10,
    borderBottomRightRadius: 10, 
    borderBottomLeftRadius: 10
  },
  size: {
    ...typos.CAPTION,
    color: colors.TEXT_PRIMARY,
  }
});

export { AdvertisementGridItem };
