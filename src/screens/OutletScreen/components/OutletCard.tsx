import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { colors, typos, responsive } from '@styles';

import { IOutlet } from '@interfaces/outlet';
import { Card } from 'react-native-elements';

// Utils
import { formatDate } from '@utils';
import FullWidthImage from 'react-native-fullwidth-image';
interface IOwnProps {
    outlet: IOutlet.IOutletData,
    onItemPress?: Function
};

type IProps = IOwnProps;

interface IState {
    outletImage: any,
}

class OutletCard extends React.Component<IProps, IState> {
   
    constructor(props: IProps) {
        super(props);
        this.state = {
            outletImage: require('@assets/images/placeholder.png'),
        };
    }

    componentDidMount() {
        if (this.props.outlet.outletImage) {
            Image.getSize(this.props.outlet.outletImage, (width: number, height: number) => {
                this.setState({ 
                    outletImage: {uri: this.props.outlet.outletImage},
                });
            }, err => {});
        }
    }

    onItemPress = () => {
        if (this.props.onItemPress)
            this.props.onItemPress(this.props.outlet);
    };

    public render() {
        const { outlet, shopperCount, channelName, tag, earliestStartDate, latestEndDate } = this.props.outlet;
        
        return (
            <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
                <View style={styles.mainContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.outletImageWrapper}>
                            <Card containerStyle={styles.outletImage}>
                            { this.state.outletImage == this.props.outlet.outletImage ?
                                <FullWidthImage style={ styles.image } source={{ uri: this.state.outletImage }}/> : 
                                <Image style={[styles.image, { height: 100 }]} source={ this.state.outletImage } resizeMode="stretch"/> }
                            </Card>
                        </View>
                        <View style={styles.mainContent}>
                            <Text style={[styles.type, styles.padding]}>{channelName}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.name, styles.padding]}>{outlet}</Text>
                            </View>
                            <Text style={[styles.date, styles.padding]}>Latest: {formatDate(earliestStartDate)}</Text>
                            <View style={styles.flexDiv}>
                                <Text style={[styles.shoppers, styles.padding]}>
                                    <Text style={styles.shoppersCount}>{shopperCount}</Text> SHOPPERS
                                </Text>
                                <Text style={[styles.isNew, styles.padding]}>New</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    cardContainer: {
        borderRadius: responsive(24),
        marginTop: responsive(15),
        marginBottom: responsive(15),
        marginLeft: '10%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: colors.LIGHT_BLUE,
        elevation: 3,
        shadowRadius: 10,
        backgroundColor: colors.WHITE,
    },
    outletImageWrapper: {
        width: '50%',
        marginLeft: '-22.5%',
        marginRight: '10%',
    },
    outletImage: {
        maxHeight: 100,
        borderRadius: 10,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: colors.LIGHT_BLUE,
        elevation: 3,
        shadowRadius: 10,
        padding: 0,
        margin: 0
    },
    image: {
        borderRadius: 10,
        width: '100%',
        maxHeight: 100
    },
    mainContent: {
      flexDirection: 'column'
    },
    padding: {
        padding: 2,
    },
    type: {
        ...typos.SECONDARY,
        color: colors.TEXT_SECONDARY,
    },
    name: {
        ...typos.HEADLINE,
        color: colors.TEXT_PRIMARY,
        flex: 1,
        flexWrap: 'wrap',
    },
    date: {
        ...typos.SECONDARY,
        color: colors.TEXT_SECONDARY,
        marginTop: 30,
    },
    flexDiv: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    shoppers: {
        ...typos.PRIMARY_BOLD,
        color: colors.TEXT_SECONDARY
    },
    shoppersCount: {
        flexDirection: 'row',
        color: colors.BLACK
    },
    isNew: {
        paddingLeft: responsive(20),
        ...typos.FOOTNOTE,
        textTransform: 'uppercase',
        color: colors.LIGHT_ORANGE
    },
});

export { OutletCard };
