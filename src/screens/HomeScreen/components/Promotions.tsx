import * as React from 'react';

// UI
import { FlatList, SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { typos, colors } from '@styles';
import { SkypeIndicator } from 'react-native-indicators';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Card } from 'react-native-elements';


interface IOwnProps {}

type IProps = IOwnProps &
    IAdvertisement.StateToProps &
    IAdvertisement.DispatchFromProps &
    NavigationInjectedProps;;

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

    openWebView = (url: any)  => {
       if (url) {
         this.props.navigation.navigate('WebViewScreen', { url });
       }
    }

    _renderItem(item: any) {
      return <TouchableOpacity onPress={() => this.openWebView(item.url)}>
        <Card containerStyle={styles.itemContainer}>
          { item.image ? <Image style={[styles.image]} source={{ uri: item.image }} /> :
            <Image style={[styles.image]} source={ require('@assets/images/placeholder.png') } resizeMode="stretch"/> }
        </Card>
      </TouchableOpacity>
    }

    public render() {
        return (
            <SafeAreaView>
                <View style={{paddingLeft: 20}}>
                    { this.state.loading && <SkypeIndicator color={colors.PRIMARY} /> }
                    <FlatList
                        data={this.props.promotions || []}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
      width: 180,
      height: 100,
      borderRadius: 10,
      backgroundColor: colors.LIGHTER_GRAY,
      margin: 0,
      padding: 0,
      marginRight: 10,
      marginBottom: 20,
      borderWidth: 0
    },
    text: {
      color: colors.WHITE,
      ...typos.PRIMARY
    },
    textBold: {
      ...typos.PRIMARY_BOLD
    },
    image: {
      width: 180,
      height: 100,
      borderRadius: 10,
    }
});

const PromotionsWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(Promotions));
export { PromotionsWrapper as Promotions }
