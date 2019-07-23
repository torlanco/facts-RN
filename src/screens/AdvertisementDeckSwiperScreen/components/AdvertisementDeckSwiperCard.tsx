import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import { colors, typos } from '@styles';
import { Card } from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';
import { SafeAreaView } from 'react-navigation';
import { CONSTANTS } from '@utils';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData,
  currentAdvertisementId: number | undefined,
  onDataChange: Function,
  swipeOperation: string
}
type IProps = IOwnProps;

interface IState {
  featureImage: any,
  advertisement: any,
}
class AdvertisementDeckSwiperCard extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      featureImage: require('@assets/images/placeholder.png'),
      advertisement: this.props.advertisement || {},
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

  onChangeField = (field: string, text: any) => {
    const advertisement = this.state.advertisement;
    advertisement[field] = text;
    this.setState({
      advertisement: advertisement
    });
    this.props.onDataChange(this.state.advertisement);
  }

  public render() {
    const { image, brand, type, units, capacity, size, rprice, sprice } = this.state.advertisement;
    const swiperOperationView: any = {};
    const swiperOperation: any = {};
    if (this.props.swipeOperation == CONSTANTS.LEFT_OPERATION) {
      swiperOperationView.alignSelf = 'flex-end';
      swiperOperation.borderColor = colors.ERROR;
      swiperOperation.color = colors.ERROR;
    } else if (this.props.swipeOperation == CONSTANTS.RIGHT_OPERATION) {
      swiperOperationView.alignSelf = 'flex-start';
      swiperOperation.borderColor = colors.SUCCESS;
      swiperOperation.color = colors.SUCCESS;
    }

    console.log(this.props.swipeOperation);

    return (
      <SafeAreaView>
        <Card containerStyle={[styles.container]}>
          { this.props.advertisement.id == this.props.currentAdvertisementId 
            && this.props.swipeOperation != CONSTANTS.NONE ?
            <View style={[styles.swipeOperationView, swiperOperationView]}>
              <Text style={[styles.swipeOperation, swiperOperation]}>{this.props.swipeOperation}</Text>
            </View> : null }
          <Card containerStyle={[styles.container, styles.imageContainer]}>
            { this.state.featureImage == this.props.advertisement.image ?
              <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> :
              <Image style={[styles.image, { height: 200 }]} source={ this.state.featureImage } resizeMode="stretch"/> }
          </Card>
          <Text style={styles.label}>Brand</Text>
          <TextInput style={[styles.text]} value={`${brand}`} onChangeText={(text) => this.onChangeField('brand', text)}/>

          <Text style={styles.label}>Classification</Text>
          <TextInput style={[styles.text]} value={`${type}`} onChangeText={(text) => this.onChangeField('type', text)}/>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.label}>Units</Text>
              <TextInput style={[styles.text]} value={`${units}`} onChangeText={(text) => this.onChangeField('units', text)}
                keyboardType="numeric"/>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Capacity</Text>
              <TextInput style={[styles.text]} value={`${capacity}`} onChangeText={(text) => this.onChangeField('capacity', text)}
                keyboardType="numeric"/>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Size</Text>
              <TextInput style={[styles.text]} value={`${size}`} onChangeText={(text) => this.onChangeField('size', text)}
                keyboardType="numeric"/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.label}>Regular Price</Text>
              <TextInput style={[styles.text]} value={`${rprice}`} onChangeText={(text) => this.onChangeField('rprice', text)}
                keyboardType="numeric"/>
            </View>
            <View style={styles.empty}></View>
            <View style={styles.flex}>
              <Text style={styles.label}>Special Price</Text>
              <TextInput style={[styles.text]} value={`${sprice}`} onChangeText={(text) => this.onChangeField('sprice', text)}
                keyboardType="numeric"/>
            </View>
          </View>
        </Card>
      </SafeAreaView>
    );
  }
}

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
    maxHeight: 200,
  },
  padding: {
    padding: 2,
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 200,
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
  },
  swipeOperationView: {
    position: 'absolute',
    top: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 3,
    zIndex: 2,
    shadowOffset:{ width: 0,  height: 0, },
    opacity: 1,
  },
  swipeOperation: {
    textAlign: 'center',
    ...typos.SUBHEADLINE,
    fontWeight: 'bold',
    margin: 0,
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    borderWidth: 3,
    borderRadius: 5,
  }
});

export { AdvertisementDeckSwiperCard };
