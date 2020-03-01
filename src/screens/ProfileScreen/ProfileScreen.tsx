import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, BackHandler } from 'react-native';
import { typos, colors } from '@styles';

// Interfaces
import { IUser } from '@interfaces/user';
import { IDoc } from '@interfaces/doc';

// Component
import { Icon } from 'react-native-elements';
import { ActionButton, HeaderBar, TextField, FieldType, PhoneField } from '@components';
import { StatusBar, Platform } from "react-native";
import { NavigationInjectedProps, NavigationScreenProp, NavigationState } from "react-navigation";

import { connect } from "react-redux";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { mapDispatchToProps as userAction } from '@actions/user';
import { mapDispatchToProps as docAction } from '@actions/doc';
import { validate } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';
import FullWidthImage from 'react-native-fullwidth-image';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { CONSTANTS } from '@utils';

// props
interface IOwnProps {
  navigation: NavigationScreenProp<NavigationState>;
  token: any;
  loggedInUser: any;
}
type IProps = IOwnProps &
  NavigationInjectedProps &
  IUser.StateToProps &
  IUser.DispatchFromProps &
  IDoc.StateToProps &
  IDoc.DispatchFromProps;

// state
interface IState {
  profileImage: string,
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
    loading: state.user.loading || state.doc.loading,
    token: state.user.token,
    loggedInUser: state.user.loggedInUser,
  }
};

