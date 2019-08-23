import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';

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
  NavigationInjectedProps &
  IUser.StateToProps &
  IUser.DispatchFromProps;

// state
interface IState {
  username: string;
  // Errors
  usernameError: string
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class ForgetPasswordScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
        username: '',   
        // Errors
        usernameError: '',
    };
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      usernameError: validate('required', this.state.username, 'Username'),
    });
    return !this.state.usernameError;
  }


  onSubmit = async () => {
    if (!(await this.validate())) {
      return;
    }
    const repsonse: any = await this.props.forgotPassword(this.state.username);
    if (repsonse.success) {
      this.redirectToLogin();
    }
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
            <Text style={styles.heading}>Forgot your password?</Text>
            <Text style={[styles.heading, styles.note]}>Enter your email address to reset your password. You may need to check your spam folder or unblock no-reply@factscloud.com.</Text>
            <Text style={styles.label}>Username</Text>
            <TextField
                onChangeText={(value: any) => {
                  this.setState({
                    username: value
                  })
                }}
                onBlur={() => {
                  this.setState({
                    usernameError: validate('required', this.state.username, 'Username')
                  })
                }}
                error={this.state.usernameError}/>
              
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordScreen);
