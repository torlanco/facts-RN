import * as React from 'react';

// ui
import { colors } from '@styles';
import { View, StyleSheet } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
interface IProps {}

interface State {}

class LoadingScreen extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.container}>
        <SkypeIndicator color={colors.PRIMARY} />
      </View>
    );
  }
}

export { LoadingScreen };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
});
