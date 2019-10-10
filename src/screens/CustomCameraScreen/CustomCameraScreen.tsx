import React from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { Platform } from '@unimodules/core';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { NavigationInjectedProps, NavigationState, NavigationScreenProp } from 'react-navigation';
import FullWidthImage from 'react-native-fullwidth-image';

interface ParamType {
  image: any;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>
}
type IProps = IOwnProps & 
  NavigationInjectedProps;

interface IState {
  images: any[];
}
class CustomCameraScreen extends React.Component<IProps, IState> {
  camera: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      images: [{
        "height": 4608,
        "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffacts-mobile-app-3f08643a-634c-4ccd-b5d9-ba3710421f0e/Camera/397b015d-a5bb-4202-b36e-d0ddcefb44bf.jpg",
        "width": 3456,
      }, {
        "height": 4608,
        "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffacts-mobile-app-3f08643a-634c-4ccd-b5d9-ba3710421f0e/Camera/ff47faed-a82e-458e-8147-da214c1aa2ed.jpg",
        "width": 3456,
      }]
    }
  }

  componentDidMount() {
    console.log('Hello');  
    console.log(this.props.navigation.state.params);
    
    if (this.props.navigation.state.params && this.props.navigation.state.params.image) {
      const images = this.state.images;
      // images.push(this.props.navigation.state.params.image);
      images.push(1);
      this.setState({
        images: images
      }, () => {
        // this.props.navigation.state.params.image = null;
      });  
    }
  }
  
  onBack = () => {
    if (this.state.images.length > 0) {
      const images = this.state.images;
      images.pop();
      this.setState({
        images: images
      })
    }
  } 

  openCamera = () => {
    this.props.navigation.navigate('CameraScreen');
  }

  onCheck = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flex}>
          <FlatList
            data={this.state.images}
            renderItem={({ item }) => <FullWidthImage source={{uri: item.uri}}/>}
            keyExtractor={(item: any) => item.uri}
            showsVerticalScrollIndicator={false}/>
        </View>
        <View style={styles.options}>
          <View style={[styles.flex, styles.option]}>
            <TouchableOpacity onPress={this.onBack} activeOpacity={0.85}>
              <Icon
                name='arrow-left'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.icon}/>
            </TouchableOpacity>
          </View>
          <View style={[styles.flex, styles.option]}>
            <TouchableOpacity onPress={this.openCamera} activeOpacity={0.8}>
              <Icon
                name='camera'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.icon}/>  
            </TouchableOpacity>
          </View>
          <View style={[styles.flex, styles.option]}>
            <TouchableOpacity onPress={this.onCheck} activeOpacity={0.8}>
              <Icon
                name='check'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.icon}/>    
            </TouchableOpacity>  
          </View>
        </View>
      </View>
    );
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
    flexDirection: 'row', 
    paddingVertical: 20,
  },
  option: {
    alignItems: 'center'
  },
  flex: {
    flex: 1
  }
});

const CustomCameraScreenWrapper = connect(null, null)(CustomCameraScreen);
export { CustomCameraScreenWrapper as CustomCameraScreen }