import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { colors, typos, responsive } from '@styles';
import { Card, Icon } from 'react-native-elements';
import { IShopper } from '@interfaces/shopper';
import { IOutlet } from '@interfaces/outlet';

// Utils
import { formatDate } from '@utils';
import FullWidthImage from 'react-native-fullwidth-image';
import { NavigationInjectedProps } from 'react-navigation';

interface IOwnProps {
  shopper: IShopper.IShopperData,
  outlet: IOutlet.IOutletData
  onItemPress?: Function
}

type IProps = IOwnProps 
    & NavigationInjectedProps;

interface IState {
    shopperImage: any,
    outletImage: any
}
class ShopperCard extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            shopperImage: require('@assets/images/placeholder.png'),
            outletImage: require('@assets/images/placeholder.png')
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
            this.props.onItemPress(this.props.shopper);
    }

    openFullScreenImage = () => {
        if (this.props.shopper.pathThumb) {
            this.props.navigation.navigate(this.props.shopper.pathThumb);
        }
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
                        <View style={[styles.row, styles.details]}>
                            { this.state.shopperImage == this.props.shopper.pathThumb && 
                                <TouchableOpacity onPress={this.openFullScreenImage} style={styles.iconContainerWrapper}>
                                    <Icon
                                    name='maximize'
                                    type='feather'
                                    size={24}
                                    color={colors.BLACK}
                                    containerStyle={[styles.iconContainer]} /> 
                                </TouchableOpacity>}
                            <View style={styles.thumbimageContainer}>
                                { this.state.outletImage == this.props.outlet.outletImage ?
                                    <FullWidthImage style={ styles.thumbimage } source={{ uri: this.state.outletImage }}/> : 
                                    <Image style={[styles.thumbimage, { height: 60 }]} source={ this.state.outletImage } resizeMode="stretch"/> }  
                            </View> 
                            <View>
                                <Text style={[styles.highlight]}>{outlet}</Text>
                                <Text style={[styles.date]}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
                                <Text style={[styles.text]}><Text style={styles.highlight}>{count} </Text> PAGES</Text>
                            </View>
                        </View>
                    </Card>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 0,
        padding: 0,
        margin: 0,
        width: '100%',
        minHeight: 100,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
    },
    mainContent: {
        paddingHorizontal: '5%',
        marginTop: -50,
    },
    cardContainer: {
        padding: 20,
        backgroundColor: colors.WHITE,
        elevation: 0,
        flexDirection: 'column',
        borderRadius: responsive(12),
    },
    padding: {
        padding: 2,
    },
    highlight: {
        ...typos.TITLE,
        color: colors.TEXT_PRIMARY
    },
    date: {
        ...typos.CAPTION,
        color: colors.TEXT_PRIMARY
    },
    text: {
        ...typos.CAPTION,
        color: colors.TEXT_PRIMARY
    },
    details: {
        backgroundColor: colors.LIGHT_GRAY, 
        paddingVertical: 10, 
        paddingHorizontal: 10,    
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    thumbimageContainer: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 10,
    },
    thumbimage: {
        borderRadius: 5,
        width: '100%'        
    },
    iconContainerWrapper: {
        position: "absolute",
        bottom: 100, right: 20,
        zIndex: 5,
        elevation: 3
    },
    iconContainer: {
        padding: 10,
        width: 45, height: 45,
        borderRadius: 6, 
        backgroundColor: colors.PRIMARY,
    },
});

export { ShopperCard };