import * as React from 'react';

// UI
import { FlatList, SafeAreaView, View } from 'react-native';

// Components
import { ActionButton } from '@components';

// Interfaces

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/advertisement';
import { IAdvertisement } from '@interfaces/advertisement';
import { colors } from '@styles';
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
        categories: state.advertisement.homeCategories,
    }
}

class Categories extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
        };

        this.fetchCategories();
    }

    async fetchCategories() {
        await this.props.fetchHomeCategories();
        this.setState({
            loading: false
        })
    }

    public render() {
        return (
            <SafeAreaView style={{paddingLeft: 5, paddingTop: 10}}>
                <View>
                    { this.state.loading && <SkypeIndicator color={colors.PRIMARY} /> }
                    <FlatList
                        data={this.props.categories || []}
                        renderItem={({ item }) => <ActionButton title={item}/>}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} />
                </View>
            </SafeAreaView>
        )
    }
}

const CategoriesWrapper = connect(mapStateToProps, mapDispatchToProps)(Categories);
export { CategoriesWrapper as Categories }