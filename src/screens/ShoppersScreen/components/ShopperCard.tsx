import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { colors, typos, responsive } from '@styles';
import { Card } from 'react-native-elements';
import { IShopper } from '@interfaces/shopper';

// Utils
import { formatDate } from '@utils';

interface IOwnProps {
  shopper: IShopper.IShopperData,
  onItemPress?: Function
}

type IProps = IOwnProps;

const ShopperCard: React.SFC<IProps> = (props: IProps) => {
    
    const {id, outlet, startDate, endDate, count, path} = props.shopper;
    const imageSource = require('@assets/images/placeholder.png');
    
    const onItemPress = () => {
        if (props.onItemPress) 
            props.onItemPress(id);
    }
    
    return (
        <TouchableOpacity onPress={onItemPress}>
            <View style={styles.mainContainer}>
                <Card containerStyle={styles.outletImage}>
                    { props.shopper.path ? <Image style={ styles.image } source={{ uri: path }} resizeMode="contain"/>
                        : <Image style={ styles.image } source={imageSource} /> }
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

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: responsive(10),
        maxWidth: responsive(1000)
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
        height: '80%'
    },
    image: {
        borderRadius: 10,
        height: '100%',
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