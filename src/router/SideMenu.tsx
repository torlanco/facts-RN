import * as React from 'react';

//ui
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
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

interface IOwnProps {}
type IProps = IOwnProps & 
  DrawerItemsProps &
  IUser.StateToProps & 
  IUser.DispatchFromProps;

const data = [
  { iconName: 'user', title: 'Profile', routeName: 'Profile', requiredAuth: true, hideTillLogin: true },
  { iconName: 'home', title: 'Home', routeName: 'Home' },
  { iconName: 'book', title: 'Outlet', routeName: 'Outlet' },
  { iconName: 'briefcase', title: 'Work', routeName: 'Work', requiredAuth: true },
  { iconName: 'book', title: 'Features', routeName: 'Features' },
  { iconName: 'file', title: 'Docs', routeName: 'Docs' },
];

const mapStateToProps = function(state: any) {
  return {
    token: state.user.token,
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
              type='feather'
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
      <View style={styles.listItem}>
        <View style={[styles.separator, {top: 0}]}/>
          <TouchableOpacity
            onPress={isLoggedIn() ? onLogout : onLogin}>
            <View style={styles.wrapper}>
              <Icon
                name={isLoggedIn() ? 'log-out' : 'log-in'}
                type='feather'
                color={colors.TEXT_PRIMARY}
                containerStyle={styles.iconContainer} />
              <Text style={styles.title}>{isLoggedIn() ? 'Logout' : 'Login'}</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const onProfile = () => {
    requestAnimationFrame(() => navigation.navigate('Profile'));
  }

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={{height: '100%'}}>
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
    paddingHorizontal: responsive(15)
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
    ...typos.BODY,
    color: colors.TEXT_PRIMARY
  },
  iconContainer: {
    width: responsive(40)
  },
});

const SideMenuConnected = connect(mapStateToProps, mapDispatchToProps)(SideMenu);
export { SideMenuConnected as SideMenu };
