import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, Platform , StatusBar, ScrollView } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, TextField, PhoneField, HeaderBar } from '@components';
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, withNavigation } from "react-navigation";

import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/user';
import { validate } from '@utils';
import { Icon } from 'react-native-elements';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';


interface ParamType {
  type?: string;
  isForLogin?: boolean;
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  onBack?: Function;
  navigation: NavigationScreenProp<StateParams>;
}

type IProps = IOwnProps &
  NavigationInjectedProps &
  IUser.StateToProps &
  IUser.DispatchFromProps;

// state
interface IState {
  emailOrPhone: string;
  // Errors
  emailOrPhoneError: string,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class ForgotPasswordScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _subscription: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      emailOrPhone: '',
      // Errors
      emailOrPhoneError: '',
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  getEmailOrPhoneValidator = () => {
    const { isForLogin, type } = this.props.navigation.state.params;
    return isForLogin ? validate('emailOrPhone',  this.state.emailOrPhone)
        : (type ? validate('email',  this.state.emailOrPhone) : validate('phone', this.state.emailOrPhone));
  }

  validate = async () => {
    const { isForLogin, type } = this.props.navigation.state.params;
    await this.setAsyncState({
      emailOrPhoneError: this.getEmailOrPhoneValidator()
    });
    return !this.state.emailOrPhoneError;
  }

  validateEmailOrPhone = () => {
    return validate('emailOrPhone',  this.state.emailOrPhone);
  }

  onSubmit = async () => {
    const { isForLogin, type } = this.props.navigation.state.params;
    if (!(await this.validate())) {
      return;
    }
    if (isForLogin) {
      this.requestLoginOtp();
    } else {
      this.requestForgotPasswordOtp();
    }
  }

  redirectToVerifyOtp = (isForLogin?: boolean) => {
    this.props.navigation.navigate('VerifyOTPScreen', { emailOrPhone: this.state.emailOrPhone, isForLogin });
  }

  requestForgotPasswordOtp = async () => {
    const response: any = await this.props.requestResetPasswordOtp(this.state.emailOrPhone);
    if (response.success) {
      this.redirectToVerifyOtp();
    } else if (response.errText) {
      this.setState({
        emailOrPhoneError: response.errText
      })
    }
  }

  requestLoginOtp = async () => {
    const response: any = await this.props.requestLoginOtp(this.state.emailOrPhone);
    if (response.success) {
      this.redirectToVerifyOtp(true);
    } else if (response.errText) {
      this.setState({
        emailOrPhoneError: response.errText
      })
    }
  }

  getOtpModeText = () => {
    const { isForLogin, type } = this.props.navigation.state.params;
    return isForLogin ? 'email / phone number' : type ? 'email': 'phone number';
  }

  public render() {
    const { isForLogin, type } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={[styles.flex, styles.mainContainer]}>
            <HeaderBar title=""></HeaderBar>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.flex, styles.container]}>
                  <Text style={styles.heading}>Enter</Text>
                  <Text style={styles.subHeadig}>{this.getOtpModeText()}</Text>
                  <Text style={styles.message}>We will send an OTP on your registered {this.getOtpModeText()} to reset the password.</Text>

                  <Text style={[styles.label, {textTransform: 'capitalize'}]}>{this.getOtpModeText()}</Text>
                  { isForLogin || type ?
                  <TextField
                      onChangeText={(value: any) => {
                          this.setState({
                            emailOrPhone: value
                          })
                      }}
                      onBlur={() => {
                          this.setState({
                            emailOrPhoneError: this.getEmailOrPhoneValidator()
                          })
                      }}
                      error={this.state.emailOrPhoneError}/> :
                  <PhoneField
                      onChangeText={(value: any) => {
                          this.setState({
                            emailOrPhone: value
                          })
                      }}
                      onBlur={() => {
                          this.setState({
                            emailOrPhoneError: validate('phone',  this.state.emailOrPhone)
                          })
                      }}
                      error={this.state.emailOrPhoneError}/>
                  }

                  <View style={styles.row}>
                      <View style={[styles.flex]}>
                      </View>
                      <View style={styles.flex}>
                      <ActionButton title="Send OTP" inverted={true} onPress={this.onSubmit} invertedStyle={styles.buttonStyle}/>
                      </View>
                  </View>
              </View>
            </ScrollView>
            { this.props.loading && <LoadingScreen /> }
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
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  heading: {
    ...typos.BIGTEXT_BOLD,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  subHeadig: {
    ...typos.BIGTEXT,
  },
  message: {
    ...typos.TITLE_LIGHT,
    marginTop: 10,
    marginBottom: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30
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
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  closeIconContainer: {
    alignSelf: 'flex-end'
  }
});

const ForgotPasswordScreenWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen));
export { ForgotPasswordScreenWrapper as ForgotPasswordScreen }
