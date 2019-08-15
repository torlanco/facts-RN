import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, TextInput, Image } from 'react-native';
import { typos, colors } from '@styles';

// Component
import { ActionButton, HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '@screens';
import { mapDispatchToProps } from '@actions/user';

// props
interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
}
type IProps = IOwnProps &
  NavigationInjectedProps;

// state
interface IState {
    email: string;
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
        email: '',
    };
  }

  onEmailChange = (text: any) => {
    this.setState({
      email: text
    });
  }

  onSignIn = () => {
    this.props.navigation.navigate('Main');
  }

  public render() {
    const { email } = this.state;
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
            <Text style={styles.label}>Email</Text>
            <TextInput style={[styles.text]} value={`${email}`} onChangeText={(text) => this.onEmailChange(text)}/>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordScreen);
