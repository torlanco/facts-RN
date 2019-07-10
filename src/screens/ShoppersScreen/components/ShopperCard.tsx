import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { colors, typos, responsive } from '@styles';
import { Card } from 'react-native-elements';
import { IShopper } from '@interfaces/shopper';

// Utils
import { formatDate } from '@utils';
import FullWidthImage from 'react-native-fullwidth-image';

interface IOwnProps {
  shopper: IShopper.IShopperData,
  onItemPress?: Function
}

type IProps = IOwnProps;

interface IState {
    shopperImage: any,
}
class ShopperCard extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            shopperImage: require('@assets/images/placeholder.png')
        };
    }

    componentDidMount() {
        if (this.props.shopper.pathThumb) {
            Image.getSize(this.props.shopper.pathThumb, (width: number, height: number) => {
                this.setState({ 
                    shopperImage: this.props.shopper.pathThumb
                });
            }, err => {});
        }
    }
    
    onItemPress = () => {
        if (this.props.onItemPress) 
            this.props.onItemPress(this.props.shopper);
    }

    public render() {
        const { id, outlet, startDate, endDate, count } = this.props.shopper;
        const width = Dimensions.get('window').width * 0.87;

        return (
            <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
                <View style={styles.mainContainer}>
                    <Card containerStyle={styles.outletImage}>
                    { this.state.shopperImage == this.props.shopper.pathThumb ?
                        <FullWidthImage style={ styles.image } source={{ uri: this.state.shopperImage }}/> : 
                        <Image style={[styles.image, { height: 200 }]} source={ this.state.shopperImage } resizeMode="stretch"/> }  
                    </Card>
                    <View style={styles.mainContent}>
                        <Card containerStyle={styles.cardContainer}>
                            <Text style={[styles.highlight, styles.padding]}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
                            <Text style={[styles.text, styles.padding]}><Text style={styles.highlight}>{count} </Text> FEATURES</Text>
                        </Card>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: '5%',
        paddingBottom: 20,
        width: '100%'
    },
    outletImage: {
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
        margin: 0,
        width: '100%',
        minHeight: 100,
    },
    image: {
        borderRadius: 10,
        width: '100%',
    },
    mainContent: {
        paddingHorizontal: '5%',
        marginTop: -50,
    },
    cardContainer: {
        padding: 20,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: colors.LIGHT_BLUE,
        backgroundColor: colors.WHITE,
        elevation: 3,
        flexDirection: 'column',
        borderRadius: responsive(12),
    },
    padding: {
        padding: 2,
    },
    highlight: {
        ...typos.HEADLINE,
        color: colors.TEXT_PRIMARY
    },
    text: {
        ...typos.SECONDARY,
        color: colors.TEXT_SECONDARY,
    },
});

export { ShopperCard };