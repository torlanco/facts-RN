import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, TextField } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/user';
import { CheckBox } from 'react-native-elements';
import { validate, CONSTANTS } from '@utils';

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
  // Errors
  userNameError: string,
  passwordError: string,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class LoginScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      showPage: false,
      userName: '',
      password: '',
      showPassword: false,
      userNameError: '',
      passwordError: '',
    };
  }

  async componentDidMount() {
    const token = await this.props.isLoggedIn();
    if (token) {
      this.redirectToMain();
    } else {
      this.setState({
        showPage: true
      })
    }
  }
  
  onRememberMeChange = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      userNameError: validate('required', this.state.userName, 'Username'),
      passwordError: validate('password', this.state.password),
    }); 
    return !(this.state.userNameError || this.state.passwordError);
  }

  onSignIn = async () => {
    if (!(await this.validate())) {
      return;
    }
    const response: any = await this.props.login(this.state.userName, this.state.password);
    if (response.success) {
      this.redirectToMain();
    } else if (response.status == CONSTANTS.FAILURE && response.result.errText == CONSTANTS.INVALID_LOGIN_CREDENTIALS) {
      this.setState({
        password: '',
        userNameError: CONSTANTS.INVALID_LOGIN_CREDENTIALS
      });
    }
  }

  onForgetPassword = () => {
    this.props.navigation.navigate('ForgetPasswordScreen', {});  
  }

  onRegister = () => {
    this.props.navigation.navigate('RegisterScreen');    
  }
 
  redirectToMain = () => {
    this.props.navigation.navigate('Main');
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
      { this.state.showPage ? 
        <View style={styles.container}>
          <View style={styles.skipContainer}>
            <Text style={[styles.skip]} onPress={this.redirectToMain}>Skip</Text>
          </View>
          <View style={[styles.row, styles.imageContainer]}>
              <Image style={styles.image} source={require('@assets/images/logo.png')}></Image>
          </View>
          <Text style={styles.heading}>Sign in to your account</Text>
          <Text style={styles.label}>Username</Text>
          <TextField
            keyboardType={'email-address'}
            onChangeText={(value: any) => {
              this.setState({
                userName: value
              })
            }}
            onBlur={() => {
              this.setState({
                userNameError: validate('required', this.state.userName, 'Username')
              })
            }}
            error={this.state.userNameError}/>

          <Text style={[styles.label]}>Password</Text>
          <TextField
            onChangeText={(value: any) => {
              this.setState({
                password: value
              })
            }}
            onBlur={() => {
              this.setState({
                passwordError: validate('password', this.state.password)
              })
            }}
            secureTextEntry={!this.state.showPassword}
            error={this.state.passwordError}/>
          
          <View style={styles.row}>
            <CheckBox title='Show password' 
              containerStyle={[styles.checkBoxContainer, styles.flex]} textStyle={styles.checkBoxLabel}
              checked={this.state.showPassword} onPress={this.onRememberMeChange}/>
            <TouchableOpacity onPress={this.onForgetPassword}>
              <Text style={[styles.label, styles.link]}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
          <ActionButton title="Sign in" inverted={true} onPress={this.onSignIn} style={styles.buttonStyle}/>          
          <TouchableOpacity onPress={this.onRegister}>
            <Text style={[styles.label, styles.signup]}>Not an existing user? <Text style={styles.link}>Signup here</Text></Text>
          </TouchableOpacity>
        </View> : null }
      {(this.props.loading || !this.state.showPage)&& <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
   flex: {
    flex: 1
   },
   container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginLeft: 5,
    marginRight: 5,
    padding: 20
  },
  skipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  skip: {
    ...typos.HEADLINE,
    fontWeight: 'normal',
    color: colors.TEXT_NOTE,
    padding: 10,
    marginTop: 20,
    marginRight: -10,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'center',
  },
  image: {
    width: 102,
    height: 54,
  },
  heading: {
    ...typos.SUBHEADLINE,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginBottom: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    ...typos.PRIMARY,
    color: colors.TEXT_NOTE,
    marginTop: 15,
    marginBottom: 5
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
    color: colors.LIGHT_ORANGE,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.LIGHT_ORANGE
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
  buttonStyle: {
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  signup: {
    textAlign: 'center',
    marginVertical: 10,
  }
});

const LoginScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export { LoginScreenWrapper as LoginScreen } 