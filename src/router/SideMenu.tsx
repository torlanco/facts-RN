import * as React from 'react';

//ui
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import { responsive, colors, typos } from '@styles';
import { SafeAreaView } from 'react-navigation';

//redux
import { connect } from 'react-redux';

//interfaces
import { IUser } from '@interfaces/user';
import { DrawerItemsProps } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { mapDispatchToProps } from '@actions/user';
import { ActionButton } from '@components';
import FullWidthImage from 'react-native-fullwidth-image';
import Logo from "../../assets/images/logo.svg";

interface IOwnProps {}
type IProps = IOwnProps &
  DrawerItemsProps &
  IUser.StateToProps &
  IUser.DispatchFromProps;

const data = [
  { iconName: 'home', title: 'Home', routeName: 'Home' },
  { iconName: 'book', title: 'Outlet', routeName: 'Outlet' },
  // { iconName: 'briefcase', title: 'Work', routeName: 'Work', requiredAuth: true },
  // { iconName: 'book', title: 'Features', routeName: 'Features' },
  // { iconName: 'file', title: 'Docs', routeName: 'Docs' },
  { iconName: 'heart', title: 'Favorites', routeName: 'Favorites', requiredAuth: true, hideTillLogin: true },
  { iconName: 'user', title: 'Profile', routeName: 'Profile', requiredAuth: true, hideTillLogin: true },
];

const mapStateToProps = function(state: any) {
  return {
    token: state.user.token,
    loggedInUser: state.user.loggedInUser,
  }
};

const SideMenu: React.SFC<IProps> = (props: IProps) => {
  const { navigation } = props;

  const isLoggedIn = () =>  {
    return typeof props.token === "string" && props.token;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            requestAnimationFrame(() =>
              navigation.navigate(!isLoggedIn() && item.requiredAuth ? 'LoginScreen' : `${item.routeName}`)
            );
          }}>
          <View style={styles.wrapper}>
            <Icon
              name={item.iconName}
              type='font-awesome'
              color={colors.TEXT_PRIMARY}
              containerStyle={styles.iconContainer} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  };

  const onLogin = () => {
    requestAnimationFrame(() => navigation.navigate('LoginScreen'));
  }

  const onLogout = async () => {
    navigation.closeDrawer();
    const logout = await props.logout();
    if (logout) {
      onLogin();
    }
  }

  const renderFooter = () => {
    return (
      <View>
        {isLoggedIn() && <View>
          {props.loggedInUser && props.loggedInUser.profileImage && <View style={styles.profileContainer}>
              <FullWidthImage style={ styles.profileImage } source={{ uri: props.loggedInUser.profileImage }}/>
          </View> }
          {props.loggedInUser && <Text style={styles.caption}>{props.loggedInUser.email}</Text> }
        </View> }
        <ActionButton title={isLoggedIn() ? 'LOG OUT' : 'LOG IN'}
          onPress={isLoggedIn() ? onLogout : onLogin} inverted={true}
          invertedStyle={styles.buttonContainerStyle}
          invertedButtonStyle={styles.buttonStyle} invertedTitleStyle={styles.buttonTextStyle}/>
      </View>
    );
  };

  const onProfile = () => {
    requestAnimationFrame(() => navigation.navigate('Profile'));
  }

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={{height: '100%', padding: 20}}>
        <View style={[styles.row, styles.imageContainer]}>
          <Logo width={100} />
        </View>
        <FlatList
          data={data.filter(item => isLoggedIn() || !item.hideTillLogin)}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle= {{flex: 1}}/>
        { renderFooter() }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: responsive(60),
  },
  wrapper: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  separator: {
    position: 'absolute',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.MID_GRAY,
    bottom: 0,
    left: 0,
    right: 0
  },
  title: {
    marginLeft: responsive(15),
    ...typos.TITLE,
    color: colors.TEXT_PRIMARY,
    textTransform: 'uppercase'
  },
  iconContainer: {
    width: responsive(40),
  },
  buttonContainer: {
    width: 150
  },
  buttonContainerStyle: {
    width: 150,
    borderRadius: 5,
    borderColor: colors.WHITE,
    backgroundColor: colors.ERROR,
    borderWidth: 1,
    marginHorizontal: 0,
  },
  buttonStyle: {
    borderWidth: 0,
    backgroundColor: colors.ERROR,
  },
  buttonTextStyle: {
    color: colors.WHITE
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    marginBottom: 0,
  },
  image: {
    width: 90,
    height: 50,
  },
  caption: {
    ...typos.CAPTION,
    paddingLeft: 2,
    paddingVertical: 4,
  },
  profileContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.LIGHTER_GRAY,
    elevation: 1,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  profileImage: {
    height: '100%',
    width: '100%',
  }
});

const SideMenuConnected = connect(mapStateToProps, mapDispatchToProps)(SideMenu);
export { SideMenuConnected as SideMenu };
