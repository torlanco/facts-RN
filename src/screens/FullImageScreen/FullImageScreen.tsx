import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '@styles';

// Component
import { StatusBar, Platform } from "react-native";

// Props Action
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Icon } from 'react-native-elements';

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

  public render() {
    const { image } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1}}>
          <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center',}}>
            <Image style={{width: this.state.width, height: this.state.height}} source={{ uri: image }} />
          </ScrollView>
          <TouchableOpacity style={styles.closeIconTouchable}
            onPress={this.close} >
            <Icon
                name='x'
                type='feather'
                color={colors.WHITE}
                containerStyle={styles.iconContainer}/>
          </TouchableOpacity>
          {this.props.loading && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  footer: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
    left: 0,
    right: 0
  },
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
