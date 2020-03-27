import * as React from 'react';

// UI
import {SafeAreaView, StyleSheet, View} from 'react-native';

// Interfaces
import { IAdvertisement } from '@interfaces/advertisement';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { AdvertisementGridView } from '../../AdvertisementScreen/components/AdvertisementGridView';
import { SkypeIndicator } from 'react-native-indicators';
import { colors } from '@styles';

interface IOwnProps {}
type IProps = IOwnProps &
    NavigationInjectedProps &
    IAdvertisement.StateToProps &
    IAdvertisement.DispatchFromProps;

interface IState {
    loading: boolean;
}

const mapStateToProps = function(state: any){
    return {
        trendingFeatures: state.advertisement.trendingFeatures,
        loading: state.outlet.loading ||
            state.shopper.loading ||
            state.advertisement.loading
    }
}

class PopularSpecials extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
        };
        this.fetchPopularSpecials();
    }

    async fetchPopularSpecials() {
        await this.props.fetchTrendingFeatures();
        this.setState({
            loading: false
        });
    }

    onPopularSpecialsItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
        this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });
    }

    public render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View>
                    { this.state.loading && <SkypeIndicator color={colors.PRIMARY} /> }
                    {
                        this.props.trendingFeatures && this.props.trendingFeatures.length > 0 && !this.state.loading &&
                        <AdvertisementGridView advertisementList={this.props.trendingFeatures} onItemPress={this.onPopularSpecialsItemPress}/>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
});

const PopularSpecialsWrapper = withNavigation(connect(mapStateToProps, mapDispatchToProps)(PopularSpecials));
export { PopularSpecialsWrapper as PopularSpecials }
