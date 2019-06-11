import * as React from 'react';

// UI
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';
import { OutletCard } from './components/OutletCard';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps } from 'react-navigation';
interface IOwnProps {
}

type IProps = IOwnProps &
    NavigationInjectedProps;

interface IState {
    selectedTab: string,
    outletList: Array<IOutlet.IOutletData>
}

class OutletScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedTab: 'CLUB SM',
            outletList: this.loadData(),
        };
    }

    private loadData(): Array<IOutlet.IOutletData> {
        const outletList: Array<IOutlet.IOutletData> = [{
            imageUrl: '',
            name: 'Econo',
            category: 'Supermarket',
            date: '24 May',
            shoppers: ['Shopper1', 'shopper2'],
            isNew: true
        }, {
            imageUrl: '',
            name: 'Sample',
            category: 'Flea Market',
            date: '25 May',
            shoppers: ['shopper1', 'shopper2', 'shopper3', 'shopper4'],
            isNew: false
        }, {
            imageUrl: '',
            name: 'Econo',
            category: 'Supermarket',
            date: '24 May',
            shoppers: ['Shopper1', 'shopper2'],
            isNew: true
        }, {
            imageUrl: '',
            name: 'Sample',
            category: 'Flea Market',
            date: '25 May',
            shoppers: ['shopper1', 'shopper2', 'shopper3', 'shopper4'],
            isNew: false
        }, {
            imageUrl: '',
            name: 'Econo',
            category: 'Supermarket',
            date: '24 May',
            shoppers: ['Shopper1', 'shopper2'],
            isNew: true
        }, {
            imageUrl: '',
            name: 'Sample',
            category: 'Flea Market',
            date: '25 May',
            shoppers: ['shopper1', 'shopper2', 'shopper3', 'shopper4'],
            isNew: false
        }, {
            imageUrl: '',
            name: 'Econo',
            category: 'Supermarket',
            date: '24 May',
            shoppers: ['Shopper1', 'shopper2'],
            isNew: true
        }, {
            imageUrl: '',
            name: 'Sample',
            category: 'Flea Market',
            date: '25 May',
            shoppers: ['shopper1', 'shopper2', 'shopper3', 'shopper4'],
            isNew: false
        }];

        return outletList;
    }

    onItemPress = () => {
        this.props.navigation.navigate('ShopperScreen');
    }

    onActionButtonPress = (buttonText: string) => {
        console.log(buttonText)
        this.setState({
            selectedTab: buttonText
        });
    }

    public render() {
        return (
            <SafeAreaView style={{flex: 1, marginTop: 50,}}>
                <HeaderBar title={'Outlets'}/>
                <View style={styles.container}>
                    <View style={styles.headerButtonBar}>
                        <ActionButton title='CLUB' inverted={this.state.selectedTab == 'CLUB'} onPress={this.onActionButtonPress}/>
                        <ActionButton title='CLUB SM' inverted={this.state.selectedTab == 'CLUB SM'} onPress={this.onActionButtonPress}/>
                        <ActionButton title='OTHER' inverted={this.state.selectedTab == 'OTHER'} onPress={this.onActionButtonPress}/>
                    </View>
                    <View style={styles.itemCountContainer}>
                        <Text style={styles.itemCount}>385 </Text>
                        <Text> ITEM</Text>
                    </View>
                    <FlatList
                        data={this.state.outletList}
                        keyExtractor={( item, index ) => index.toString()}
                        renderItem={({ item }) => <OutletCard data={item} onItemPress={this.onItemPress}/>} 
                        showsVerticalScrollIndicator={false}/>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    headerButtonBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        paddingHorizontal: '4%',
        paddingTop: 10
    },
    itemCountContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    itemCount: {
        fontWeight: 'bold',
    },
});

export { OutletScreen };