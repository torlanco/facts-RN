import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { colors } from '@styles';

// Component
import { StatusBar, Platform } from "react-native";

// Props Action
import { NavigationInjectedProps, NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import FullWidthImage from 'react-native-fullwidth-image';
import { Icon } from 'react-native-elements';

// props
interface ParamType {
  image: string
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
interface IState {}

class FullImageScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  close = () => {
    this.props.navigation.goBack();
  }

  public render() {
    const { image } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.header}>
            <Icon
              name='x'
              type='feather'
              color={colors.WHITE}
              containerStyle={styles.icon}
              onPress={this.close}/>
          </View>
          <ScrollView contentContainerStyle={styles.container}>
            <FullWidthImage style={styles.image} source={{ uri: image }} />
          </ScrollView>
          {this.props.loading && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.BLACK,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    padding: 15,
  },
});

export { FullImageScreen }