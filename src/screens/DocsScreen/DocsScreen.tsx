import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { typos } from '@styles';

// Component
import { HeaderBar } from '@components';
import { StatusBar, Platform } from "react-native";
import { DocsGridView } from './components/DocsGridView';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/doc';

import { NavigationInjectedProps, NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { IDoc } from '@interfaces/doc';

// props
interface ParamType {}
interface StateParams extends NavigationState {
  params: ParamType;
}
interface IOwnProps {
  navigation: NavigationScreenProp<StateParams>;
  token: string;
}
type IProps = IOwnProps &
  NavigationInjectedProps & 
  IDoc.DispatchFromProps;

// state
interface IState {
  docsList: Array<IDoc.IDocData>,
}

const mapStateToProps = function(state: any){
  return {
    token: state.user.token,
  }
};

class DocsScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      docsList: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  fetchReceipts = async () => {
    const docs = await this.props.fetchReceipts(this.props.token);
    if (docs && docs instanceof Array) {
      this.setState({
        docsList: docs
      });  
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onItemPress = (image: string) => {
    this.props.navigation.navigate('FullImageScreen', { image });
  }

  openCustomCameraScreen = () => {
    this.props.navigation.navigate('CustomCameraScreen');
  }

  public render() {
    return (
      <SafeAreaView style={{flex: 1}}>
          <NavigationEvents onDidFocus={this.fetchReceipts}/>
          <View style={styles.header}>
            <HeaderBar title={'Docs'} rightIcon="upload" onRightIconClick={this.openCustomCameraScreen}></HeaderBar>
          </View>
          <View style={styles.container}>
          {
            this.state.docsList.length ? 
            <DocsGridView docsList={this.state.docsList} onItemPress={this.onItemPress}></DocsGridView> 
            : <View style={[styles.container, styles.textContainer]}>
              <Text style={styles.text}>No Documents at this moment. Click upload to add one!.</Text>
            </View>
          }
          </View>
          {this.props.loading && <LoadingScreen />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "android" ? 0 : -5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typos.PRIMARY,
    textAlign: 'center',
    paddingHorizontal: 70
  },
});

const DocsScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(DocsScreen);
export { DocsScreenWrapper as DocsScreen }