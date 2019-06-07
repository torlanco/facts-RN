import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { colors, typos, responsive } from '@styles';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';
import { Card } from 'react-native-elements';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData
}

type IProps = IOwnProps;

const AdvertisementListItem: React.SFC<IProps> = (props: IProps) => {
    const imageSource = require('@assets/images/placeholder.png');
    return (
        <View style={styles.mainContainer}>
            <View style={styles.cardContainer}>
                <View style={styles.outletImageWrapper}>
                    <Card containerStyle={styles.outletImage}>
                        {props.advertisement.itemUrl ? <FullWidthImage style={ styles.image } source={{ uri: props.advertisement.itemUrl }} /> 
                            : <FullWidthImage style={ styles.image } source={imageSource} /> }
                    </Card>
                </View>
                <View style={styles.mainContent}>
                    <Text style={[styles.type, styles.padding]}>{ props.advertisement.type }</Text>
                    <Text style={[styles.name, styles.padding]}>{ props.advertisement.name }</Text>
                    <Text style={[styles.pieces, styles.padding]}>{ props.advertisement.piecePerKg }</Text>
                    <Text style={[styles.quantity, styles.padding]}>{ props.advertisement.minQuantity }</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.price, styles.padding]}>{ props.advertisement.price }</Text>
                        <Text style={[styles.originalPrice, styles.padding]}>{ props.advertisement.originalPrice }</Text>  
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    cardContainer: {
        borderRadius: responsive(24),
        marginTop: responsive(15),
        marginBottom: responsive(15),
        marginLeft: '10%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: colors.LIGHT_BLUE,
        color: colors.MID_GRAY,
        backgroundColor: colors.WHITE,
        elevation: 5
    },
    outletImageWrapper: {
        width: '50%',
        marginLeft: '-20%',
        marginRight: '10%',
    },
    outletImage: {
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowColor: colors.LIGHT_BLUE,
        shadowRadius: 10,
        elevation: 5,
        padding: 0,
        margin: 0
    },
    image: {
        borderRadius: 10,
        width: '100%',
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
        color: colors.TEXT_PRIMARY
    },
    pieces: {
        ...typos.SECONDARY,
        color: colors.TEXT_SECONDARY
    },
    priceContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    price: {
        ...typos.PRIMARY_BOLD,
        color: colors.TEXT_SECONDARY  
    },
    originalPrice: {
        ...typos.SMALL,
        color: colors.LIGHT_ORANGE  
    },
    quantity: {
        ...typos.SECONDARY,
        color: colors.TEXT_SECONDARY,
        marginTop: 25
    },
});

export { AdvertisementListItem };