class ProfileScreen extends React.Component<IProps, IState> {
  _isMounted = false;
  _backHandler: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      profileImage: '',
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
      editable: false,
    };
  }

  componentDidMount() {
    if (this.props.loggedInUser) {
      this.updateStateWithGlobalState();
    }
    this._backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this._backHandler.remove()
  }

  handleBackPress = () => {
    this.onCancel();
    this.props.navigation.goBack();
    return true;
  }

  fetchUserInfo = async (doInBackground?: boolean) => {
    const response: any = await this.props.fetchUserInfo(this.props.token, doInBackground);
    if (!response.errText && !doInBackground) {
      this.updateStateWithGlobalState();
    }
  }

  setAsyncState = (newState: any) => {
    return new Promise((resolve) => this.setState(newState, () => resolve()));
  }

  validate = async () => {
    await this.setAsyncState({
      firstNameError: validate('required', this.state.firstName, 'First name'),
      lastNameError: validate('required', this.state.lastName, 'Last name'),
      phoneError: validate('phone', this.state.phone),
    });
    return !(this.state.firstNameError || this.state.lastNameError || this.state.phoneError);
  }

  updateStateWithGlobalState = () => {
    if (this.props.loggedInUser) {
      this.setState({
        profileImage: this.props.loggedInUser.profileImage ? this.props.loggedInUser.profileImage   : '',
        // userName: this.props.loggedInUser.username,
        email: this.props.loggedInUser.email,
        firstName: this.props.loggedInUser.firstName ? this.props.loggedInUser.firstName   : '',
        lastName: this.props.loggedInUser.lastName ? this.props.loggedInUser.lastName : '',
        phone: this.props.loggedInUser.phone ? this.props.loggedInUser.phone : '',
      })
    }
  }

  onSave = async () => {
    const userData = { firstName: this.state.firstName, lastName: this.state.lastName, phone: this.state.phone };
    const response: any = await this.props.updateUserInfo(this.props.token, userData);
    if (!response.errText) {
      this.setState({
        editable: false
      });
      this.fetchUserInfo(true);
    }
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

  redirectToChangePassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen');
  }

  selectProfileImage = async () => {
    const options = ['Pick from Gallery', 'Capture Image', 'Cancel'];
    if (this.state.profileImage) {
      options.splice(0, 0, 'View Profile');
    }
    const destructiveButtonIndex = -1;
    const cancelButtonIndex = this.state.profileImage ? 3 : 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (this.state.profileImage) {
          if (buttonIndex == 0) {
            this.props.navigation.navigate('FullImageScreen', { image: this.state.profileImage});
          } else if (buttonIndex == 1) {
            this.selectImageFromGallery();
          } else if (buttonIndex == 2) {
            this.captureImage();
          }
        } else {
          if (buttonIndex == 0) {
            this.selectImageFromGallery();
          } else if (buttonIndex == 1) {
            this.captureImage();
          }
        }
      },
    );
  }

  selectImageFromGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status == 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.6
      });
      if (!result.cancelled) {
        this.setProfileImage(result.uri, true);
      }
    }
  }

  captureImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status == 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.6
      });
      if (!result.cancelled) {
        this.setProfileImage(result.uri, true);
      }
    }
  }

  setProfileImage = (profileImage: any, callUpdate?: boolean) => {
    this.setState({ profileImage }, () => {
       if (callUpdate) {
         this.uploadProfileImage();
       }
    });
  }

  uploadProfileImage = async () => {
    if (this.props.loggedInUser && this.state.profileImage != this.props.loggedInUser.profileImage) {
      let response: any = await this.props.uploadDoc(this.props.token, this.state.profileImage, CONSTANTS.UPLOAD_PROFILE_IMAGE_TYPE);
      if (response && response.path) {
        const userData: any = {
          firstName: this.props.loggedInUser.firstName,
          lastName: this.props.loggedInUser.lastName,
          profileImage: response.path
        };
        await this.props.updateUserInfo(this.props.token, userData);
        await this.props.fetchUserInfo(this.props.token, true);
        console.log(this.props.loggedInUser);
      }
    }
  }

  public render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.mainContainer]}>
          <HeaderBar title="PROFILE" titleStyle={{textAlign: "left"}}
            rightIcon={this.state.editable ? '' : 'edit'} onRightIconClick={this.onEdit}
            rightText={this.state.editable ? 'Cancel' : ''} onRightTextClick={this.onCancel}></HeaderBar>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.flex, styles.container]}>

                <View style={[styles.row, {marginTop: 25}]}>
                    <TouchableOpacity activeOpacity={0.85} onPress={this.selectProfileImage}>
                      <View style={styles.profileContainer}>
                        {this.state.profileImage ? <Image style={ styles.image } source={{ uri: this.state.profileImage }}/> :
                          <Icon
                            name='camera'
                            type='feather'
                            color={colors.WHITE}/> }
                      </View>
                    </TouchableOpacity>
                    { /* <TouchableOpacity activeOpacity={0.85} onPress={this.uploadProfileImage}        >
                      <Text style={[styles.label, {...typos.PRIMARY_MEDIUM}]}>Upload Profile Image</Text>
                    </TouchableOpacity> */ }
                </View>

                { /* <Text style={styles.label}>User name</Text>
                <TextField
                  defaultValue={this.props.loggedInUser ? this.props.loggedInUser.username : ''}
                  nonEditable={true}/> */ }

                <Text style={styles.label}>Email</Text>
                <TextField
                  defaultValue={this.props.loggedInUser ? this.props.loggedInUser.email : ''}
                  nonEditable={true}/>

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
                <TextField
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

                { !this.state.editable && <View>
                    <View style={styles.row}>
                      <Text style={[styles.label, styles.flex]}>Password</Text>
                      <TouchableOpacity onPress={this.redirectToChangePassword}>
                        <Text style={[styles.label]}>Change Password</Text>
                      </TouchableOpacity>
                    </View>
                    <TextField
                      defaultValue="********"
                      nonEditable={true}
                      type={FieldType.PASSWORD}
                      hideVisibleToggler={true}/>
                  </View> }

                { this.state.editable && <View>
                    <View style={[styles.row, {marginTop: 40}]}>
                      <View style={styles.flex}/>
                      <View style={styles.flex}>
                        <ActionButton title="Save" inverted={true} onPress={this.onSave} invertedStyle={styles.buttonStyle}/>
                      </View>
                    </View>
                  </View> }
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
    alignItems: 'center',
    margin: 0,
    padding: 0,
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
    padding: 10,
  },
  buttonStyle: {
    borderRadius: 0,
    marginTop: 30,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  signin: {
    textAlign: 'center',
    marginVertical: 10,
  },
  link: {
    ...typos.PRIMARY,
    color: colors.BLACK,
    display: "flex",
    marginTop: 15,
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
  },
  profileContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.LIGHTER_GRAY,
    elevation: 3,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    height: 100,
    width: 100,
  }
});


const ProfileScreenWrapper = connectActionSheet(connect(mapStateToProps, {...userAction, ...docAction})(ProfileScreen));
export { ProfileScreenWrapper as ProfileScreen }
