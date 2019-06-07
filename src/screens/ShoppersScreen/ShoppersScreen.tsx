import * as React from 'react';

// UI
import { StyleSheet, SafeAreaView } from 'react-native';
import { typos } from '@styles';

// Component
import { HeaderBar } from '@components';

// Models

// props 
interface IOwnProps {}
type IProps = IOwnProps;

// state
interface IState {
}

class ShoppersScreen extends React.Component<IProps, IState> {
  _isMounted = false;

  constructor(props: IProps) {
    super(props);
    this.state = {};

  }
 
  public render() {
    return (
      <SafeAreaView style={styles.container}>
          <HeaderBar title={'Shoppers'}></HeaderBar>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    ...typos.TITLE,
    textAlign: 'center'
  }
});

export { ShoppersScreen };
