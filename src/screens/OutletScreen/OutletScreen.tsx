import * as React from 'react';

// UI
import {FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ListView} from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';
import { OutletCard } from './components/OutletCard';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps, ScrollView, NavigationScreenProp, NavigationState } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
  
interface IOwnProps {
    onlyOutlets?: boolean;
}
type IProps = IOwnProps &
    NavigationInjectedProps &
    IOutlet.StateToProps &
    IOutlet.DispatchFromProps;

interface IState {
    selectedTab: string,
    outletList: Array<IOutlet.IOutletData>,
    channels: string[],
    sectionOneOutlet: Array<IOutlet.IOutletData>,
    sectionTwoOutlet: Array<IOutlet.IOutletData>,
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
            sectionOneOutlet: [],
            sectionTwoOutlet: []
        };

        this.fetchOutlets();
    }

    async fetchOutlets() {
        await this.props.fetchOutlets();
        this.setState({
            channels: (this.props.channels ? this.props.channels : []),
            selectedTab: (this.props.channels ? this.props.channels[0] : ''),
        });
        this.filterOutlets(this.props.channels ? this.props.channels[0] : '')
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
        let sectionOneOutlet: IOutlet.IOutletData[] = outlets.filter((item, index) => {
            if (!(index & 1)) {
              return item;
            }
        })
        
        let sectionTwoOutlet: IOutlet.IOutletData[] =  outlets.filter((item, index) => {
            if (index & 1) {
              return item;
            }
        })
        this.setState({
            sectionOneOutlet,
            sectionTwoOutlet
        })

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
        const { onlyOutlets } = this.props;
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    { !onlyOutlets && <HeaderBar title={'Outlets'}/> }
                    <View style={styles.mainContainer}>
                        { !onlyOutlets && <View style={{marginTop: 10, marginBottom: 10}}>
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
                                </View> }
                        <View style={styles.wrapper}>
                            <ScrollView contentContainerStyle={styles.row} showsVerticalScrollIndicator={false}>
                                <FlatList
                                    contentContainerStyle={styles.list}
                                    data={this.state.sectionOneOutlet}
                                    keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
                                    renderItem={({item}) => <OutletCard outlet={item} onItemPress={this.onItemPress}/>}
                                    enableEmptySections={true}/>
                                <FlatList
                                    contentContainerStyle={styles.list}
                                    data={this.state.sectionTwoOutlet}
                                    keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
                                    renderItem={({item}) => <OutletCard outlet={item} onItemPress={this.onItemPress}/>}
                                    enableEmptySections={true}/>
                            </ScrollView>
                            {/* <FlatList
                                data={this.state.outletList}
                                keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
                                renderItem={({item}) => <OutletCard outlet={item} onItemPress={this.onItemPress}/>}
                                showsVerticalScrollIndicator={false}/> */}
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
      }
});

const OutletScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(OutletScreen);
export { OutletScreenWrapper as OutletScreen }