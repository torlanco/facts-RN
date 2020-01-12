import * as React from 'react';

// UI
import { FlatList, SafeAreaView } from 'react-native';

// Components
import { ActionButton } from '@components';

// Interfaces

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { IAdvertisement } from '@interfaces/advertisement';

interface IOwnProps {

}
type IProps = IOwnProps &
    IAdvertisement.StateToProps &
    IAdvertisement.DispatchFromProps;

interface IState {}

const mapStateToProps = function (state: any) {
    return {
        categories: state.advertisement.homeCategories,
        loading: state.outlet.loading ||
            state.shopper.loading ||
            state.advertisement.loading
    }
}

class Categories extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedTab: '',
            outletList: [],
            channels: [],
            sectionOneOutlet: [],
            sectionTwoOutlet: []
        };

        this.fetchCategories();
    }

    async fetchCategories() {
        const response = await this.props.fetchHomeCategories();
    }

    public render() {
        return (
            <SafeAreaView style={{paddingLeft: 5, paddingTop: 10}}>
                <FlatList
                    data={this.props.categories || []}
                    renderItem={({ item }) => <ActionButton title={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} />
            </SafeAreaView>
        )
    }
}

const CategoriesWrapper = connect(mapStateToProps, mapDispatchToProps)(Categories);
export { CategoriesWrapper as Categories }