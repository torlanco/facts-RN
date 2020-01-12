import * as React from 'react';

// UI
import {FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ListView} from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { OutletScreen } from '../OutletScreen/OutletScreen';
import { typos } from '@styles';

interface IOwnProps {}
type IProps = IOwnProps &
    NavigationInjectedProps &
    IOutlet.StateToProps &
    IOutlet.DispatchFromProps;

interface IState {
    selectedTab: string,
    channels: string[],
}

const mapStateToProps = function(state: any){
    return {
        outlets: state.outlet.outlets,
        channels: state.outlet.channels,
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
            channels: [],
        };
    }
 
    public render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <HeaderBar title={'Home'}/>
                    <View style={styles.mainContainer}>
                        <View style={{marginTop: 10, marginBottom: 10}}>
                            <Text style={styles.highlight}>CATEGORIES</Text>
                            <FlatList
                                data={this.state.channels}
                                renderItem={({item}) => <ActionButton title={item} inverted={this.state.selectedTab == item}/>}
                                extraData={this.state.selectedTab}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}/>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.highlight}>OUTLETS</Text>
                            <OutletScreen onlyOutlets={true}/>
                        </View>
                    </View>
                </View>
                {this.props.loading && <LoadingScreen />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "android" ? 0 : -5,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },
    mainContainer: {
        flex: 1
    },
    wrapper: {
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
          ...typos.SUBHEADLINE,
          paddingHorizontal: 15
      }
});

const HomeScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export { HomeScreenWrapper as HomeScreen }