import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { colors, typos, responsive } from '@styles';

import { IOutlet } from '@interfaces/outlet';

interface IOwnProps {
    data: IOutlet.IOutletData,
    onItemPress?: Function
};

type IProps = IOwnProps; 

const OutletCard: React.SFC<IProps> = (props: IProps) => {
    const {imageUrl, category, name, date, shoppers, isNew} = props.data;
    const imageSource = require('@assets/images/placeholder.png');

    const onItemPress = () => {
        if (props.onItemPress) 
            props.onItemPress();
    }

    return (
        <TouchableOpacity onPress={onItemPress}>
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: responsive(24),
        marginTop: responsive(20),
        marginLeft: responsive(40),
        marginRight: responsive(15),
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: colors.LIGHT_BLUE,
        color: colors.MID_GRAY,
        backgroundColor: colors.WHITE,
        elevation: 3,
        shadowRadius: 10,
    },
    outletImage: {
        marginLeft: responsive(-60),
    },
    mainContent: {
      flexDirection: 'column'
    },
    mainHeading: {
        ...typos.TITLE,
        color: colors.TEXT_PRIMARY,
        paddingBottom: responsive(25),
    },
    subHeading: {
        ...typos.SECONDARY,
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