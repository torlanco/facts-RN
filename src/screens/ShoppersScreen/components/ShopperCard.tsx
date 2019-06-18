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
                    { props.shopper.path ? <Image style={ styles.image } source={{ uri: path }}/> 
                        : <Image style={ styles.image } source={imageSource} /> }
                </Card>
                <View style={styles.cardContainer}>
                    <View style={styles.mainContent}>
                        <Text style={[styles.highlight, styles.padding]}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
                        <Text style={[styles.text, styles.padding]}><Text style={styles.highlight}>{count} </Text> FEATURES</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
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