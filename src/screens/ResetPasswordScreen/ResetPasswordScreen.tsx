import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { ActionButton, HeaderBar, TextField } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '@screens';
import { mapDispatchToProps } from '@actions/user';
import { validate } from '@utils';
import { CheckBox } from 'react-native-elements';

// props
interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
}
type IProps = IOwnProps &
  NavigationInjectedProps;

// state
interface IState {
  password: string;
  confirmPassword: string;
  showPassword: boolean,
  token: string
  // Errors
  passwordError: string
  confirmPasswordError: string  
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class ResetPasswordScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
        password: '',
        confirmPassword: '',
        showPassword: false,
        token: '',
        // Errors
        passwordError: '',
        confirmPasswordError: '',   
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      passwordError: validate('password', this.state.password),
      confirmPasswordError: !this.state.confirmPassword || this.state.password != this.state.confirmPassword ? 'Password must be same.' : '',

    });
    return !(this.state.passwordError || this.state.confirmPasswordError);
  }


  onSignIn = async () => {
    if (!(await this.validate())) {
      return;
    }
    this.redirectToLogin();
  }

  redirectToLogin = () => {
    this.props.navigation.goBack();
  }


  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title=""></HeaderBar>
          <View style={[styles.flex, styles.container]}>
            <View style={[styles.row, styles.imageContainer]}>
                <Image style={styles.image} source={require('@assets/images/logo.png')}></Image>
            </View>
            <Text style={styles.heading}>Reset your password?</Text>
            {
              true || this.state.token ? 
              <View>
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
                
                <Text style={styles.label}>Confirm Password</Text>
                <TextField
                  onChangeText={(value: any) => {
                    this.setState({
                      confirmPassword: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      confirmPasswordError: validate('password', this.state.confirmPassword)
                    })
                  }}
                  secureTextEntry={!this.state.showPassword}
                  error={this.state.passwordError}/>
                  
                <CheckBox title='Show password' 
                  containerStyle={[styles.checkBoxContainer, styles.flex]} textStyle={styles.checkBoxLabel}
                  checked={this.state.showPassword} onPress={() => this.setState({
                    showPassword: !this.state.showPassword
                  })}/>
              
              </View> : null
            }    
            <ActionButton title="Submit" inverted={true} onPress={this.onSignIn} style={styles.buttonStyle}/>
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
    marginTop: 30,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
