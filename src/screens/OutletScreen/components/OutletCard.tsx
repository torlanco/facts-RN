import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { colors, typos, responsive } from '@styles';

import { IOutlet } from '@interfaces/outlet';
import { Card } from 'react-native-elements';

// Utils
import { formatDate } from '@utils';
import { ImageView } from '@components';
import FullWidthImage from 'react-native-fullwidth-image';
interface IOwnProps {
    outlet: IOutlet.IOutletData,
    onItemPress?: Function
};

type IProps = IOwnProps;

interface IState {
    outletImage: string;
}

class OutletCard extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            outletImage: require('@assets/images/placeholder.png')
        };
    }

    componentDidMount() {
        if (this.props.outlet.outletImage) {
            Image.getSize(this.props.outlet.outletImage, (width: number, height: number) => {
                this.setState({
                    outletImage: this.props.outlet.outletImage
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
                    <Card containerStyle={styles.outletImage}>
                        { this.state.outletImage == this.props.outlet.outletImage ?
                            <FullWidthImage style={ styles.image } source={{ uri: this.state.outletImage }}/> :
                            <Image style={[styles.image, { height: 50 }]} source={ this.state.outletImage } resizeMode="stretch"/> }
                    </Card>
                    <View style={styles.mainContent}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.name]}>{outlet}</Text>
                        </View>
                        <Text style={[styles.date]}>{formatDate(earliestStartDate)} - {formatDate(latestEndDate)}</Text>
                        <View style={styles.flexDiv}>
                            <Text style={[styles.shoppers]}>
                                <Text style={styles.shoppersCount}>{shopperCount}</Text> shoppers
                            </Text>
                        </View>
                    </View>
                    <View style={styles.isNewContainer}>
                        <Text style={[styles.isNew]}>New</Text>
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
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 1,
        shadowRadius: 3,
        backgroundColor: colors.LIGHT_GRAY,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    outletImage: {
        height: 50,
        width: 50,
        borderRadius: 5,
        shadowColor: colors.WHITE,
        elevation: 0,
        padding: 0,
        margin: 0,
        marginRight: 5,
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        borderRadius: 5,
    },
    mainContent: {
        flex: 1,
        flexDirection: 'column'
    },
    padding: {
        padding: 2,
    },
    name: {
        ...typos.PRIMARY,
        color: colors.TEXT_PRIMARY,
        flex: 1,
        flexWrap: 'wrap'
    },
    date: {
        ...typos.CAPTION,
        color: colors.TEXT_SECONDARY,
    },
    flexDiv: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    shoppers: {
        ...typos.CAPTION,
        color: colors.TEXT_PRIMARY
    },
    shoppersCount: {
        ...typos.PRIMARY,
        color: colors.TEXT_PRIMARY
    },
    isNewContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: colors.PRIMARY,
      borderRadius: 10,
      padding: 5,
      paddingHorizontal: 10,
    },
    isNew: {
        ...typos.SMALL_BOLD,
        color: colors.TEXT_PRIMARY,
    },
});

export { OutletCard };
