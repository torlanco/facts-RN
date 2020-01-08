import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, TextField, FieldType, HeaderBar } from '@components';
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
  isExternalCall?: boolean
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
  _passwordField: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      showPassword: false,
      userNameError: '',
      passwordError: '',
    };
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
        passwordError: CONSTANTS.INVALID_LOGIN_CREDENTIALS
      });
      this._passwordField.clear();
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
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title="" rightText='Skip' onRightTextClick={this.redirectToMain}></HeaderBar>
          <View style={styles.container}>
            <Text style={styles.heading}>Log in</Text>
            <Text style={styles.subHeadig}>to continue</Text>
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
              ref={input => { this._passwordField = input }}
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
              error={this.state.passwordError}
              type={FieldType.PASSWORD}/>
            
            <View style={styles.row}>
              <TouchableOpacity onPress={this.onForgetPassword}>
                <Text style={[styles.link]}>forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.flex}></View>
              <View style={styles.flex}>
                <ActionButton title="Log in" inverted={true} onPress={this.onSignIn} style={styles.buttonStyle}/>          
              </View>
            </View>
            <View style={[styles.bottomAction]}>
              <Text style={styles.bottomActionText}>Don't have an account?</Text>
              <TouchableOpacity onPress={this.onRegister}>
                <Text style={[styles.bottomActionText, styles.bold]}>Register Now</Text>
              </TouchableOpacity>              
            </View>    
          </View> 
        </View>
      { this.props.loading && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
   flex: {
    flex: 1
   },
   mainContainer: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   },
   container: {
    flex: 1,
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
    color: colors.BLACK,
    padding: 10,
    marginTop: 20,
    marginRight: -10,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'center',
  },
  heading: {
    ...typos.TITLE,
    fontWeight: 'bold',
    marginTop: 40
  },
  subHeadig: {
    ...typos.TITLE_REGULAR,
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
  buttonStyle: {
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  bottomAction: {
    position: "absolute",
    bottom: 30, 
    right: 22,
  }, 
  bottomActionText: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    textAlign: 'right'
  },
  bold: {
    fontWeight: 'bold'
  }
});

const LoginScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export { LoginScreenWrapper as LoginScreen } 