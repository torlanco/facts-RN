import * as React from 'react';

// UI
import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Components
import { HeaderBar } from '@components';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { OutletScreen } from '../OutletScreen/OutletScreen';
import { typos, colors } from '@styles';
import { Categories } from './components/Categories';
import { IAdvertisement } from '@interfaces/advertisement';
import { PopularSpecials } from './components/PopularSpecials';

interface IOwnProps {}
type IProps = IOwnProps &
    NavigationInjectedProps &
    IOutlet.StateToProps &
    IOutlet.DispatchFromProps;

interface IState {
    selectedTab: string,
}

const mapStateToProps = function(state: any){
    return {
        outlets: state.outlet.outlets,
        loading: state.outlet.loading ||
            state.shopper.loading ||
            state.advertisement.loading
    }
}

class HomeScreen extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedTab: '',
        };
    }

    onPopularSpecialsItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
        this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });
    }

    redirectToOutletScreen = () => {
        this.props.navigation.navigate('OutletScreen');
    }

    public render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHTEST_GRAY}}>
                <View style={styles.container}>
                    <HeaderBar title={'HOME'}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            {/* OUTLETS */}
                            <View style={[styles.componentWrapper]}>
                                <View style={styles.row}>
                                    <View style={[styles.flex, {marginBottom: 20}]}>
                                        <Text style={styles.highlight}>OUTLETS</Text>
                                        <Text style={styles.note}>Find your outlets containing shoppers</Text>
                                    </View>
                                    {   this.props.outlets && this.props.outlets.length > 4 &&
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => {this.redirectToOutletScreen()}}>
                                            <View style={styles.seeAllContainer}>
                                              <Text style={styles.seeall}>SEE ALL</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ flex: 1 }}>
                                <OutletScreen onlyOutlets={true}/>
                            </View>

                            {/* POPULAR SPECIALS */}
                            <View style={[styles.componentWrapper, {marginTop: 30}]}>
                                <View style={styles.row}>
                                    <View style={styles.flex}>
                                        <Text style={styles.highlight}>POPULAR SPECIALS</Text>
                                        <Text style={styles.note}>Find what is popular among shoppers</Text>
                                    </View>
                                </View>
                            </View>
                            <PopularSpecials/>

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "android" ? 0 : -5,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    mainContainer: {
        flex: 1
    },
    componentWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
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
    seeAllContainer: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      backgroundColor: colors.PRIMARY,
      borderRadius: 15,
      marginBottom: 0,
    },
    seeall: {
        ...typos.SMALL_BOLD,
    },
    flex: {
        flex: 1
    }
});

const HomeScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export { HomeScreenWrapper as HomeScreen }