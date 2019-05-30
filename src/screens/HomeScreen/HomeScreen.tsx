import * as React from 'react';

// UI
import { View, StyleSheet, Text } from 'react-native';
import { colors, typos } from '@styles';

// props 
interface IOwnProps {}
type IProps = IOwnProps;

// state
interface State {

}

class HomeScreen extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Facts</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.SMOKE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typos.TITLE,
    textAlign: 'center'
  }
});

export { HomeScreen };
