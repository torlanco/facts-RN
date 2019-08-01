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
import { DrawerItemsProps } from 'react-navigation';
import { Icon } from 'react-native-elements';
interface IOwnProps {}
type IProps = IOwnProps & DrawerItemsProps;

const data = [
  { iconName: 'book', title: 'Outlet', routeName: 'Outlet' },
  { iconName: 'briefcase', title: 'Work', routeName: 'Work' },
];

const SideMenu: React.SFC<IProps> = (props: IProps) => {
  const { navigation } = props;
  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            requestAnimationFrame(() =>
              navigation.navigate(`${item.routeName}`)
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
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
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

const SideMenuConnected = connect(null, null)(SideMenu);
export { SideMenuConnected as SideMenu };
