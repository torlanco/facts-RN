import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import { IAdvertisement } from '@interfaces/advertisement';
import { DocGridItem } from './DocGridItem';
import { IDoc } from '@interfaces/doc';

interface IOwnProps {
  docsList: Array<IDoc.IDocData>,
  onItemPress?: Function
}
type IProps = IOwnProps;

interface IState {}

class DocsGridView extends React.Component<IProps, IState> {

  onItemPress = (image: string) => {
    if (this.props.onItemPress)
      this.props.onItemPress(image);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <FlatList style={styles.list}
            data={this.props.docsList.filter((item, index) => !(index & 1))}
            renderItem={(item) => <DocGridItem doc={item} onItemPress={this.onItemPress}/>}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}/>
          <FlatList style={styles.list}
            data={this.props.docsList.filter((item, index) => (index & 1))}
            renderItem={(item) => <DocGridItem doc={item} onItemPress={this.onItemPress}/>}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}/>  
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  }
});

export { DocsGridView };
