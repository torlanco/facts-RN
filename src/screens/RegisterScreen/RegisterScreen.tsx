import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

// Component
import { ActionButton, HeaderBar, TextField, PhoneField, FieldType } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/user';
import { ScrollView } from 'react-native-gesture-handler';
import { validate } from '@utils';
import { Divider } from 'react-native-elements';
import {Keyboard} from 'react-native';

// props
interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IUser.StateToProps &
  IUser.DispatchFromProps;

// state
interface IState {
  email: string;
  password: string;
  cpassword: string;
  firstName: string,
  lastName: string,
  showPassword: boolean,
  phone: string,
  // Errors
  emailError: string,
  passwordError: string,
  cpasswordError: string,
  firstNameError: string,
  lastNameError: string,
  phoneError: string,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class RegisterScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      cpassword: '',
      firstName: '',
      lastName: '',
      showPassword: false,
      phone: '',
      // Errors
      emailError: '',
      passwordError: '',
      cpasswordError: '',
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      emailError: validate('email', this.state.email),
      passwordError: validate('password', this.state.password),
      cpasswordError: validate('cpassword', this.state.cpassword, undefined, this.state.password),
      firstNameError: validate('optional', this.state.firstName, 'First name'),
      lastNameError: validate('optional', this.state.lastName, 'Last name'),
      phoneError: validate('optional', this.state.phone, 'Phone'),
    });
    return !(this.state.emailError || this.state.passwordError || this.state.cpasswordError
      || this.state.firstNameError || this.state.lastNameError || this.state.phoneError);
  }

  onSignUp = async () => {
    if (!(await this.validate())) {
      return;
    }
    const userData: IUser.IUserData = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      cpassword: this.state.cpassword,
    }
    const response: any = await this.props.register(userData);
    if (response.success) {
      this.redirectToMain();
    }
  }

  onLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  }

  redirectToMain = () => {
    this.props.navigation.navigate('Main');
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title="" rightText='Skip' onRightTextClick={this.redirectToMain}></HeaderBar>
          <KeyboardAvoidingView style={styles.flex} behavior="padding" enabled keyboardVerticalOffset={0}>
            <ScrollView showsVerticalScrollIndicator={false} onScroll={Keyboard.dismiss}>
              <View style={[styles.flex, styles.container]}>
                <Text style={styles.heading}>Sign up</Text>
                <Text style={styles.subHeadig}>create an account</Text>

                <Text style={styles.label}>Email</Text>
                <TextField
                  onChangeText={(value: any) => {
                    this.setState({
                      email: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      emailError: validate('email', this.state.email)
                    })
                  }}
                  error={this.state.emailError}/>

                <Text style={styles.label}>First name</Text>
                <TextField
                  onChangeText={(value: any) => {
                    this.setState({
                      firstName: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      firstNameError: validate('optional', this.state.firstName, 'First name')
                    })
                  }}
                  error={this.state.firstNameError}/>

                <Text style={styles.label}>Last name</Text>
                <TextField
                  onChangeText={(value: any) => {
                    this.setState({
                      lastName: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      lastNameError: validate('optional', this.state.lastName, 'Last name')
                    })
                  }}
                  error={this.state.lastNameError}/>

                <Text style={styles.label}>Phone</Text>
                <PhoneField
                  onChangeText={(value: any) => {
                    this.setState({
                      phone: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      phoneError: validate('phone', this.state.phone)
                    })
                  }}
                  error={this.state.phoneError}/>

                <Text style={styles.label}>Password</Text>
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
                  error={this.state.passwordError}
                  type={FieldType.PASSWORD}/>

                <Text style={styles.label}>Confirm Password</Text>
                <TextField
                  onChangeText={(value: any) => {
                    this.setState({
                      cpassword: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      cpasswordError: validate('cpassword', this.state.cpassword, undefined, this.state.password)
                    })
                  }}
                  error={this.state.cpasswordError}
                  type={FieldType.PASSWORD}/>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <View style={[styles.bottomAction]}>
            <Divider style={{marginVertical: 10, backgroundColor: colors.BLACK}}/>
            <View style={styles.row}>
              <View style={[styles.flex, styles.row]}>
                  <View style={[{paddingTop: 15}]}>
                    <Text style={styles.bottomActionText}>Have an account?</Text>
                    <TouchableOpacity onPress={this.onLogin}>
                      <Text style={[styles.bottomActionText, styles.boldLink]}>Log in</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.flex}></View>
              </View>
              <View style={styles.flex}>
                <ActionButton title="Register" inverted={true} onPress={this.onSignUp} invertedStyle={styles.buttonStyle}/>
              </View>
            </View>
          </View>
        </View>
        {(this.props.loading) && <LoadingScreen />}
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
    paddingHorizontal: 15,
    paddingBottom: 100
  },
  imageContainer: {
    marginVertical: 5,
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
    marginBottom: 15
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
    borderRadius: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  signin: {
    textAlign: 'center',
    marginVertical: 10,
  },
  link: {
    ...typos.PRIMARY,
    color: colors.BLACK,
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
  bottomAction: {
    position: "absolute",
    bottom: 0,
    left: 22,
    right: 22,
    zIndex: 1,
    paddingBottom: 20,
    backgroundColor: colors.WHITE
  },
  bottomActionText: {
    ...typos.PRIMARY_LIGHT,
    color: colors.BLACK,
    textAlign: 'right',
    margin: 0,
    padding: 0,
  },
  boldLink: {
    ...typos.PRIMARY,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  }
});

const RegisterScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
export { RegisterScreenWrapper as RegisterScreen }
