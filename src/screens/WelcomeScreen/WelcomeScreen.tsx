import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/user';
import Logo from "../../../assets/images/logo.svg";

// props
interface ParamType {
  isExternalCall: boolean
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IUser.StateToProps &
  IUser.DispatchFromProps;

// state
interface IState {
  showPage: boolean;
  userName: string;
  password: string;
  showPassword: boolean;
  isSignUpSelected: boolean;
  // Errors
  userNameError: string,
  passwordError: string,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class WelcomeScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _passwordField: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      showPage: false,
      userName: '',
      password: '',
      showPassword: false,
      userNameError: '',
      passwordError: '',
      isSignUpSelected: true
    };
  }

  async componentDidMount() {
    const token: any = await this.props.isLoggedIn();
    if (token) {
      await this.props.fetchUserInfo(token);
      this.redirectToMain();
    } else {
      this.setState({
        showPage: true
      })
    }
  }

  onSignUp = async () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  onLogIn = async () => {
    this.props.navigation.navigate('LoginScreen');
  }

  redirectToMain = () => {
    this.props.navigation.navigate('Main');
  }

  public render() {
    const { isSignUpSelected } = this.state;
    return (
      <SafeAreaView style={styles.flex}>
      { this.state.showPage ?
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title="" rightText='Skip' onRightTextClick={this.redirectToMain}
            style={{backgroundColor: colors.PRIMARY}} noDivider={true} noLeftIcon={true}></HeaderBar>
          <View style={styles.container}>
            <View style={[styles.row, styles.imageContainer]}>
                <Logo width={150} />
            </View>
            <Text style={styles.heading}>Get the Best Price</Text>
            <Text style={styles.subHeadig}>for products in Supermarkets</Text>

            <View style={[styles.row, styles.bottomAction]}>
              <View style={styles.flex}>
                <ActionButton title="Sign up" inverted={isSignUpSelected} onPress={this.onSignUp}
                  style={styles.buttonContainerStyle} buttonStyle={styles.buttonStyle}
                  titleStyle={styles.buttonTextStyle} invertedTitleStyle={styles.invertedButtonTextStyle}
                  invertedStyle={styles.invertedButtonContainerStyle} invertedButtonStyle={styles.invertedButtonStyle}/>
              </View>
              <View style={{width: 30}}></View>
              <View style={styles.flex}>
                <ActionButton title="Log in" inverted={!isSignUpSelected} onPress={this.onLogIn}
                  style={styles.buttonContainerStyle} buttonStyle={styles.buttonStyle}
                  titleStyle={styles.buttonTextStyle} invertedTitleStyle={styles.invertedButtonTextStyle}
                  invertedStyle={styles.invertedButtonContainerStyle} invertedButtonStyle={styles.invertedButtonStyle}/>
              </View>
            </View>
          </View>
        </View> : null }
      {(this.props.loading || !this.state.showPage)&& <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.PRIMARY
  },
  mainContainer: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.PRIMARY
  },
  container: {
    flex: 1,
    padding: 20,
  },
  skipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  skip: {
    ...typos.HEADLINE,
    fontWeight: 'normal',
    color: colors.BLACK,
    padding: 10,
    marginTop: 20,
    marginRight: -10,
  },
  imageContainer: {
    marginTop: 5,
    marginBottom: 40,
  },
  image: {
    width: 150,
    height: 80,
  },
  heading: {
    ...typos.BIGTEXT_BOLD,
    fontWeight: 'bold',
    marginTop: 40
  },
  subHeadig: {
    ...typos.BIGTEXT,
    marginBottom: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  text: {
    ...typos.PRIMARY,
    borderRadius: 5,
    borderColor: colors.LIGHT_GRAY,
    height: 40,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  link: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    paddingVertical: 10,
  },
  checkBoxContainer: {
    backgroundColor: colors.WHITE,
    marginVertical: 10,
    marginLeft: 0,
    padding: 0,
    width: 140,
    borderWidth: 0,
  },
  checkBoxLabel: {
    ...typos.PRIMARY,
    color: colors.TEXT_NOTE,
    fontWeight: 'normal'
  },
  buttonContainerStyle: {
    borderRadius: 5,
    borderColor: colors.BLACK,
    backgroundColor: colors.PRIMARY,
    borderWidth: 1,
  },
  buttonStyle: {
    borderWidth: 0,
    backgroundColor: colors.PRIMARY,
  },
  invertedButtonContainerStyle: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: colors.BLACK,
  },
  invertedButtonStyle: {
    borderWidth: 0,
    backgroundColor: colors.BLACK,
  },
  buttonTextStyle: {
    color: colors.BLACK,
  },
  invertedButtonTextStyle: {
    color: colors.WHITE
  },
  bottomAction: {
    position: "absolute",
    bottom: 20,
    right: 22,
  },
});

const WelcomeScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
export { WelcomeScreenWrapper as WelcomeScreen }
