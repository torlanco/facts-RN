import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { colors, typos, responsive } from '@styles';
import FullWidthImage from 'react-native-fullwidth-image';
import { IAdvertisement } from '@interfaces/advertisement';
import { Card } from 'react-native-elements';

interface IOwnProps {
  advertisement: IAdvertisement.IAdvertisementData,
  onItemPress?: Function
}

type IProps = IOwnProps;

interface IState {
    featureImage: any,
}

class AdvertisementListItem extends React.Component<IProps, IState> {
   
    constructor(props: IProps) {
        super(props);
        this.state = {
            featureImage: require('@assets/images/placeholder.png'),
        };
    }
    
    componentDidMount() {
        if (this.props.advertisement.image) {
            Image.getSize(this.props.advertisement.image, (width: number, height: number) => {
                this.setState({ 
                    featureImage: {uri: this.props.advertisement.image},
                });
            }, err => {});
        }
    }

    onItemPress = () => {
        if (this.props.onItemPress) 
        this.props.onItemPress(this.props.advertisement);
    }
    public render() {
        const {id, type, brand, sprice, rprice, sizeMeasure } = this.props.advertisement;
        const imageWidth = (Dimensions.get('window').width) * 0.40;
    
        return (
            <TouchableOpacity onPress={this.onItemPress} activeOpacity={.9}>
                <View style={styles.mainContainer}>
                    <View style={styles.cardContainer}>
                        <View style={styles.outletImageWrapper}>
                            <Card containerStyle={styles.outletImage}>
                            { this.state.featureImage == this.props.advertisement.image ?
                                <FullWidthImage style={ styles.image } source={{ uri: this.state.featureImage }}/> : 
                                <Image style={[styles.image, { height: 100 }]} source={ this.state.featureImage } resizeMode="stretch"/> }
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
        marginLeft: '-20%',
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