import React from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image } from 'react-native';
import { connect } from "react-redux";
import { Platform } from '@unimodules/core';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { NavigationInjectedProps, NavigationState, NavigationScreenProp } from 'react-navigation';
import FullWidthImage from 'react-native-fullwidth-image';
import {NavigationEvents} from 'react-navigation';

interface ParamType {
  images: any[];
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
  extraData: boolean;
}
class CustomCameraScreen extends React.Component<IProps, IState> {
  camera: any;
  imageListRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      images: [],
      extraData: false
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.images) {
      this.setState({
        images: this.props.navigation.state.params.images,
        extraData: !this.state.extraData
      }, () => {
        this.props.navigation.state.params.images = [];
        this.scrollToImageIndex(this.state.images.length - 1);          
      });  
    } else {
      this.openCamera(true);
    }
  }
  
  onBack = () => {
    const images = this.state.images;
    if (images.length > 0) {
      images.pop();
      this.setState({
        extraData: !this.state.extraData
      })
    }
    if (!images.length) {
      this.openCamera(true);
    }
  } 

  openCamera = (replace: boolean) => {
    this.props.navigation.replace('CameraScreen', {images: this.state.images});
  }

  onCheck = () => {

  }

  onBackFromCamera = () => {
    
  }

  setListRef = (imageListRef: any) => {
    this.imageListRef = imageListRef;
  }

  scrollToImageIndex = (index: number) => {
    setTimeout(() => {
      this.imageListRef && this.imageListRef.scrollToIndex({ index, animated: true })
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.onBackFromCamera} />
        <View style={styles.flex}>
          <FlatList
            ref={this.setListRef}
            data={this.state.images}
            renderItem={({ item }) => <Image style={styles.image} source={{uri: item.uri}}/>}
            keyExtractor={(item: any) => item.uri}
            showsVerticalScrollIndicator={false}
            extraData={this.state.extraData}  
            onScrollToIndexFailed ={() => {}} />
        </View>
        <View style={styles.options}>
          <View style={[styles.flex, styles.option, styles.alignLeft]}>
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
              name='camera-enhance'
              type='material'
              size={30}
              color={colors.WHITE}
              containerStyle={[styles.icon, styles.blueBackground]}/>  
            </TouchableOpacity>
          </View>
          <View style={[styles.flex, styles.option, styles.alignRight]}>
            <TouchableOpacity onPress={this.onCheck} activeOpacity={0.8}>
              <Icon
                name='check'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.icon}/>    
            </TouchableOpacity>  
          </View>
        </View>
        <View style={styles.thumbnails}>
          <FlatList
            data={this.state.images}
            renderItem={({ item, index }) => <TouchableOpacity onPress={() => this.scrollToImageIndex(index)} activeOpacity={0.85}>
                <Image style={styles.thumbnailImage} source={{uri: item.uri}}/>
              </TouchableOpacity> }
            keyExtractor={(item: any) => item.uri}
            showsVerticalScrollIndicator={false}
            extraData={this.state.extraData} />  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.BLACK 
  },
  icon: {
    paddingVertical: 8,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center'
  },
  options: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row', 
    paddingVertical: 20,
  },
  option: {
    alignItems: 'center'
  },
  flex: {
    flex: 1
  },
  blueBackground: {
    backgroundColor: colors.BLUE,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  alignLeft: {
    alignItems: 'flex-start'
  },
  alignRight: {
    alignItems: 'flex-end'
  },
  thumbnails: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "absolute",
    top: 20,
    left: 20,
    elevation: 1
  },
  thumbnailImage:{
    width: 30,
    height: 30 * Dimensions.get('window').height / Dimensions.get('window').width
  }
});

const CustomCameraScreenWrapper = connect(null, null)(CustomCameraScreen);
export { CustomCameraScreenWrapper as CustomCameraScreen }