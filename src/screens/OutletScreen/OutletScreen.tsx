import * as React from 'react';

// UI
import {FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';
import { OutletCard } from './components/OutletCard';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

interface IOwnProps {}
type IProps = IOwnProps &
    NavigationInjectedProps &
    IOutlet.StateToProps &
    IOutlet.DispatchFromProps;

interface IState {
    selectedTab: string,
    outletList: Array<IOutlet.IOutletData>,
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

class OutletScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedTab: '',
            outletList: [],
            channels: [],
        };

        this.fetchOutlets();
    }

    async fetchOutlets() {
        await this.props.fetchOutlets();
        this.setState({
            channels: (this.props.channels ? this.props.channels : []),
            selectedTab: (this.props.channels ? this.props.channels[0] : ''),
            outletList: this.filterOutlets(this.props.channels ? this.props.channels[0] : ''),
        });
    }

    filterOutlets(channel: string) {
        let outlets: Array<IOutlet.IOutletData>;
        if (!this.props.outlets) {
            outlets = [];
        } else if (channel == '') {
            outlets = this.props.outlets;
        } else {
            outlets = this.props.outlets.filter((outlet) => {
                return outlet.channelName == channel;
            });
        }
        return outlets;
    }

    onItemPress = (outlet: IOutlet.IOutletData) => {
        this.props.navigation.navigate('ShopperScreen', {
            outlet
        });
    }

    onActionButtonPress = (buttonText: string) => {
        this.setState({
            selectedTab: buttonText,
            outletList: this.filterOutlets(buttonText)
        });
    }

    public render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <HeaderBar title={'Outlets'}/>
                    <View style={styles.mainContainer}>
                        <View style={{marginTop: 10}}>
                            <FlatList
                                data={this.state.channels}
                                renderItem={({item}) => <ActionButton title={item} inverted={this.state.selectedTab == item}
                                onPress={this.onActionButtonPress}/>}
                                extraData={this.state.selectedTab}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}/>
                                { this.state.outletList.length ?
                                    <View style={styles.itemCountContainer}>
                                        <Text style={styles.itemCount}>{this.state.outletList.length} </Text>
                                        <Text> ITEM</Text>
                                    </View> : null }
                        </View>
                        <View style={{marginTop: 10, flex: 1}}>
                            <FlatList
                                data={this.state.outletList}
                                keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
                                renderItem={({item}) => <OutletCard outlet={item} onItemPress={this.onItemPress}/>}
                                showsVerticalScrollIndicator={false}/>
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
        paddingHorizontal: '2%',
        marginTop: Platform.OS === "android" ? 0 : -5,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },
    mainContainer: {
        paddingHorizontal: '4%',
        flex: 1
    },
    itemCountContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    itemCount: {
        fontWeight: 'bold',
        paddingLeft: 5
    },
});

const OutletScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(OutletScreen);
export { OutletScreenWrapper as OutletScreen }