import * as React from 'react';

// UI
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';
import { OutletCard } from './components/OutletCard';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps, ScrollView, withNavigation } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { typos, colors } from '@styles';
import { SkypeIndicator } from 'react-native-indicators';

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
    loading: boolean
}

const mapStateToProps = function (state: any) {
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
            sectionTwoOutlet: [],
            loading: true
        };

        this.fetchOutlets();
    }

    async fetchOutlets() {
        await this.props.fetchOutlets();
        this.setState({
            channels: (this.props.channels ? this.props.channels : []),
            selectedTab: (this.props.channels ? this.props.channels[0] : ''),
            loading: false,
        });
        this.filterOutlets(this.props.channels ? this.props.channels[0] : '')
    }

    filterOutlets(channel: string) {
        let outletList: Array<IOutlet.IOutletData>;
        if (!this.props.outlets) {
            outletList = [];
        } else if (channel == '') {
            outletList = this.props.outlets;
        } else {
            outletList = this.props.outlets.filter((outlet) => {
                return outlet.channelName == channel;
            });
        }
        if (this.props.onlyOutlets) {
            outletList = this.props.outlets ? 
                (this.props.outlets.length > 10 ? this.props.outlets.slice(0, 10) : this.props.outlets) : [];
        }
        let sectionOneOutlet: IOutlet.IOutletData[] = outletList.filter((item, index) => {
            if (!(index & 1)) {
                return item;
            }
        })

        let sectionTwoOutlet: IOutlet.IOutletData[] = outletList.filter((item, index) => {
            if (index & 1) {
                return item;
            }
        })
        this.setState({
            outletList,
            sectionOneOutlet,
            sectionTwoOutlet
        })
    }

    onItemPress = (outlet: IOutlet.IOutletData) => {
        this.props.navigation.navigate('ShopperScreen', {
            outlet
        });
    }

    onActionButtonPress = (buttonText: string) => {
        this.setState({
            selectedTab: buttonText,
        });
        this.filterOutlets(buttonText);
    }

    public render() {
        const { onlyOutlets, loading } = this.props;
        const containerStyle: any = {};
        if (onlyOutlets) {
            containerStyle.marginTop = 0
            containerStyle.paddingTop = 0
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={[styles.container, containerStyle]}>
                    {!onlyOutlets && <HeaderBar title={'OUTLETS'} />}
                    { onlyOutlets && this.state.loading && <SkypeIndicator color={colors.PRIMARY} /> }
                    <View style={styles.mainContainer}>
                        {!onlyOutlets && <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <FlatList
                                data={this.state.channels}
                                renderItem={({ item }) => <ActionButton title={item} inverted={this.state.selectedTab == item}
                                    onPress={this.onActionButtonPress} />}
                                extraData={this.state.selectedTab}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} />
                            {this.state.outletList.length ?
                                <Text style={styles.itemCountContainer}>
                                    <Text style={styles.itemCount}>{this.state.outletList.length} </Text> ITEM
                                </Text> : null}
                        </View>}
                        <View style={styles.wrapper}>
                            <ScrollView contentContainerStyle={styles.row} showsVerticalScrollIndicator={false}>
                                <FlatList
                                    contentContainerStyle={styles.list}
                                    data={this.state.sectionOneOutlet}
                                    keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
                                    renderItem={({ item }) => <OutletCard outlet={item} onItemPress={this.onItemPress} />}
                                    enableEmptySections={true} />
                                <FlatList
                                    contentContainerStyle={styles.list}
                                    data={this.state.sectionTwoOutlet}
                                    keyExtractor={(item: IOutlet.IOutletData) => item.outlet}
                                    renderItem={({ item }) => <OutletCard outlet={item} onItemPress={this.onItemPress} />}
                                    enableEmptySections={true} />
                            </ScrollView>
                        </View>
                    </View>
                </View>
                {loading && !onlyOutlets && <LoadingScreen />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "android" ? 0 : -5,
        flex: 1,
        backgroundColor: colors.LIGHTEST_GRAY
    },
    mainContainer: {
        paddingHorizontal: '4%',
        flex: 1
    },
    itemCountContainer: {
        ...typos.PRIMARY_MEDIUM,
        color: colors.TEXT_PRIMARY,
        marginTop: 10,
        paddingLeft: 5
    },
    itemCount: {
        ...typos.TITLE,
        color: colors.TEXT_PRIMARY,
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
    }
});

const OutletScreenWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(OutletScreen));
export { OutletScreenWrapper as OutletScreen }