import * as React from 'react';

// UI
import { FlatList, SafeAreaView, View, Text, StyleSheet, Image, Platform } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { typos, colors } from '@styles';
import { SkypeIndicator } from 'react-native-indicators';

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
        promotions: state.advertisement.promotions,
    }
}

class Promotions extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
        };

        this.fetchPromotions();
    }

    async fetchPromotions() {
        await this.props.fetchPromotions();
        this.setState({
            loading: false
        })
    }

    _renderItem(item: any) {
      const backgroundColors = [colors.DARK_RED, colors.DARK_GREEN];
      const backgroundColor = backgroundColors[Math.ceil(Math.random() * 1234) % 2];
      return <View style={[styles.itemContainer, {backgroundColor: backgroundColor}]}>
        {
          item.image && false ? <Image style={[styles.image]} source={{ uri: item.image }} /> :
          <Image style={[styles.image]} source={ require('@assets/images/placeholder.png') } resizeMode="stretch"/>
        }
        <View style={{marginHorizontal: 10, flex: 1}}>
          <Text style={[styles.text, {paddingBottom: 4}]}>{item.title || "Dummy Title"}</Text>
          <Text style={[styles.text, styles.textBold]}>EARN 25% CASHBACK ON COSMETICS</Text>
        </View>
      </View>
    }

    public render() {
        return (
            <SafeAreaView style={{paddingLeft: 5, paddingTop: 10}}>
                <View>
                    { this.state.loading && <SkypeIndicator color={colors.PRIMARY} /> }
                    <FlatList
                        data={this.props.promotions || []}
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
      width: 250,
      height: 100,
      borderRadius: 10,
      backgroundColor: colors.LIGHTER_GRAY,
      marginRight: 10,
      marginTop: 5,
      marginBottom: 20,
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      color: colors.WHITE,
      ...typos.PRIMARY
    },
    textBold: {
      ...typos.PRIMARY_BOLD
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 10,
    }
});

const PromotionsWrapper = connect(mapStateToProps, mapDispatchToProps)(Promotions);
export { PromotionsWrapper as Promotions }
