import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, StyleSheet, BackHandler, FlatList } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Platform } from '@unimodules/core';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from "react-redux";
import FullWidthImage from 'react-native-fullwidth-image';
import { NavigationEvents } from 'react-navigation';

// props
interface ParamType {
  images: any[];
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}

type IProps = IOwnProps &
  NavigationInjectedProps;

interface IState {
  hasCameraPermission: any;
  flash: boolean;
  front: boolean;
}
class CameraScreen extends React.Component<IProps, IState> {
  camera: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      flash: false,
      front: false,
    };
  }

  onDidFocus = () => {
    this._requestCameraPermission();
  }

  onDidBlur = () => {
    this.setState({
      hasCameraPermission: null,
      flash: false,
      front: false,
    })
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
        hasCameraPermission: status === 'granted',
    });
  };

  snap = async () => {
    if (this.camera) {
      // let image = await this.camera.takePictureAsync();
      const image = await new Promise(async resolve => {
        await this.camera.takePictureAsync({onPictureSaved : resolve,  skipProcessing: true});
        this.camera.pausePreview();
      });
      this.camera.resumePreview();
      const { images } = this.props.navigation.state.params
      images.push(image);
      this.props.navigation.replace('CustomCameraScreen', {
        images
      });
    }
  };

  close = async () => {
    const { images } = this.props.navigation.state.params;
    if (images.length) {
      this.props.navigation.replace('CustomCameraScreen', {images});
    } else {
      this.props.navigation.goBack(null);
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.close);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.close);
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { images } = this.props.navigation.state.params;
    return <View style={styles.container}>
      <NavigationEvents onDidFocus={this.onDidFocus} onDidBlur={this.onDidBlur}/>
      { hasCameraPermission ?      
          <View style={styles.horizontalFlex}>
            <View style={styles.optionsContainer}>
              <View style={[styles.option]}>
                <TouchableOpacity onPress={() => this.setState({flash: !this.state.flash})}>
                  <Icon
                      name={this.state.flash ? 'zap' : 'zap-off'}
                      type='feather'
                      color={colors.WHITE}
                      size={16}
                      containerStyle={styles.optionIcon}/>
                </TouchableOpacity>
              </View>
              <View style={[styles.option]}>
                  <TouchableOpacity onPress={() => this.setState({front: !this.state.front})}>
                    <Icon
                      name='refresh-cw'
                      type='feather'
                      color={colors.WHITE}
                      size={16}
                      containerStyle={styles.optionIcon}/>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={styles.flex}>
              { images.length ?
                <View style={styles.imageList}>
                  <FlatList
                    data={images}
                    renderItem={({ item }) => <FullWidthImage source={{uri: item.uri}}/>}
                    keyExtractor={(item: any) => item.uri}
                    showsVerticalScrollIndicator={false}
                    initialScrollIndex={images.length - 1} />
                </View> : null }
              <Camera style={styles.flex}
                type={this.state.front ? Camera.Constants.Type.front : Camera.Constants.Type.back}
                flashMode={this.state.flash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off}
                ref={ref => {
                  this.camera = ref;
                }}>
              </Camera>
            </View>
            <View style={styles.optionsContainer}></View>
            <View style={styles.bottomControl}>
              <View style={styles.flex}></View>
              <View style={[styles.flex, styles.bottomControlOption]}>
                <TouchableOpacity onPress={this.snap}>
                  <Icon
                    name='camera'
                    type='feather'
                    color={colors.WHITE}
                    containerStyle={[styles.icon, styles.blueBackground]}/>
                </TouchableOpacity>
              </View>
              <View style={[styles.flex, styles.bottomControlOption, styles.alignItemsRight]}>
                <TouchableOpacity onPress={this.close}>
                  <Icon
                    name='x'
                    type='feather'
                    color={colors.WHITE}
                    containerStyle={[styles.icon]}/>
                </TouchableOpacity>
              </View>
            </View>
          </View> : <View style={styles.nullContainer}>
            {
              this.state.hasCameraPermission === false ? 
                <Text style={{color: colors.WHITE}}>No access to camera</Text> : null
            }
          </View>
      }
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    flex: 1
  },
  icon: {
    paddingVertical: 8,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center'
  },
  bottomControl: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  bottomControlOption: {
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  alignItemsRight: {
    alignItems: 'flex-end'
  },
  flex: {
    flex: 1
  },
  horizontalFlex: {
    flex: 1,
    flexDirection: 'row'
  },
  optionsContainer: {
    backgroundColor: colors.BLACK,
    width: 50,
    alignItems: 'center',
  },
  blueBackground: {
    backgroundColor: colors.BLUE,
  },
  option: {
    marginVertical: 10,
  },
  optionIcon: {
    paddingVertical: 10,
    height: 20,
    width: 20,
    justifyContent: 'center'
  },
  imageList: {
    height: '25%',
  },
  nullContainer: {
    flex: 1,
    backgroundColor: colors.BLACK, 
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const CameraScreenWrapper = connect(null, null)(CameraScreen);
export { CameraScreenWrapper as CameraScreen }
