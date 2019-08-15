import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { ActionButton } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

// Props Action
import { connect } from "react-redux";
import { LoadingScreen } from '@screens';
import { mapDispatchToProps } from '@actions/user';
import { CheckBox } from 'react-native-elements';

// props
interface ParamType {
  isExternalCall: boolean
}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
}
type IProps = IOwnProps &
  NavigationInjectedProps;

// state
interface IState {
    showPage: boolean;
    email: string;
    password: string;
    rememberMe: boolean;
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class LoginScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);

    this.state = {
        showPage: true,
        email: '',
        password: '',
        rememberMe: false
    };
  }

  onEmailChange = (text: any) => {
    this.setState({
      email: text
    });
  }

  onPasswordChange = (text: any) => {
    this.setState({
      password: text
    });
  }
  
  onRememberMeChange = () => {
    this.setState({
      rememberMe: !this.state.rememberMe
    });
  }

  onSignIn = () => {
    this.props.navigation.navigate('Main');
  }

  onForgetPassword = () => {
    this.props.navigation.navigate('ForgetPasswordScreen');  
  }

  onRegister = () => {
    this.props.navigation.navigate('RegisterScreen');    
  }
 
  public render() {
    const { email, password } = this.state;
    return (
      <SafeAreaView style={styles.flex}>
      { this.state.showPage ? 
        <View style={styles.container}>
          <View style={[styles.row, styles.imageContainer]}>
              <Image style={styles.image} source={require('@assets/images/logo.png')}></Image>
          </View>
          <Text style={styles.heading}>Sign in to your account</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.text]} value={`${email}`} onChangeText={(text) => this.onEmailChange(text)}/>
          <View style={styles.row}>
              <Text style={[styles.label, styles.flex]}>Password</Text>
              <TouchableOpacity onPress={this.onForgetPassword} activeOpacity={.9}>
                <Text style={[styles.label, styles.link]}>Forget Password</Text>
              </TouchableOpacity>
          </View>
          <TextInput style={[styles.text]} value={`${password}`} onChangeText={(text) => this.onPasswordChange(text)}/>
          <CheckBox title='Remember Me' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' 
              containerStyle={styles.checkBoxContainer} textStyle={styles.checkBoxLabel}
              checked={this.state.rememberMe} onPress={this.onRememberMeChange}/>
          <ActionButton title="Sign in" inverted={true} onPress={this.onSignIn} style={styles.buttonStyle}/>
          <TouchableOpacity onPress={this.onRegister} activeOpacity={.9}>
            <Text style={[styles.label, styles.signup]}>Not an existing user? <Text style={styles.link}>Signup here</Text></Text>
          </TouchableOpacity>
        </View> : null }
      {(this.props.loading || !this.state.showPage)&& <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
   flex: {
       flex: 1
   },
   container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginLeft: 5,
    marginRight: 5,
    padding: 20
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 10,
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
    marginBottom: 15
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
  link: {
    color: colors.LIGHT_ORANGE,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.LIGHT_ORANGE
  },
  checkBoxContainer: {
    backgroundColor: colors.WHITE,
    marginVertical: 15,
    marginLeft: 0,
    padding: 0,
    width: 140,
    borderWidth: 0
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
  signup: {
    textAlign: 'center',
    marginVertical: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
