import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, HeaderBar, TextField, PhoneField } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/user';
import { validate, CONSTANTS } from '@utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OTPInputView from '@twotalltotems/react-native-otp-input'

interface ParamType {
  type?: string;
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
  username: string;
  otpRequested: boolean;
  otp: string;
  disableResend: boolean;
  // Errors
  usernameError: string,
  otpError: string,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class ForgetPasswordScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _subscription: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      username: '',  
      otpRequested: false, 
      otp: '',
      disableResend: false,
      // Errors
      usernameError: '',
      otpError: '',
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    const { type } = this.props.navigation.state.params;
    const state: any = {};
    state.usernameError = type ? validate('required',  this.state.username, 'Username') : validate('phone', this.state.username);
    if (this.state.otpRequested) {
      state.otpError = validate('required', this.state.otp, 'Otp');
    }
    await this.setAsyncState(state);
    return !(this.state.usernameError || this.state.otpError);
  }

  onSubmit = async () => {
    const { type } = this.props.navigation.state.params;
    if (!(await this.validate())) {
      return;
    }
    if (type) {
      const response: any = await this.props.forgotPassword(this.state.username);
      //@Mohit Get otp from mail and do the functioning when its is done.
    } else if (this.state.otpRequested) {
      const response: any = await this.props.verifyResetPasswordOtp(this.state.username, this.state.otp);
      if (response.token) {
        this.redirectToResetPassword(response.token);
      } else {
        this.setState({
          otpError: response.errText
        })
      }     
    } else {
      this.requestOtp();
    }
  }

  requestOtp = async () => {
    const response: any = await this.props.requestResetPasswordOtp(this.state.username);
    if (response.success) {
      this.setState({
        otp: '', otpError: '', otpRequested: true, disableResend: true
      }, () => {
        setTimeout(() => {
          if (this.state.disableResend) {
            this.setState({
              disableResend: false
            });
          }
        })
      })
    } else if (response.errText) {
      this.setState({
        usernameError: response.errText
      })
    }
  }

  redirectToResetPassword = (token: string) => {
    this.props.navigation.replace('ResetPasswordScreen', {token});
  }
  
  onEdit = () => {
    this.setState({
      otp: '',
      otpError: '',
      usernameError: '',
      otpRequested: false,
      disableResend: false
    })
  }

  public render() {
    const { type } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title=""></HeaderBar>
          <View style={[styles.flex, styles.container]}>
            <View style={[styles.row, styles.imageContainer]}>
                <Image style={styles.image} source={require('@assets/images/logo.png')}></Image>
            </View>
            <Text style={styles.heading}>Forgot your password?</Text>
            <Text style={[styles.heading, styles.note]}>{type ? CONSTANTS.FORGOT_PASSWORD_WITH_EMAIL_TEXT : CONSTANTS.FORGOT_PASSWORD_WITH_OTP_TEXT}</Text>
            
            <Text style={[styles.label]}>{type ? 'Username': 'Phone'}</Text>
            { type ? 
              <TextField
                  nonEditable={this.state.otpRequested}
                  onChangeText={(value: any) => {
                    this.setState({
                      username: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      usernameError: validate('required',  this.state.username, 'Username')
                    })
                  }}
                  error={this.state.usernameError}/> :
              <PhoneField
                  nonEditable={this.state.otpRequested}
                  onChangeText={(value: any) => {
                    this.setState({
                      username: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      usernameError: validate('phone',  this.state.username)
                    })
                  }}
                  error={this.state.usernameError}/> 
            }                 
            {
              <View>
                <Text style={styles.label}>OTP</Text>
                <OTPInputView
                    style={{width: '100%', height: 50}}
                    pinCount={4}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged = {code => { this.setState({otp: code})}}/>
                { this.state.otpError ? <Text style={styles.error}>{this.state.otpError}</Text> : null }
                <View style={styles.row}>
                  <View style={styles.flex}/>
                  <TouchableOpacity onPress={this.onEdit}>
                    <Text style={[styles.label, styles.link]}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.requestOtp} disabled={this.state.disableResend}>
                    <Text style={[styles.label, styles.link]}>Resend</Text>
                  </TouchableOpacity>
                </View>
              </View>    
            }
              
            <ActionButton title="Submit" inverted={true} onPress={this.onSubmit} style={styles.buttonStyle}/>
          </View>
        </View>
        {(this.props.loading)&& <LoadingScreen />}
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
    marginLeft: 5,
    marginRight: 5,
    padding: 20
  },
  imageContainer: {
    marginVertical: 10,
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
  },
  note: {
    ...typos.PRIMARY,
    fontWeight: 'normal',
    marginBottom: 10
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
  buttonStyle: {
    borderRadius: 5,
    marginTop: 50,
    marginHorizontal: 0,
    paddingHorizontal: 0
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
  link: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    paddingVertical: 10,
    marginLeft: 20,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  error: {
    ...typos.CAPTION,
    color: colors.ERROR, 
    marginTop: 3,
  },
});

const ForgetPasswordScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordScreen);
export { ForgetPasswordScreenWrapper as ForgetPasswordScreen }