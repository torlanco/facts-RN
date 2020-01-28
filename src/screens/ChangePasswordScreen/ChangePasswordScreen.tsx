import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { ActionButton, HeaderBar, TextField, FieldType } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps } from '@actions/user';
import { validate } from '@utils';
import { CheckBox } from 'react-native-elements';
import { IUser } from '@interfaces/user';

// props
interface ParamType {
  token?: string;
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
  oldPassword: string;
  password: string;
  confirmPassword: string;
  // Errors
  oldPasswordError: string;
  passwordError: string
  confirmPasswordError: string
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class ChangePasswordScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        token: '',
        // Errors
        oldPasswordError: '',
        passwordError: '',
        confirmPasswordError: '',
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      oldPasswordError: validate('password', this.state.oldPassword),
      passwordError: validate('password', this.state.password),
      confirmPasswordError: !this.state.confirmPassword || this.state.password != this.state.confirmPassword ? 'Password must be same.' : '',
    });
    return !(this.state.oldPasswordError || this.state.passwordError || this.state.confirmPasswordError);
  }

  changePassword = async () => {
    if (!(await this.validate())) {
      return;
    }
    const response: any = await this.props.changePassword(this.state.oldPassword,
      this.state.password, this.state.confirmPassword);
    if (response.success) {
      this.props.navigation.goBack();
    } else {
      this.setState({
        oldPasswordError: response.errText
      });
    }
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title=""></HeaderBar>
          <View style={[styles.flex, styles.container]}>
            <Text style={styles.heading}>Change password</Text>
            <View>
              <Text style={styles.label}>Old Password</Text>
              <TextField
                onChangeText={(value: any) => {
                  this.setState({
                    oldPassword: value
                  })
                }}
                onBlur={() => {
                  this.setState({
                    oldPasswordError: validate('password', this.state.oldPassword)
                  })
                }}
                error={this.state.oldPasswordError}
                type={FieldType.PASSWORD}/>

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
                error={this.state.passwordError}
                type={FieldType.PASSWORD}/>

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
                error={this.state.confirmPasswordError}
                type={FieldType.PASSWORD}/>
            </View>

            <View style={styles.row}>
              <View style={styles.flex}></View>
              <View style={styles.flex}>
                <ActionButton title="Save" inverted={true} onPress={this.changePassword} invertedStyle={styles.buttonStyle}/>
              </View>
            </View>

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
    marginTop: 40,
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

const ChangePasswordScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);
export { ChangePasswordScreenWrapper as ChangePasswordScreen }
