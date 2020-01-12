import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, BackHandler } from 'react-native';
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
import { CheckBox, Divider } from 'react-native-elements';
import { validate, CONSTANTS } from '@utils';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';

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
  showForgotPassword: boolean;
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class LoginScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _passwordField: any;
  _backHandler: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      showPassword: false,
      userNameError: '',
      passwordError: '',
      showForgotPassword: false
    };
  }
  
  componentDidMount() {
    this._backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this._backHandler.remove()
  }

  handleBackPress = () => {
    if (this.state.showForgotPassword) {
      this.setState({
        showForgotPassword: false
      })
    } else {
      this.props.navigation.goBack(); 
    }
    return true;
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
    this.setState({
      showForgotPassword: true
    })
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
                <Text style={[styles.link]}>forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.bottomAction]}>
              <Divider style={{marginVertical: 10, backgroundColor: colors.BLACK}}/>
              <View style={styles.row}>
                <View style={[styles.flex, styles.row, {paddingTop: 5}]}>
                  <View style={[{paddingTop: 8}]}>
                    <Text style={styles.bottomActionText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={this.onRegister}>
                      <Text style={[styles.bottomActionText, styles.boldLink]}>Register Now</Text>
                    </TouchableOpacity>              
                  </View>
                  <View style={styles.flex}></View>
                </View>
                <View style={styles.flex}>
                  <ActionButton title="Log in" inverted={true} onPress={this.onSignIn} style={styles.buttonStyle}/>          
                </View>
              </View>
            </View>    
          </View> 
          { this.state.showForgotPassword && <ForgotPasswordComponent/> }   
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
    alignItems: 'center',
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
    ...typos.PRIMARY_LIGHT,
    color: colors.TEXT_PRIMARY,
    paddingVertical: 10,
    textDecorationLine: 'underline', 
    textDecorationStyle: 'solid'
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
    bottom: 20, 
    left: 22,
    right: 22,
    zIndex: 1,
    backgroundColor: colors.WHITE
  }, 
  bottomActionText: {
    ...typos.PRIMARY_MEDIUM,
    color: colors.BLACK,
    textAlign: 'right',
    margin: 0,
    padding: 0,
  },
  boldLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
    textDecorationStyle: 'solid'
  }
});

const LoginScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export { LoginScreenWrapper as LoginScreen } 