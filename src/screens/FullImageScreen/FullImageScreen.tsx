import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '@styles';

// Component
import { StatusBar, Platform } from "react-native";

// Props Action
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { Icon } from 'react-native-elements';
import ImageView from 'react-native-image-view';

// props
interface ParamType {
  image: string
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps;

// state
interface IState {
  width: number,
  height: number
}

class FullImageScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this._isMounted = true;
    const { image } = this.props.navigation.state.params;
    if (image) {
        Image.getSize(image, (width: number, height: number) => {
          this.setState({
            width: width,
            height: height
          });
        }, err => {});
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  close = () => {
    this.props.navigation.goBack();
  }

  _renderFooter = () => {
      return  <TouchableOpacity style={styles.closeIconTouchable} onPress={this.close}>
                  <Icon
                      name='x'
                      type='feather'
                      color={colors.WHITE}
                      containerStyle={styles.iconContainer}/>
              </TouchableOpacity>
  }

  public render() {
    const { image } = this.props.navigation.state.params;
    const images = [];
    if (image) {
      images.push({
          source: { uri: image},
      });
    }
    return (
          <ImageView
              images={images}
              imageIndex={0}
              isVisible={true}
              controls={{close: null}}
              isPinchZoomEnabled={true}
              renderFooter={(currentImage: any) => (this._renderFooter())}/>
    );
  }
}

const styles = StyleSheet.create({
  closeIconTouchable: {
    position: "absolute",
    bottom: 80,
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export { FullImageScreen }
