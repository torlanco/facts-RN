import React from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Platform } from '@unimodules/core';
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from "react-redux";
import { colors } from '@styles';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { SkypeIndicator } from 'react-native-indicators';

// props
interface ParamType {
  url: any;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
  token: any
}

type IProps = IOwnProps &
  NavigationInjectedProps;

const mapStateToProps = function(state: any) {
  return {
    token: state.user.token,
  }
};

interface IState {}

class WebViewScreen extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  onClose = () => {
      this.props.navigation.goBack();
  }

  render() {
    const { url } = this.props.navigation.state.params;
    const source: any = {
      uri: url
    }
    if (this.props.token) {
      source.headers = { Authorization: 'Bearer '.concat(this.props.token) }
    }
    console.log(source);
    return <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          <WebView
            source={source} style={[styles.flex, styles.webview]}
            startInLoadingState={true}
            renderLoading={() => <SkypeIndicator color={colors.PRIMARY} />}/>
          <TouchableOpacity onPress={this.onClose} style={styles.iconContainer}>
            <Icon
                name='x'
                type='feather'
                color={colors.WHITE}
                size={16}/>
          </TouchableOpacity>
        </View>
     </SafeAreaView>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  flex: {
    flex: 1
  },
  webview: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 20,
    padding: 10,
  }
});

const WebViewScreenWrapper = connect(mapStateToProps, null)(WebViewScreen);
export { WebViewScreenWrapper as WebViewScreen }
