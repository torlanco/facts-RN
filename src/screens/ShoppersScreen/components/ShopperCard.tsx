import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { colors, typos, responsive } from '@styles';
import { Card } from 'react-native-elements';
import { IShopper } from '@interfaces/shopper';

interface IOwnProps {
  shopper: IShopper.IShopperData
}

type IProps = IOwnProps;

const ShopperCard: React.SFC<IProps> = (props: IProps) => {
    const imageSource = require('@assets/images/placeholder.png');
    return (
        <View style={styles.mainContainer}>
            <Card containerStyle={styles.outletImage}>
                { props.shopper.imageUrl ? <Image style={ styles.image } source={{ uri: props.shopper.imageUrl }}/> 
                    : <Image style={ styles.image } source={imageSource} /> }
            </Card>
            <View style={styles.cardContainer}>
                <View style={styles.mainContent}>
                    <Text style={[styles.highlight, styles.padding]}>{ props.shopper.startDate } - {props.shopper.endDate}</Text>
                    <Text style={[styles.text, styles.padding]}><Text style={styles.highlight}>{ props.shopper.features }</Text> FEATURES</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
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
        margin: 0,
        maxWidth: '80%',
        height: '80%',
        marginVertical: '5%',
        marginHorizontal: '10%',
    },
    image: {
        borderRadius: 10,
        height: '100%',
    },
    cardContainer: {
        borderRadius: responsive(12),
        marginLeft: '15%',
        marginTop: '-12.5%',
        width: '70%',
        padding: 20,
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
    mainContent: {
      flexDirection: 'column'
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