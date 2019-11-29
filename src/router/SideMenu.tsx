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
  
  const onLogout = async () => {
    navigation.closeDrawer();
    const logout = await props.logout();
    if (logout) {
      requestAnimationFrame(() =>
        navigation.navigate('LoginScreen')
      );
    }
  }
  const renderLogout = () => {
    return (
      <View style={styles.listItem}>
        <View style={[styles.separator, {top: 0}]}/>
        <TouchableOpacity
          onPress={onLogout}>
          <View style={styles.wrapper}>
            <Icon
              name='power'
              type='feather'
              color={colors.TEXT_PRIMARY}
              containerStyle={styles.iconContainer} />
            <Text style={styles.title}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={{height: '100%'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle= {{flex: 1}}/>
        { isLoggedIn() && renderLogout() }  
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
