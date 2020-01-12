import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, TextField, PhoneField } from '@components';
import { NavigationInjectedProps, withNavigation } from "react-navigation";

import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/user';
import { validate } from '@utils';

interface IOwnProps {
    type?: string;
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

class ForgotPasswordComponent extends React.Component<IProps, IState> {
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

  validate = async () => {
    const { type } = this.props;
    const state: any = {};
    state.emailOrPhoneError = type ? validate('required',  this.state.emailOrPhone, 'Username') : validate('phone', this.state.emailOrPhone);
    await this.setAsyncState(state);
    return !this.state.emailOrPhoneError;
  }

  onSubmit = async () => {
    const { type } = this.props;
    if (!(await this.validate())) {
      return;
    }
    if (type) {
      const response: any = await this.props.forgotPassword(this.state.emailOrPhone);
      //@Mohit Get otp from mail and do the functioning when its is done.
    } else {
      this.requestOtp();
    }
  }

  redirectToVerifyOtp = () => {
    this.props.navigation.navigate('VerifyOTPScreen', { emailOrPhone: this.state.emailOrPhone });
  } 

  requestOtp = async () => {
    const response: any = await this.props.requestResetPasswordOtp(this.state.emailOrPhone);
    if (response.success) {
      this.redirectToVerifyOtp();
    } else if (response.errText) {
      this.setState({
        emailOrPhoneError: response.errText
      })
    }
  }

  public render() {
    const { type } = this.props;
    return (
        <View style={styles.grayHover}>
            <View style={[styles.flex, styles.container]}>
                <Text style={styles.heading}>Enter</Text>
                <Text style={styles.subHeadig}>{type ? 'email': 'phone number'}</Text>
                <Text style={styles.message}>We will send an OTP on your registered {type ? 'email': 'phone'} to reset the password.</Text>
                
                <Text style={[styles.label]}>{type ? 'Email': 'Phone'}</Text>
                { type ? 
                <TextField
                    onChangeText={(value: any) => {
                        this.setState({
                        emailOrPhone: value
                        })
                    }}
                    onBlur={() => {
                        this.setState({
                        emailOrPhoneError: validate('required',  this.state.emailOrPhone, 'Email')
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
                    <ActionButton title="Recover" inverted={true} onPress={this.onSubmit} invertedStyle={styles.buttonStyle}/>
                    </View>
                </View>                  
            </View>
        </View>    
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  grayHover: {
    position: "absolute",
    zIndex: 5,
    left: 0, right: 0, bottom: 0, top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  container: {
    padding: 20,
    zIndex: 6,
    elevation: 6,
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
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
});

const ForgotPasswordComponentWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent));
export { ForgotPasswordComponentWrapper as ForgotPasswordComponent }