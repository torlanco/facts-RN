import React from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image } from 'react-native';
import { connect } from "react-redux";
import { Platform } from '@unimodules/core';
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { NavigationInjectedProps, NavigationState, NavigationScreenProp } from 'react-navigation';
import ViewShot from "react-native-view-shot";
import { IDoc } from '@interfaces/doc';
import { mapDispatchToProps } from '@actions/doc';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { ScrollView } from 'react-native-gesture-handler';

interface ParamType {
  images: any[];
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>,
  token: string,
  loading: boolean
}
type IProps = IOwnProps & 
  NavigationInjectedProps &
  IDoc.DispatchFromProps;

interface IState {
  images: any[];
  image: any;
  extraData: boolean;
  loading: boolean;
}

const mapStateToProps = function(state: any){
  return {
    token: state.user.token,
    loading: state.doc.loading
  }
};

class CustomCameraScreen extends React.Component<IProps, IState> {
  camera: any;
  arr: any[] = [];
  
  constructor(props: IProps) {
    super(props);
    this.state = {
      images: [],
      image: null,
      extraData: false,
      loading: false
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
      this.openCamera();
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
      this.openCamera();
    }
  } 

  openCamera = () => {
    this.props.navigation.replace('CameraScreen', {images: this.state.images});
  }

  onCheck = () => {
    this.setLoading(true);
    this.refs.viewShot.capture({
      snapshotContentContainer: true
    }).then(async (uri: any) => {
      // uri = Platform.OS === "android" ? uri : uri.replace("file:/", "")
      let response: any = await this.props.uploadDoc(this.props.token, uri); 
      if (response && response.path) {
        response = await this.props.saveReceipt(this.props.token, response.path);
        this.props.navigation.goBack();
      }
      this.setLoading(false);        
    }).catch((err: any) => {
      this.setLoading(false);
      console.log(err);
    });
  }

  setLoading = (loading: boolean) => {
    this.setState({
      loading: loading
    });
  }

  scrollToImageIndex = (index: number) => {
    setTimeout(() => {
      this.refs.scrollView && this.refs.scrollView.scrollTo({
        x: 0,
        y: this.arr[index],
        animated: true,
      });
    }, 1000)
  }

  onClose = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>   
        <View style={styles.rightOptions}>
          <View style={[styles.option, styles.alignRight]}>
            <TouchableOpacity onPress={this.onClose}>
              <Icon
                name='x'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.icon}/>    
            </TouchableOpacity>  
          </View>
        </View>
        <ScrollView collapsable={false} ref="scrollView" pagingEnabled showsVerticalScrollIndicator={false}>
          <ViewShot ref="viewShot">
          { 
            !this.state.image && this.state.images.map((item, index) => 
              <View key={item.uri}
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  this.arr[index] = layout.y;
                }}>
                <Image style={styles.image} source={{uri: item.uri}}/>
              </View>)
          }
          </ViewShot>
        </ScrollView>
        <View style={styles.options}>
          <View style={[styles.flex, styles.option, styles.alignLeft]}>
            <TouchableOpacity onPress={this.onBack}>
              <Icon
                name='arrow-left'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.icon}/>
            </TouchableOpacity>
          </View>
          <View style={[styles.flex, styles.option]}>
            <TouchableOpacity onPress={this.openCamera}>
              <Icon
              name='camera-enhance'
              type='material'
              size={30}
              color={colors.WHITE}
              containerStyle={[styles.icon, styles.blueBackground]}/>  
            </TouchableOpacity>
          </View>
          <View style={[styles.flex, styles.option, styles.alignRight]}>
            <TouchableOpacity onPress={this.onCheck}>
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
        {this.state.loading || this.props.loading ? <LoadingScreen /> : null}
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
  rightOptions: {
    position: "absolute",
    top: 10, right: 0,
    flexDirection: 'row', 
    paddingVertical: 20,
    elevation: 2,
    zIndex: 5,
  },
  options: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row', 
    paddingVertical: 20,
    elevation: 2
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

const CustomCameraScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(CustomCameraScreen);
export { CustomCameraScreenWrapper as CustomCameraScreen }