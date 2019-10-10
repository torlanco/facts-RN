import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Platform } from '@unimodules/core';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from "react-redux";

interface IOwnProps {
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

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let image = await this.camera.takePictureAsync();
      this.props.navigation.navigate('CustomCameraScreen', {
        image
      })
      console.log({
        image
      })
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.flex}>
          <Camera style={styles.flex} 
            type={this.state.front ? Camera.Constants.Type.front : Camera.Constants.Type.back}
            flashMode={this.state.flash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off}
            ref={ref => {
              this.camera = ref;
            }}>
            <View style={styles.options}>
              <View style={[styles.flex, styles.option]}>
                <TouchableOpacity onPress={() => this.setState({flash: !this.state.flash})} activeOpacity={0.85}>
                  <Icon
                    name={this.state.flash ? 'zap' : 'zap-off'}
                    type='feather'
                    color={colors.WHITE}
                    containerStyle={styles.icon}/>
                </TouchableOpacity>
              </View>
              <View style={[styles.flex, styles.option]}>
                <TouchableOpacity onPress={this.snap} activeOpacity={0.8}>
                  <Icon
                    name='camera'
                    type='feather'
                    color={colors.WHITE}
                    containerStyle={styles.icon}/>  
                </TouchableOpacity>
              </View>
              <View style={[styles.flex, styles.option]}>
                <TouchableOpacity onPress={() => this.setState({front: !this.state.front})} activeOpacity={0.8}>
                  <Icon
                    name='refresh-cw'
                    type='feather'
                    color={colors.WHITE}
                    containerStyle={styles.icon}/>    
                </TouchableOpacity>  
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1
  },
  icon: {
    paddingVertical: 8,
    backgroundColor: colors.LIGHT_ORANGE,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center'
  },
  options: {
    flex: 1,
    flexDirection: 'row', 
    paddingVertical: 20,
    backgroundColor: 'transparent',   
  },
  option: {
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  flex: {
    flex: 1
  }
});

const CameraScreenWrapper = connect(null, null)(CameraScreen);
export { CameraScreenWrapper as CameraScreen }