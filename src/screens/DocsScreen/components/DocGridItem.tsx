import * as React from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { colors, typos } from '@styles';

interface IOwnProps {
  doc: any,
  onItemPress?: Function
}
type IProps = IOwnProps;

interface IState {
  featureImage: any,
}

class DocGridItem extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      featureImage: require('@assets/images/placeholder.png')
    };
  }

  componentDidMount() {
    if (this.props.doc.item.path) {
      Image.getSize(this.props.doc.item.path, (width: number, height: number) => {
        this.setState({
          featureImage: this.props.doc.item.path
        });
      }, err => { });
    }
  }

  onItemPress = () => {
    if (this.props.onItemPress)
      this.props.onItemPress(this.props.doc.item.path);
  }

  public render() {
    const itemWidth = (Dimensions.get('window').width >> 1) - 35;
    return (
      <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
        <View style={[styles.container, {width: itemWidth}]}>
          { this.state.featureImage == this.props.doc.item.path ?
            <Image style={[styles.image, { height: 200 }]} source={{ uri: this.state.featureImage }} /> :
            <Image style={[styles.image, { height: 80 }]} source={ this.state.featureImage } resizeMode="stretch"/> }
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
        height: 5
    },
    shadowColor: colors.LIGHT_BLUE,
    elevation: 3,
    shadowRadius: 10,
    margin: 10,
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
    ...typos.TITLE,
    color: colors.TEXT_SECONDARY
  },
  originalPrice: {
    ...typos.SMALL,
    color: colors.LIGHT_ORANGE
  },
});

export { DocGridItem };
