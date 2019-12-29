import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
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
  firstName: string,
  lastName: string,
  phone: string,
  // Errors
  firstNameError: string,
  lastNameError: string,
  phoneError: string,
  // Others
  editable: boolean,
}

const mapStateToProps = function(state: any) {
  return {
    loading: state.user.loading,
  }
};

class ProfileScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _userData = {
    userName: 'mohit',
    email: 'mohit@gmail.com',
    firstName: 'Mohit',
    lastName: 'Nagori',
    phone: '9784323158',
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      // Errors
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
      // Others
      editable: false
    };
  }

  componentDidMount() {
    this.updateStateWithGlobalState();
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      firstNameError: validate('required', this.state.firstName, 'First name'),
      lastNameError: validate('required', this.state.lastName, 'Last name'),
      phoneError: validate('required', this.state.phone, 'Phone'),
    });
    return !(this.state.firstNameError || this.state.lastNameError || this.state.phoneError);
  }

  updateStateWithGlobalState = () => {
    this.setState({
      userName: this._userData.userName,
      email: this._userData.email,
      firstName: this._userData.firstName,
      lastName: this._userData.lastName,
      phone: this._userData.phone
    })
  }

  onSave = async () => {
    // call api to save profile
    this.setState({
      editable: false
    });
  }

  onEdit = () => {
    this.setState({
      editable: true
    })
  }

  onCancel = () => {
    this.setState({ editable: false });
    this.updateStateWithGlobalState();
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title="Profile" titleStyle={{textAlign: "left"}} 
            rightIcon={this.state.editable ? '' : 'edit'} onRightIconClick={this.onEdit}></HeaderBar>
            <View style={[styles.flex, styles.container]}>
              <Text style={styles.label}>User name</Text>
              <Text style={styles.text}>{this.state.userName}</Text>

              <Text style={styles.label}>Email</Text>
              <Text style={styles.text}>{this.state.email}</Text>

              <Text style={styles.label}>First name</Text>
              <TextField
                defaultValue={this.state.firstName}
                nonEditable={!this.state.editable}
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
                  defaultValue={this.state.lastName}
                  nonEditable={!this.state.editable}
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
                defaultValue={this.state.phone}
                nonEditable={!this.state.editable}
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

              { this.state.editable && <View>
                  <ActionButton title="Save" inverted={true} onPress={this.onSave} style={styles.buttonStyle}/>
                  <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.onCancel}>
                      <Text style={[styles.label, styles.link]}>Cancel</Text>
                    </TouchableOpacity>    
                  </View>
                </View> }
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
    padding: 10,
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
    textDecorationColor: colors.LIGHT_ORANGE,
    display: "flex"
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  }
});

const ProfileScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export { ProfileScreenWrapper as ProfileScreen }