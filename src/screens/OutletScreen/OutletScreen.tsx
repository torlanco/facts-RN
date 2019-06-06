import * as React from 'react';
import { ActionButton, HeaderBar } from '@components';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { OutletCard } from './components/OutletCard';

// Interfaces
interface IOwnProps {
}

type IProps = IOwnProps &
    // ILocation.StateToProps &
    // ILocation.DispatchFromProps &
    NavigationInjectedProps;

interface IState {
}

class OutletScreen extends React.Component<IState> {
    static navigationOptions = {
        title: 'Outlets'
    };

    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const outlets = [{
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
        return (
            <SafeAreaView style={{flex: 1}}>
                <HeaderBar title={'Outlets'}/>
                <View style={styles.container}>
                    <View style={styles.headerButtonBar}>
                        <ActionButton title='CLUB'/>
                        <ActionButton title='CLUB SM' inverted={true}/>
                        <ActionButton title='OTHER'/>
                    </View>
                    <View style={styles.itemCountContainer}>
                        <Text style={styles.itemCount}>385 </Text>
                        <Text> ITEM</Text>
                    </View>
                    {
                        outlets.map((outlet, key) => {
                            return (
                                <OutletCard category={outlet.category}
                                            isNew={outlet.isNew}
                                            name={outlet.name}
                                            date={outlet.date}
                                            shoppers={outlet.shoppers}
                                            key={key}>
                                </OutletCard>
                            );
                        })
                    }
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
        paddingHorizontal: '4%'
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