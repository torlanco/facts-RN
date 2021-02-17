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
import { Text } from 'react-native';


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

    emptyView () {
      return <View></View>;
    }

    renderPromotionList () {
      return (
        <View>
              <View style={[styles.componentWrapper, {marginTop: 20}]}>
                <View style={styles.row}>
                    <View style={[styles.flex, {marginBottom: 20}]}>
                        <Text style={styles.highlight}>PROMOTIONS</Text>
                        <Text style={styles.note}>Find what is popular among promotions</Text>
                    </View>
                </View>
              </View>
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
        </View>
      );
    }

    public render() {
        return (
          this.props.promotions?.length ? this.renderPromotionList() : this.emptyView()          
        );
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
    },
    componentWrapper: {
      paddingHorizontal: 20,
      marginTop: 10,
  },
  flex: {
      flex: 1
  },
  row: {
      flexDirection: 'row',
  },
  list: {
      flex: 1,
      flexDirection: 'column',
      paddingVertical: 10,
  },
  highlight: {
      ...typos.LARGE_TITLE,
      margin: 0,
  },
  note: {
      ...typos.CAPTION,
  },
});

const PromotionsWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(Promotions));
export { PromotionsWrapper as Promotions }
