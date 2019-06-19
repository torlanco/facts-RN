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
    const {id, type, brand, sprice, rprice, sizeMeasure, image } = props.advertisement;
    const imageSource = require('@assets/images/placeholder.png');

    return (
        <View style={styles.mainContainer}>
            <View style={styles.cardContainer}>
                <View style={styles.outletImageWrapper}>
                    <Card containerStyle={styles.outletImage}>
                        {image ? <Image style={ styles.image } source={{ uri: image }} /> 
                            : <Image style={ styles.image } source={imageSource} /> }
                    </Card>
                </View>
                <View style={styles.mainContent}>
                    <Text style={[styles.type, styles.padding]}>{type}</Text>
                    <Text style={[styles.name, styles.padding]}>{brand}</Text>
                    <Text style={[styles.pieces, styles.padding]}>{sizeMeasure}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.price, styles.padding]}>${sprice}</Text>
                        <Text style={[styles.originalPrice, styles.padding]}>${rprice}</Text>  
                    </View>
                </View>
            </View>
        </View>
    );
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
        marginLeft: '-20%',
        marginRight: '10%',
    },
    outletImage: {
        height: 100,
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
        height: '100%',
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
        marginTop: 25
    },
    price: {
        ...typos.PRIMARY_BOLD,
        color: colors.TEXT_SECONDARY  
    },
    originalPrice: {
        ...typos.SMALL,
        color: colors.LIGHT_ORANGE  
    }
});

export { AdvertisementListItem };