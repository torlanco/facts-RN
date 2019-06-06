import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { colors, typos, responsive } from '@styles';

interface IOutletCard {
    imageUrl?: string,
    name?: string;
    category?: string;
    date?: string;
    shoppers?: any[],
    isNew?: boolean
};

const OutletCard: React.SFC<IOutletCard> = (props: IOutletCard) => {
    const {imageUrl, category, name, date, shoppers, isNew} = props;
    const imageSource = require('@assets/images/placeholder.png');
    return (
        <View style={styles.cardContainer}>
            <View style={styles.outletImage}>
                {imageUrl ? <Image source={{uri: imageUrl}}/> : <Image source={imageSource}/>}
            </View>
            <View style={styles.mainContent}>
                <Text style={[styles.subHeading, styles.category]}>{category}</Text>
                <Text style={styles.mainHeading}>{name}</Text>
                <Text style={styles.subHeading}>Latest: {date}</Text>
                <View style={styles.shopperAndNew}>
                    <Text style={styles.subHeading}>
                        <Text style={styles.shoppersCount}>{shoppers ? shoppers.length : 0}</Text> Shoppers
                    </Text>
                    {isNew && <Text style={styles.isNew}>New</Text>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: responsive(24),
        marginTop: responsive(20),
        marginLeft: responsive(25),
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        // shadowOpacity: 1.0,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: colors.LIGHT_BLUE,
        color: colors.MID_GRAY,
        backgroundColor: colors.PRIMARY_LIGHT,
        elevation: 1
    },
    outletImage: {
        marginLeft: responsive(-60),
    },
    mainContent: {
      flexDirection: 'column'
    },
    mainHeading: {
        ...typos.LARGE_TITLE,
        color: colors.TEXT_PRIMARY,
        paddingBottom: responsive(25)
    },
    subHeading: {
        ...typos.BODY,
        textTransform: 'uppercase',
        paddingTop: responsive(10),
        color: colors.TEXT_SECONDARY
    },
    category: {
        textTransform: 'none'
    },
    shoppersCount: {
        flexDirection: 'row',
        color: colors.BLACK
    },
    image: {
      borderRadius: responsive(16)
    },
    isNew: {
        paddingTop: responsive(8),
        paddingLeft: responsive(20),
        ...typos.FOOTNOTE,
        textTransform: 'uppercase',
        color: colors.LIGHT_ORANGE
    },
    shopperAndNew: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export { OutletCard };