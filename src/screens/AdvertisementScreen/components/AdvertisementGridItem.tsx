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
  outletImage: any,
}
class AdvertisementGridItem extends React.Component<IProps, IState> {
  outletImage: any;

  constructor(props: IProps) {
      super(props);
      this.state = {
          featureImage: require('@assets/images/placeholder.png'),
          outletImage: require('@assets/images/placeholder.png'),
      };
  }

  componentDidMount() {
    if (this.props.advertisement.id) {
      if (this.props.advertisement.image) {
          Image.getSize(this.props.advertisement.image, (width: number, height: number) => {
              this.setState({
                  featureImage: this.props.advertisement.image
              });
          }, err => {});
      }

      this.outletImage =  this.props.outlet && this.props.outlet.outletImage
         ? this.props.outlet.outletImage : this.props.advertisement.outletImage
      if (this.outletImage) {
          Image.getSize(this.outletImage, (width: number, height: number) => {
              this.setState({
                  outletImage: this.outletImage
              });
          }, err => {});
      }
    }
  }

  onItemPress = () => {
    if (this.props.onItemPress)
      this.props.onItemPress(this.props.advertisement);
  }

  public render() {
    const { advertisement, outlet } = this.props;
    const {id, type, brand, sprice, rprice, sizeMeasure, opacity } = advertisement;
    const itemWidth = (Dimensions.get('window').width >> 1) - 25;
    const imageContainerHeight: any = {};
    if (!id) {
      imageContainerHeight.height = 140;
    }
    return (
      <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
        <View style={[styles.container, {width: itemWidth, opacity:  opacity ? opacity : 1}]}>
          <Card containerStyle={[styles.imageContainer, imageContainerHeight]}>
            { id && <View>
              { this.outletImage && <Card containerStyle={styles.outletImage}>
               { this.state.outletImage == this.outletImage ?
                  <FullWidthImage style={ styles.image } source={{ uri: this.state.outletImage }}/> :
                  <Image style={[styles.image, { height: 40 }]} source={ this.state.outletImage } resizeMode="stretch"/> }
              </Card> }

            { this.state.featureImage == this.props.advertisement.image ?
              <FullWidthImage style={[styles.image]} source={{ uri: this.state.featureImage }}/> :
              <Image style={[styles.image, {height: 80}]} source={ this.state.featureImage } resizeMode="stretch"/> }
            </View> }
          </Card>
          <View style={styles.details}>
            { id && <View>
                <View style={styles.row}>
                  <Text style={[styles.boldText, styles.flex]}>{brand}</Text>
                </View>
                <Text style={[styles.size, styles.flex]}>{sizeMeasure}</Text>
                <Text style={[styles.type]}>{type}</Text>
                <Text style={[styles.outlet]}>{outlet ? outlet.outlet : advertisement.outlet}</Text>
                <View style={[styles.row, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
                  <Text style={[styles.regularPrice]}>${rprice}</Text>
                  <Text style={[styles.sellprice]}>${sprice}</Text>
                </View>
              </View> }
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
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: '2.5%',
  },
  imageContainer: {
    // padding: 10,
    margin: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
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
    ...typos.SUBHEADLINE,
    color: colors.ERROR,
    paddingLeft: 5,
    paddingBottom: 2,
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
  },
  outletImage: {
      height: 40,
      width: 40,
      borderRadius: 5,
      shadowColor: colors.WHITE,
      padding: 0,
      margin: 0,
      marginRight: 5,
      justifyContent: 'center',
      position: "absolute",
      zIndex: 3,
      elevation: 3,
      right: 0,
      top: 5,
  },
});

export { AdvertisementGridItem };
