import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
import { validate } from '@utils';
import { CheckBox } from 'react-native-elements';

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
  userName: string,
  email: string;
  password: string;
  firstName: string,
  lastName: string,
  showPassword: boolean,
  phone: string,
  // Errors
  userNameError: string,
  emailError: string,
  passwordError: string,
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
      userName: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      showPassword: false,
      phone: '',
      // Errors
      userNameError: '',
      emailError: '',
      passwordError: '',
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
      userNameError: validate('required', this.state.userName, 'Username'),
      emailError: validate('email', this.state.email),
      passwordError: validate('password', this.state.password),
      firstNameError: validate('required', this.state.firstName, 'First name'),
      lastNameError: validate('required', this.state.lastName, 'Last name'),
      phoneError: validate('required', this.state.phone, 'Phone'),
    });
    return !(this.state.userNameError || this.state.emailError || this.state.passwordError 
      || this.state.firstNameError || this.state.lastNameError || this.state.phoneError);
  }

  onSignUp = async () => {
    if (!(await this.validate())) {
      return;
    }
    const userData: IUser.IUserData = {
      username: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone
    }
    const response: any = await this.props.register(userData);
    if (response.success) {
      this.props.navigation.goBack();
    }
  }

  onLogin = () => {
    this.props.navigation.goBack();
  }

  redirectToMain = () => {
    this.props.navigation.navigate('Main');
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title="" rightText='Skip' onRightTextClick={this.redirectToMain}></HeaderBar>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.flex, styles.container]}>
              <View style={[styles.row, styles.imageContainer]}>
                  <Image style={styles.image} source={require('@assets/images/logo.png')}></Image>
              </View>
              <Text style={styles.heading}>Create your account</Text>
              <Text style={styles.label}>User name</Text>
              <TextField
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
                    firstNameError: validate('required', this.state.firstName, 'First name')
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
                    lastNameError: validate('required', this.state.lastName, 'Last name')
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
                secureTextEntry={!this.state.showPassword}
                error={this.state.passwordError}/>
              <CheckBox title='Show password' 
                containerStyle={[styles.checkBoxContainer, styles.flex]} textStyle={styles.checkBoxLabel}
                checked={this.state.showPassword} onPress={() => this.setState({
                  showPassword: !this.state.showPassword
                })}/>
                
              <ActionButton title="Register" inverted={true} onPress={this.onSignUp} style={styles.buttonStyle}/>
              <TouchableOpacity onPress={this.onLogin}>
                <Text style={[styles.label, styles.signin]}>Already a user? <Text style={styles.link}> Login here</Text></Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    paddingHorizontal: 20,
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
  buttonStyle: {
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 0,
    paddingHorizontal: 0
  },
  signin: {
    textAlign: 'center',
    marginVertical: 10,
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
});

const RegisterScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
export { RegisterScreenWrapper as RegisterScreen }