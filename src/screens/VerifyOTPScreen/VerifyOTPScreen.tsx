import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/user';
import { validate } from '@utils';
import OTPInputView from '@twotalltotems/react-native-otp-input';

interface ParamType {
  isForLogin?: string;
  emailOrPhone?: string;
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
  otp: string;
  disableResend: boolean;
  // Errors
  otpError: string,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class VerifyOTPScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _subscription: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      otp: '',
      disableResend: false,
      // Errors
      otpError: '',
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    const state: any = {};
    state.otpError = validate('required', this.state.otp, 'Otp');
    await this.setAsyncState(state);
    return !this.state.otpError;
  }

  onSubmit = async () => {
    const { emailOrPhone } = this.props.navigation.state.params;
    if (!(await this.validate())) {
      return;
    }
    this.verifyOtp(emailOrPhone);
  }

  verifyOtp = async (emailOrPhone?: string) => {
    const { isForLogin } = this.props.navigation.state.params;
    if (isForLogin) {
      this.verifyLoginOtp(emailOrPhone);
    } else {
      this.verifyResetPasswordOtp(emailOrPhone);
    }
  }

  verifyLoginOtp = async (emailOrPhone?: string) => {
    const response: any = await this.props.loginUsingOtp(emailOrPhone, this.state.otp);
    if (response.token) {
      this.redirectToMain();
    } else {
      this.setState({
        otpError: response.errText
      })
    }
  }

  verifyResetPasswordOtp = async (emailOrPhone?: string) => {
    const response: any = await this.props.verifyResetPasswordOtp(emailOrPhone, this.state.otp);
    if (response.token) {
      this.redirectToResetPassword(response.token);
    } else {
      this.setState({
        otpError: response.errText
      })
    }
  }

  requestOtp = async () => {
    const { isForLogin } = this.props.navigation.state.params;
    if (isForLogin) {
      this.requestLoginOtp();
    } else {
      this.requestResetPasswordOtp();
    }
  }

  requestResetPasswordOtp = async () => {
    const { emailOrPhone } = this.props.navigation.state.params;
    const response: any = await this.props.requestResetPasswordOtp(emailOrPhone);
    if (response.success) {
      this.setState({
       disableResend: true
      }, () => {
        setTimeout(() => {
          if (this.state.disableResend) {
            this.setState({
              disableResend: false
            });
          }
        }, 60);
      })
    }
  }

  requestLoginOtp = async () => {
    const { emailOrPhone } = this.props.navigation.state.params;
    const response: any = await this.props.requestLoginOtp(emailOrPhone);
    if (response.token) {
      this.setState({
       disableResend: true
      }, () => {
        setTimeout(() => {
          if (this.state.disableResend) {
            this.setState({
              disableResend: false
            });
          }
        }, 60);
      })
    }
  }

  redirectToMain = () => {
    this.props.navigation.navigate('Main');
  }

  redirectToResetPassword = (token: string) => {
    this.props.navigation.replace('ResetPasswordScreen', {token});
  }

  public render() {
    const { emailOrPhone } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title=""></HeaderBar>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.flex, styles.container]}>
              <Text style={styles.heading}>Verify</Text>
              <Text style={styles.subHeadig}>code</Text>
              <Text style={styles.message}>We have sent a code to <Text style={{fontWeight: 'bold'}}>{emailOrPhone}</Text>
              </Text>

              <OTPInputView
                style={styles.otpContainer}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                code={this.state.otp}
                onCodeChanged = {(code: any) => { this.setState({otp: code})}}/>
              { this.state.otpError ? <Text style={styles.error}>{this.state.otpError}</Text> : null }

              <View style={styles.row}>
                <View>
                  <Text style={styles.linkText}>Didn't receive a code?</Text>
                  <TouchableOpacity onPress={this.requestOtp} disabled={this.state.disableResend}>
                    <Text style={[styles.linkText, styles.linkBoldLink]}>Resend Now</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.flex}>
                </View>
                <View style={styles.flex}>
                  <ActionButton title="Submit" inverted={true} onPress={this.onSubmit} invertedStyle={styles.buttonStyle}/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {this.props.loading && <LoadingScreen />}
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
    },
  container: {
    marginLeft: 5,
    marginRight: 5,
    padding: 15
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
    ...typos.BIGTEXT_BOLD,
    fontWeight: 'bold',
    marginTop: 20
  },
  subHeadig: {
    ...typos.BIGTEXT,
  },
  message: {
    ...typos.TITLE_LIGHT,
    marginTop: 10,
    marginBottom: 20
  },
  note: {
    ...typos.PRIMARY,
    fontWeight: 'normal',
    marginBottom: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
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
    borderRadius: 0,
    marginTop: 50,
    marginHorizontal: 0,
    paddingHorizontal: 0
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
    borderColor: colors.BLACK,
  },
  underlineStyleHighLighted: {
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  error: {
    ...typos.CAPTION,
    color: colors.ERROR,
    marginTop: 3,
  },
  linkText: {
    ...typos.PRIMARY_MEDIUM,
    color: colors.BLACK,
    margin: 0,
    padding: 0,
  },
  linkBoldLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  },
  otpContainer: {
    width: '60%', height: 50,
    backgroundColor: colors.PRIMARY,
    marginVertical: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});

const VerifyOTPScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(VerifyOTPScreen);
export { VerifyOTPScreenWrapper as VerifyOTPScreen }
