import * as React from 'react';

// UI
import { FlatList, SafeAreaView, View, Text, StyleSheet, Image, Platform } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { colors } from '@styles';
import { SkypeIndicator } from 'react-native-indicators';
import { Card } from 'react-native-elements';

interface IOwnProps {

}
type IProps = IOwnProps &
    IAdvertisement.StateToProps &
    IAdvertisement.DispatchFromProps;

interface IState {
    loading: boolean;
}

const mapStateToProps = function (state: any) {
    return {
        categories: state.advertisement.topCategories,
    }
}

class Categories extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
        };

        this.fetchCategories();
    }

    async fetchCategories() {
        await this.props.fetchTopCategories();
        this.setState({
            loading: false
        })
    }

    _renderItem(item: any) {
      return <Card containerStyle={styles.itemContainer}>
        {
          item.image ? <Image style={[styles.image]} source={{ uri: item.image }} /> :
          <Image style={[styles.image]} source={ require('@assets/images/placeholder.png') } resizeMode="stretch"/>
        }
        <Text style={styles.text}>{item.name}</Text>
      </Card>
    }

    public render() {
        return (
            <SafeAreaView style={{paddingLeft: 5, paddingTop: 10}}>
                <View>
                    { this.state.loading && <SkypeIndicator color={colors.PRIMARY} /> }
                    <FlatList
                        data={this.props.categories || []}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{paddingLeft: Platform.OS === "android" ? 15 : 20}}/>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 150,
        height: 100,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: colors.LIGHT_GRAY,
        marginLeft: 0,
        marginRight: 10,
        marginTop: 5,
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowColor: colors.LIGHT_BLUE,
        shadowRadius: 3,
        elevation: 3,
    },
    text: {
      position: "absolute",
      bottom: 10,
      left: 10,
      width: 80,
      zIndex: 3,
      elevation: 3,
      color: colors.WHITE,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    }
});

const CategoriesWrapper = connect(mapStateToProps, mapDispatchToProps)(Categories);
export { CategoriesWrapper as Categories }
